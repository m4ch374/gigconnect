import HTTPError from "http-errors"
import * as jwt from "jsonwebtoken"
import { randomBytes, scrypt, timingSafeEqual } from "crypto"
import { PrismaClient } from "@prisma/client"

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

const hashKeyLen = 32

const prisma = new PrismaClient()

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

export {
  UserType,
  ExternalLink,
  prisma,
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
}
