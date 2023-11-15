import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import { prisma, professionalInProject, UserType } from "./helper"

interface reviewInput {
  userId: string
  rating: number
  comment: string
}

/**
 * @returns all basic details of all the professionals apart of the project that the Company hasn't reviewed.
 * Throws 400 error if project id is non existent
 * Throws 403 error if company user doesn't own project
 */
const reviewCandidatesCompany = async (
  companyId: string,
  projectId: string,
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: { professionals: true, reviewsOfProfessionals: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own this project.")
  }

  const reviewed = project.reviewsOfProfessionals.map(r => r.subjectId)
  const candidates = project.professionals.filter(p => !reviewed.includes(p.id))
  return {
    users: candidates.map(p => ({
      userId: p.id.toString(),
      userName: `${p.firstName} ${p.lastName}`,
      profilePhoto: p.profilePic,
    })),
  }
}

/**
 * @returns the project's owner Company's basic details, IFF professional hasn't already reviewed.
 * Throws 400 error if project id is non existent
 * Throws 403 error if company user doesn't own project
 */
const reviewCandidatesProfessional = async (
  professionalId: string,
  projectId: string,
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: { company: true, reviewsOfCompany: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (!(await professionalInProject(professionalId, projectId))) {
    throw HTTPError(403, "Professional user not part of this project.")
  }

  if (
    project.reviewsOfCompany
      .map(r => r.authorId)
      .includes(parseInt(professionalId, 10))
  ) {
    // Professional has already reviewed this company for this project
    return { users: [] }
  }

  return {
    users: [
      {
        userId: project.companyId.toString(),
        userName: project.company.name,
        profilePhoto: project.company.profilePic,
      },
    ],
  }
}

/**
 * Super function that either allows requested Company user to review professionals associated with the project
 *  whom haven't been reviewed (by the company)
 * OR lets professional view details of company IFF he hasn't reviewed the company yet
 * Ultimately, returns user/s who are able to be reviewed, from the POV of the caller.
 * Throws 400 error if project id is non existent
 * Throws 403 error if company user doesn't own project
 * @returns either an empty array (if profesional has already reviewed the company)
 * @returns an array with a single index of company's info, if Professional hasn't reviewed them yet
 * @returns an array with all the users the company has reviewed, apart of that project.
 */
const reviewCandidates = async (
  userId: string,
  userType: UserType,
  projectId: string,
) => {
  switch (userType) {
    case UserType.Company:
      return reviewCandidatesCompany(userId, projectId)
    case UserType.Professional:
      return reviewCandidatesProfessional(userId, projectId)
    default:
      throw HTTPError(400, "Unsupported user type for getting users to review.")
  }
}

/**
 * Professional reviews a single Company user that owns the project at hand.
 * Throws 400 error if projectid doesnt exist, project is not completed, one or more professional user is not part of the project
 *  or company has already reviewed one or more of the professionals in the reviews array for this project.
 * Throws 403 error if company doesn't own project
 * @returns void. Since the super fnc (which calls this sub fnc) returns a success object with boolean value.
 */
const reviewCreateCompany = async (
  companyId: string,
  projectId: string,
  reviews: reviewInput[],
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: { reviewsOfProfessionals: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.status !== ProjectStatus.CLOSED) {
    throw HTTPError(400, "Project has not been completed yet.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own this project.")
  }

  await Promise.all(
    reviews.map(async r => {
      if (!(await professionalInProject(r.userId, projectId))) {
        throw HTTPError(400, "One or more professionals not part of project.")
      }
      if (
        project.reviewsOfProfessionals
          .map(p => p.subjectId)
          .includes(parseInt(r.userId, 10))
      ) {
        throw HTTPError(400, "Company has already reviewed one or more users.")
      }

      await prisma.professionalReview.create({
        data: {
          score: r.rating,
          message: r.comment,
          authorId: parseInt(companyId, 10),
          subjectId: parseInt(r.userId, 10),
          projectId: parseInt(projectId, 10),
        },
      })
    }),
  )
}

/**
 * Professional reviews a single Company user that owns the project at hand.
 * Throws 400 error if projectid doesnt exist, project is not completed, company doesn't own project
 *  or professional already reviewed this company+project combo.
 * Throws 403 error if Professional user is not part of the project
 * @returns void. Since the super fnc (which calls this sub fnc) returns a success object with boolean value.
 */
const reviewCreateProfessional = async (
  professionalId: string,
  projectId: string,
  review: reviewInput,
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: { reviewsOfCompany: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.status !== ProjectStatus.CLOSED) {
    throw HTTPError(400, "Project has not been completed yet.")
  }
  if (!(await professionalInProject(professionalId, projectId))) {
    throw HTTPError(403, "Professional user not part of this project.")
  }

  if (project.companyId !== parseInt(review.userId, 10)) {
    throw HTTPError(400, "Company user does not own this project.")
  }
  if (
    project.reviewsOfCompany
      .map(r => r.authorId)
      .includes(parseInt(professionalId, 10))
  ) {
    throw HTTPError(400, "Professional has already reviewed this company.")
  }

  await prisma.companyReview.create({
    data: {
      score: review.rating,
      message: review.comment,
      authorId: parseInt(professionalId, 10),
      subjectId: parseInt(review.userId, 10),
      projectId: parseInt(projectId, 10),
    },
  })
}

/**
 * Super function that either lets Company review one or more Professional's at once
 *  OR lets professional review the single company of that specific project.
 * Throws 400 error for unsupported user type
 * @returns success object with boolean value
 */
const reviewCreate = async (
  userId: string,
  userType: UserType,
  projectId: string,
  reviews: reviewInput[],
) => {
  switch (userType) {
    case UserType.Company:
      await reviewCreateCompany(userId, projectId, reviews)
      break
    case UserType.Professional:
      await reviewCreateProfessional(userId, projectId, reviews[0])
      break
    default:
      throw HTTPError(400, "Unsupported user type for posting review.")
  }
  return { success: true }
}

/**
 * @returns all the reviews made about the Company, across all owned CLOSED projects
 * Throws 400 error if company id doesn't exist
 */
const reviewDataCompany = async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: { id: parseInt(companyId, 10) },
    include: {
      reviews: {
        include: {
          author: true,
          project: true,
        },
      },
    },
  })
  if (company === null) {
    throw HTTPError(400, "companyId does not exist.")
  }

  return {
    reviews: company.reviews.map(r => ({
      userId: r.authorId.toString(),
      userName: `${r.author.firstName} ${r.author.lastName}`,
      profilePhoto: r.author.profilePic,
      projectId: r.projectId.toString(),
      projectName: r.project.title,
      rating: r.score,
      comment: r.message,
    })),
  }
}

/**
 * @returns all the reviews made about the Professional, across all participated CLOSED projects
 * Throws 400 error if Professional id doesn't exist
 */
const reviewDataProfessional = async (professionalId: string) => {
  const professional = await prisma.professional.findUnique({
    where: { id: parseInt(professionalId, 10) },
    include: {
      reviews: {
        include: {
          author: true,
          project: true,
        },
      },
    },
  })
  if (professional === null) {
    throw HTTPError(400, "professionalId does not exist.")
  }

  return {
    reviews: professional.reviews.map(r => ({
      userId: r.authorId.toString(),
      userName: r.author.name,
      profilePhoto: r.author.profilePic,
      projectId: r.projectId.toString(),
      projectName: r.project.title,
      rating: r.score,
      comment: r.message,
    })),
  }
}

/**
 * Super function that delegates the returning of all reviews made about the user caller
 *  utilises the two subfunctions starting with "reviewData" above.
 * Throws 400 error if user type is unsupported
 */
const reviewData = async (userId: string, userType: string) => {
  switch (userType) {
    case "company":
      return reviewDataCompany(userId)
    case "professional":
      return reviewDataProfessional(userId)
    default:
      throw HTTPError(400, "Unsupported user type for getting review data.")
  }
}

export { reviewInput, reviewCandidates, reviewCreate, reviewData }
