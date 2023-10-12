import HTTPError from "http-errors"
import {
  ExternalLink,
  prisma,
  createToken,
  UserType,
  hashPassword,
  checkProfeshEmailExists,
  getProfeshUserEntry,
} from "./helper"

/**
 * Function CREATES a new Professional entry into the database
 * returns either response types 400 (specific fails) or 200 (pass) - from api-spec.md
 */
const professionalCreate = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<object> => {
  // ####################
  // #### TEST CASES ####
  // ####################
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
    throw HTTPError(400, "Passoword cannot match other properties")
  }
  if (password.length < 8) {
    throw HTTPError(400, "Passoword is too short")
  }
  // #########################
  // #### CREATE DB ENTRY ####
  // #########################
  const hashedPass = await hashPassword(password)
  console.log(password, hashedPass)
  const user = await prisma.professional.create({
    data: {
      email,
      password: hashedPass,
      firstName,
      lastName,
    },
  })

  // #####################
  // #### RETURN DICT ####
  // #####################
  // const uID = await getProfeshUserID(email)
  return {
    loginToken: createToken(user.id.toString(), UserType.Professional),
    userType: "professional", // UserType.Professional
  }
}

/*
  Function READS an existing Professional entry from the database
           returns respone 200 with user info (since errors are alr handled)
*/
const professionalData = async (userId: string) => {
  const user = await getProfeshUserEntry(Number(userId))
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    skills: user.skills,
    qualifications: user.certLinks,
    externalWebsites: user.socialLinks,
    verified: user.verified,
  }
}

/*
  Function UPDATES an existing Professional entry in the database
           returns either response types 400 (fails) or 200 (pass)
*/
const professionalUpdate = async (
  userId: string,
  firstName: string,
  lastName: string,
  description: string,
  skills: string[],
  qualifications: ExternalLink[],
  externalWebsites: ExternalLink[],
) => {
  // Check name lengths
  if (firstName.length === 0 || lastName.length === 0) {
    throw HTTPError(400, "Name is too short")
  }

  // Update rest of the Professional entry attributes
  await prisma.professional.update({
    where: { id: Number(userId) },
    data: {
      firstName,
      lastName,
      description,
      skills,
    },
  })

  // Update SocialLink user's entries with externalwebsites[]
  await prisma.socialLink.deleteMany({
    where: { professionalId: Number(userId) },
  })
  await Promise.all(
    externalWebsites.map(async currQual => {
      await prisma.socialLink.create({
        data: {
          name: currQual.websiteName,
          url: currQual.websiteLink,
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
  // for (const currQual of qualifications) {
  //   await prisma.socialLink.create({
  //     data: {
  //       name: currQual.websiteName,
  //       url: currQual.websiteLink,
  //       professionalId: Number(userId),
  //     },
  //   })
  // }

  return {
    success: true,
  }
}

export { professionalCreate, professionalData, professionalUpdate }
