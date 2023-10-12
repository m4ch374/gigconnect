import HTTPError from "http-errors"
import {
  prisma,
  createToken,
  UserType,
  checkCompanyEmailExists,
  getCompanyUserEntry,
  hashPassword,
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
    throw HTTPError(400, "Password is too short")
  }

  if (abn.length !== 11) {
    throw HTTPError(400, "Invalid abn")
  }

  if (companyName.length === 0) {
    throw HTTPError(400, "Name is too short")
  }
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  // FINALLY Create an entry in the DB
  const hashedPass = await hashPassword(password)
  console.log(password, hashedPass)
  const companyUser = await prisma.company.create({
    data: {
      email,
      password: hashedPass,
      name: companyName,
      abn,
    },
  })
  return {
    loginToken: createToken(companyUser.id.toString(), UserType.Company),
    userType: UserType.Company,
  }
}

const companyData = async (userId: string) => {
  const companyUser = await getCompanyUserEntry(Number(userId))
  console.log(userId)
  return {
    companyName: companyUser.name,
    abn: companyUser.abn,
    companyDescription: companyUser.description,
    verified: companyUser.verified,
  }
}

const companyUpdate = async (
  userId: string,
  companyName: string,
  abn: string,
  companyDescription: string,
) => {
  // Check name lengths
  if (companyName.length === 0) {
    throw HTTPError(400, "Name is too short")
  }

  // Check if company abn is 11 characters
  if (abn.length !== 11) {
    throw HTTPError(400, "Invalid abn")
  }

  // Update rest of the Company entry attributes
  await prisma.company.update({
    where: { id: Number(userId) },
    data: {
      name: companyName,
      abn,
      description: companyDescription,
    },
  })
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    success: true,
  }
}

// length of company name cannot equal 0
export { companyCreate, companyData, companyUpdate }
