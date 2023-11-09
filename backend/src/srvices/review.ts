import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import { prisma, professionalInProject, UserType } from "./helper"

interface reviewInput {
  userId: string
  rating: number
  comment: string
}

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

  const reviewed = project.reviewsOfProfessionals.map(r => r.id)
  const candidates = project.professionals.filter(p => !reviewed.includes(p.id))
  return {
    users: candidates.map(p => ({
      userId: p.id.toString(),
      userName: `${p.firstName} ${p.lastName}`,
      profilePhoto: p.profilePic,
    })),
  }
}

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
          .map(p => p.id)
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
