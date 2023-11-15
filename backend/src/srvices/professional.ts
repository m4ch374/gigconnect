import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import {
  ExternalLink,
  prisma,
  createToken,
  UserType,
  hashPassword,
  checkProfeshEmailExists,
  getProfeshUserEntry,
  mapDBToExternalLinks,
  mapDBToProjects,
  avgReviewScore,
} from "./helper"

/**
 * Given the bare minimum details, creates a Professional User
 * Throws 400 errors if input details have issues.
 * @returns new token for that login session and the user type, which is Professional
 */
const professionalCreate = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  // Check email validity
  const regex: RegExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const matched: boolean = regex.test(email)
  if (!matched) {
    throw HTTPError(400, "Invalid email syntax")
  }
  if (password === email || email === firstName || email === lastName) {
    throw HTTPError(400, "Email cannot match other properties")
  }
  // Check if email already exists in the DB
  const emailExists: boolean = await checkProfeshEmailExists(email)
  if (emailExists) {
    throw HTTPError(400, "Email already exists")
  }
  // Check password validity
  if (password === email || password === firstName || password === lastName) {
    throw HTTPError(400, "Password cannot match other properties")
  }
  if (password.length < 8) {
    throw HTTPError(400, "Password must be at least 8 characters")
  }

  // FINALLY Create an entry in the DB
  const hashedPass = await hashPassword(password)
  const user = await prisma.professional.create({
    data: {
      email,
      password: hashedPass,
      firstName,
      lastName,
    },
  })

  return {
    loginToken: createToken(user.id.toString(), UserType.Professional),
    userType: "professional", // UserType.Professional
  }
}

/**
 * @returns all information about the specific professional
 * Throws 403 error if professionalId doesn't exist
 * This is for private view only (i.e. a professional views its own profile)
 */
const professionalData = async (userId: string) => {
  const user = await getProfeshUserEntry(Number(userId))
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    profilePhoto: user.profilePic,
    description: user.description,
    skills: user.skills,
    qualifications: mapDBToExternalLinks(user.certLinks),
    externalWebsites: mapDBToExternalLinks(user.socialLinks),
    verified: user.verified,
    projects: await mapDBToProjects(user.projects),
    hasReviews: user.reviews.length > 0,
    reviewAvg: avgReviewScore(user.reviews),
  }
}

/**
 * Overwrites the professional's existing information with what's provided
 * Throws 400 errors if update input values contains issues
 * @returns success object with boolean value.
 */
const professionalUpdate = async (
  userId: string,
  firstName: string,
  lastName: string,
  profilePhoto: string,
  description: string,
  skills: string[],
  qualifications: ExternalLink[],
  externalWebsites: ExternalLink[],
) => {
  // Check name lengths
  if (firstName.length === 0 || lastName.length === 0) {
    throw HTTPError(
      400,
      "First name and last name must be at least one character",
    )
  }

  // Update rest of the Professional entry attributes
  await prisma.professional.update({
    where: { id: Number(userId) },
    data: {
      firstName,
      lastName,
      profilePic: profilePhoto,
      description,
      skills,
    },
  })

  // Update SocialLink user's entries with externalwebsites[]
  await prisma.socialLink.deleteMany({
    where: { professionalId: Number(userId) },
  })
  await Promise.all(
    externalWebsites.map(async currSocial => {
      await prisma.socialLink.create({
        data: {
          name: currSocial.websiteName,
          url: currSocial.websiteLink,
          professionalId: Number(userId),
        },
      })
    }),
  )

  // Update CertLink user's entries with qualificatinos[]
  await prisma.certLink.deleteMany({
    where: { professionalId: Number(userId) },
  })
  await Promise.all(
    qualifications.map(async currQual => {
      await prisma.certLink.create({
        data: {
          name: currQual.websiteName,
          url: currQual.websiteLink,
          professionalId: Number(userId),
        },
      })
    }),
  )

  return {
    success: true,
  }
}

/**
 * @returns PUBLIC information of ALL existing Professionals
 * This is for basic view under search/list results
 */
const allProfessionalPublicData = async () => {
  const queriedInfo = await prisma.professional.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profilePic: true,
      verified: true,
      description: true,
    },
  })
  // Change key name, and stringify id
  const basicInfo = queriedInfo.map(info => ({
    userId: info.id.toString(),
    firstName: info.firstName,
    lastName: info.lastName,
    profilePhoto: info.profilePic,
    verified: info.verified,
    description: info.description,
  }))
  return { professionalUsers: basicInfo }
}

/**
 * @returns PUBLIC information about the specific professional
 * Throws 403 error if professionalId doesn't exist
 * This is for public view only (i.e. other users views another professional)
 */
const professionalDataPublic = async (userId: string) => {
  const user = await getProfeshUserEntry(Number(userId))
  // get list of all of this user's closed projects, with public info
  const closedProjects = await prisma.professional.findUnique({
    select: {
      projects: {
        select: {
          id: true,
          title: true,
          publicDescription: true,
          companyId: true,
          company: {
            select: {
              name: true,
            },
          },
          inPerson: true,
          location: true,
          tags: true,
          creationDate: true,
          status: true,
        },
        where: {
          status: ProjectStatus.CLOSED,
        },
      },
    },
    where: { id: parseInt(userId, 10) },
  })

  const cleanProjObj = closedProjects?.projects.map(info => ({
    projectId: info.id.toString(),
    title: info.title,
    publicDescription: info.publicDescription,
    companyId: info.companyId.toString(),
    companyName: info.company.name,
    inPerson: info.inPerson,
    location: info.location,
    tags: info.tags,
    creationDate: info.creationDate.toJSON(),
    status: info.status.toString().toLowerCase(),
  }))

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    profilePhoto: user.profilePic,
    description: user.description,
    skills: user.skills,
    qualifications: mapDBToExternalLinks(user.certLinks),
    externalWebsites: mapDBToExternalLinks(user.socialLinks),
    verified: user.verified,
    projects: cleanProjObj,
    hasReviews: user.reviews.length > 0,
    reviewAvg: avgReviewScore(user.reviews),
  }
}

export {
  professionalCreate,
  professionalData,
  professionalUpdate,
  allProfessionalPublicData,
  professionalDataPublic,
}
