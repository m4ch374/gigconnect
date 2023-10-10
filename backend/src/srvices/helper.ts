import { randomBytes, scrypt, timingSafeEqual } from "crypto"

interface ExternalLink {
  websiteName: string
  websiteLink: string
}

const hashKeyLen = 32

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

export { ExternalLink, hashPassword, verifyPassword }
