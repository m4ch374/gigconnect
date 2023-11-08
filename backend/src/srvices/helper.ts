import HTTPError from "http-errors"
import * as jwt from "jsonwebtoken"
import { randomBytes, scrypt, timingSafeEqual } from "crypto"
import { PrismaClient, ProjectStatus } from "@prisma/client"

const prisma = new PrismaClient()
const hashKeyLen = 32

enum UserType {
  Any = "any",
  Admin = "admin",
  Company = "company",
  Professional = "professional",
}

interface ExternalLink {
  websiteName: string
  websiteLink: string
}

interface tokenPayload {
  userId: string
  userType: UserType
}

/** Return a promise that resolves with the hashed password as a string. */
const hashPassword = (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const normalized = password.normalize()
    const salt = randomBytes(16).toString("hex")
    scrypt(normalized, salt, hashKeyLen, (err, derivedKey) => {
      if (err) reject(err)
      resolve(`${salt}.${derivedKey.toString("hex")}`)
    })
  })

/**
 * Return a promise that resolves with true if the password matches the hash,
 * false if not.
 */
const verifyPassword = (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const normalized = password.normalize()
    const [salt, hashKey] = hash.split(".")
    const hashKeyBuffer = Buffer.from(hashKey, "hex")
    scrypt(normalized, salt, hashKeyLen, (err, derivedKey) => {
      if (err) reject(err)
      resolve(timingSafeEqual(hashKeyBuffer, derivedKey))
    })
  })

/**
 * Return a valid JWT token as a string, encoding the userId and userType as the
 * payload.
 */
const createToken = (userId: string, userType: UserType) => {
  if (process.env.JWT_SECRET === undefined) {
    throw HTTPError(500, "Failed to create token because secret is missing.")
  }
  return jwt.sign({ userId, userType }, process.env.JWT_SECRET)
}

/**
 * Return the payload object literal if the token is valid,
 * otherwise throw error.
 */
const verifyToken = (token: string) => {
  if (process.env.JWT_SECRET === undefined) {
    throw HTTPError(500, "Failed to verify token because secret is missing.")
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as tokenPayload
  } catch {
    throw HTTPError(401, "Invalid token.")
  }
}

/**
 * Return the given array of database links in ExternalLink format.
 */
const mapDBToExternalLinks = (
  links: { name: string; url: string }[],
): ExternalLink[] =>
  links.map(link => ({
    websiteName: link.name,
    websiteLink: link.url,
  }))

const getCompanyName = async (id: number) => {
  const user = await prisma.company.findUnique({
    where: { id },
  })

  return user?.name
}

const mapDBToProjects = (
  projectParams: {
    id: number
    title: string
    publicDescription: string | null
    companyId: number
    inPerson: boolean
    location: string | null
    creationDate: Date
    status: ProjectStatus
  }[],
) =>
  projectParams.map(param => ({
    projectId: param.id.toString(),
    title: param.title,
    publicDescription: param.publicDescription,
    companyName: getCompanyName(param.companyId),
    companyId: param.companyId,
    inPerson: param.inPerson,
    location: param.location,
    creationDate: param.creationDate.toJSON(),
    status: param.status.valueOf().toLowerCase(),
  }))

const avgReviewScore = (reviews: { score: number }[]) => {
  if (reviews.length === 0) {
    return 0
  }
  return reviews.map(r => r.score).reduce((a, b) => a + b, 0) / reviews.length
}

/**
 * Checks whether given email already exists within the Company table entries in the DB
 */
async function checkCompanyEmailExists(email: string) {
  // Read from DB via Prisma query
  const CompanyEmail = await prisma.company.findUnique({
    where: {
      email,
    },
  })
  // await prisma.$disconnect()
  if (CompanyEmail) {
    // CompanyEmail is assigned an entry which contains said email
    return true
  }
  return false
}

/**
 * Checks whether given email already exists within the Professional table entries in the DB
 */
async function checkProfeshEmailExists(email: string) {
  // Read from DB via Prisma query
  const profesh = await prisma.professional.findUnique({
    where: {
      email,
    },
  })
  // await prisma.$disconnect()
  if (profesh) {
    // profesh is assigned an entry which contains said email
    return true
  }
  return false
}

/**
 * Returns company user entry, given email
 */
const getCompanyUserID = async (email: string) => {
  const user = await prisma.company.findUnique({
    where: { email },
  })

  return user?.id
}

/**
 * Returns company user id, given email
 */
const getCompanyUserEntry = async (uID: number) => {
  // if can't find a record with that id then return null
  const user = await prisma.company.findUnique({
    where: { id: uID },
    include: { companyLinks: true, projects: true, reviews: true },
  })
  if (user === null) {
    throw HTTPError(403, "No user that matches that ID")
  }
  return user
}

/**
 * Returns professional user id, given email
 */
const getProfeshUserID = async (email: string) => {
  const user = await prisma.professional.findUnique({
    where: { email },
  })
  if (user === null) {
    throw HTTPError(403, "No professional user that matches given email")
  }
  return user.id
}

/**
 * Returns the whole professional user entry (including Related nodes), given id
 */
const getProfeshUserEntry = async (uID: number) => {
  const user = await prisma.professional.findUnique({
    where: { id: uID },
    include: {
      socialLinks: true,
      certLinks: true,
      projects: true,
      reviews: true,
    },
  })
  if (user === null) {
    throw HTTPError(403, "No professional user that matches given ID")
  }
  return user
}

/**
 * Return a promise that resolves true if the professional is part of project,
 * false if not (or if project does not exist).
 */
const professionalInProject = async (
  professionalId: string,
  projectId: string,
) =>
  (
    await prisma.project.findUnique({
      where: { id: parseInt(projectId, 10) },
      select: {
        professionals: {
          where: { id: parseInt(professionalId, 10) },
        },
      },
    })
  )?.professionals.length !== 0

/**
 * Checks if companyId is the project owner
 */
const checkCompanyIsProjectOwner = async (
  companyId: string,
  projectId: string,
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10), companyId: parseInt(companyId, 10) },
  })
  if (project) {
    // project is assigned an entry which contains said company user as owner
    return true
  }
  return false
}

export {
  UserType,
  ExternalLink,
  prisma,
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  mapDBToExternalLinks,
  mapDBToProjects,
  avgReviewScore,
  checkCompanyEmailExists,
  getCompanyUserID,
  getCompanyUserEntry,
  checkProfeshEmailExists,
  getProfeshUserID,
  getProfeshUserEntry,
  professionalInProject,
  checkCompanyIsProjectOwner,
}
