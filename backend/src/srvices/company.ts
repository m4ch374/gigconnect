import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import {
  ExternalLink,
  prisma,
  createToken,
  UserType,
  checkCompanyEmailExists,
  getCompanyUserEntry,
  hashPassword,
  mapDBToExternalLinks,
  mapDBToProjects,
  avgReviewScore,
} from "./helper"

/**
 * Given the bare minimum details, creates a Company User
 * Throws 400 error if input values contains issues
 * @returns new token for that login session and the user type, which is Company
 */
const companyCreate = async (
  email: string,
  password: string,
  companyName: string,
  abn: string,
) => {
  // make a record and store company user to the database
  // #######################
  // ###  TEST CASES    ####
  // #######################
  const regex: RegExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const matched: boolean = regex.test(email)
  if (!matched) {
    throw HTTPError(400, "Invalid email syntax")
  }
  if (password === email || email === companyName || email === abn) {
    throw HTTPError(400, "Email cannot match other properties")
  }
  // Check if email already exists in the DB
  const CompanyEmailExists: boolean = await checkCompanyEmailExists(email)
  if (CompanyEmailExists) {
    throw HTTPError(400, "Email already exists")
  }
  // Check password validity
  if (password === email || password === companyName || password === abn) {
    throw HTTPError(400, "Password cannot match other properties")
  }
  if (password.length < 8) {
    throw HTTPError(400, "Password must be at least 8 characters")
  }

  // Check if company abn is only numbers
  if (!/^[0-9]{11}$/.test(abn)) {
    throw HTTPError(400, "ABN must only contain numbers")
  }
  if (abn.length !== 11) {
    throw HTTPError(400, "ABN must be exactly 11 digits")
  }

  if (companyName.length === 0) {
    throw HTTPError(400, "Company name must be at least one character")
  }
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  // FINALLY Create an entry in the DB
  const hashedPass = await hashPassword(password)
  const companyUser = await prisma.company.create({
    data: {
      email,
      password: hashedPass,
      name: companyName,
      abn,
    },
  })
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    loginToken: createToken(companyUser.id.toString(), UserType.Company),
    userType: UserType.Company,
  }
}

/**
 * @returns all information about the specific company
 * Throws 403 error if companyId doesn't exist
 * This is for private view only (i.e. a company views its own profile)
 */
const companyData = async (userId: string) => {
  const companyUser = await getCompanyUserEntry(Number(userId))
  return {
    projects: await mapDBToProjects(companyUser.projects),
    companyName: companyUser.name,
    profilePhoto: companyUser.profilePic,
    abn: companyUser.abn,
    companyDescription: companyUser.description,
    externalWebsites: mapDBToExternalLinks(companyUser.companyLinks),
    verified: companyUser.verified,
    hasReviews: companyUser.reviews.length > 0,
    reviewAvg: avgReviewScore(companyUser.reviews),
  }
}

/**
 * Overwrites the company's existing information with what's provided
 * Throws 400 errors if update input values contains issues
 * @returns success object with boolean value.
 */
const companyUpdate = async (
  userId: string,
  companyName: string,
  profilePhoto: string,
  abn: string,
  companyDescription: string,
  externalWebsites: ExternalLink[],
) => {
  // Check name lengths
  // #######################
  // ###  TEST CASES    ####
  // #######################
  if (companyName.length === 0) {
    throw HTTPError(400, "Company name must be at least one character")
  }
  // Check if company abn is only numbers
  if (!/^[0-9]+$/.test(abn)) {
    throw HTTPError(400, "ABN must only contain numbers")
  }
  // Check if company abn is 11 characters
  if (abn.length !== 11) {
    throw HTTPError(400, "ABN must be exactly 11 digits")
  }
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  // Update rest of the Company entry attributes
  await prisma.company.update({
    where: { id: Number(userId) },
    data: {
      name: companyName,
      profilePic: profilePhoto,
      abn,
      description: companyDescription,
    },
  })
  // Update Company Link user's entries with externalwebsites[]
  await prisma.companyLink.deleteMany({
    where: { companyId: Number(userId) },
  })
  await Promise.all(
    externalWebsites.map(async currWebsite => {
      await prisma.companyLink.create({
        data: {
          name: currWebsite.websiteName,
          url: currWebsite.websiteLink,
          companyId: Number(userId),
        },
      })
    }),
  )
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    success: true,
  }
}

/**
 * @returns PUBLIC information of ALL existing companys
 * This is for basic view under search/list results
 */
const allCompanyPublicData = async () => {
  const queriedInfo = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      profilePic: true,
      verified: true,
      description: true,
    },
  })
  // Change key name, and stringify id
  const basicInfo = queriedInfo.map(info => ({
    userId: info.id.toString(),
    companyName: info.name,
    profilePhoto: info.profilePic,
    verified: info.verified,
    description: info.description,
  }))
  return { companyUsers: basicInfo }
}

/**
 * @returns PUBLIC information about the specific company
 * Throws 403 error if companyId doesn't exist
 * This is for public view only (i.e. other users views another company)
 */
const companyDataPublic = async (userId: string) => {
  const companyUser = await getCompanyUserEntry(Number(userId))
  const closedProjects = await prisma.company.findUnique({
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
        where: { status: ProjectStatus.CLOSED },
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
    companyName: companyUser.name,
    profilePhoto: companyUser.profilePic,
    abn: companyUser.abn,
    companyDescription: companyUser.description,
    externalWebsites: mapDBToExternalLinks(companyUser.companyLinks),
    verified: companyUser.verified,
    projects: cleanProjObj,
    hasReviews: companyUser.reviews.length > 0,
    reviewAvg: avgReviewScore(companyUser.reviews),
  }
}

export {
  companyCreate,
  companyData,
  companyUpdate,
  allCompanyPublicData,
  companyDataPublic,
}
