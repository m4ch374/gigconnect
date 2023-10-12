import HTTPError from "http-errors"
import { hashPassword, prisma, verifyPassword } from "./helper"

const returnHi = () => "Hi"

const returnError = () => {
  throw HTTPError(400, "Sample Error Message")
}

const returnPassword = async () => {
  const password1 = "password123!"
  const password2 = "$HelloGoodbye123456@"
  const hash1 = await hashPassword(password1)
  const hash2 = await hashPassword(password2)
  const verifyP1H1 = await verifyPassword(password1, hash1)
  const verifyP2H2 = await verifyPassword(password2, hash2)
  const verifyP1H2 = await verifyPassword(password1, hash2)
  const verifyP2H1 = await verifyPassword(password2, hash1)
  return {
    password1,
    password2,
    hash1,
    hash2,
    verifyP1H1,
    verifyP2H2,
    verifyP1H2,
    verifyP2H1,
  }
}

const returnDummy = async () => {
  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: await hashPassword("admin"),
    },
  })

  await prisma.company.create({
    data: {
      email: "company@example.com",
      password: await hashPassword("company"),
      name: "Hello Company",
      abn: "51824753556",
    },
  })

  await prisma.professional.create({
    data: {
      email: "professional@example.com",
      password: await hashPassword("professional"),
      firstName: "Hello",
      lastName: "Professional",
    },
  })

  return { success: true }
}

export { returnHi, returnError, returnPassword, returnDummy }
