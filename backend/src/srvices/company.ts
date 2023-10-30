import HTTPError from "http-errors"
import {
  ExternalLink,
  prisma,
  createToken,
  UserType,
  checkCompanyEmailExists,
  getCompanyUserEntry,
  hashPassword,
  mapDBToExternalLinks,
} from "./helper"

const companyCreate = async (
  email: string,
  password: string,
  companyName: string,
  abn: string,
): Promise<object> => {
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

const companyData = async (userId: string) => {
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  const companyUser = await getCompanyUserEntry(Number(userId))
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    companyName: companyUser.name,
    abn: companyUser.abn,
    companyDescription: companyUser.description,
    externalWebsites: mapDBToExternalLinks(companyUser.companyLinks),
    verified: companyUser.verified,
  }
}

const companyUpdate = async (
  userId: string,
  companyName: string,
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

/*
  Function READS all existing Company entries from the database
           returns respone 200 with all basic company's info
*/
const allCompanyPublicData = async () => {
  const queriedInfo = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      verified: true,
    },
  })
  // Change key name, and stringify id
  const basicInfo = queriedInfo.map(info => ({
    userId: info.id.toString(),
    companyName: info.name,
    verified: info.verified,
  }))
  return { companyUsers: basicInfo }
}

// length of company name cannot equal 0
export { companyCreate, companyData, companyUpdate, allCompanyPublicData }
