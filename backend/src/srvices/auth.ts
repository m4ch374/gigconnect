import HTTPError from "http-errors"
import { UserType, createToken, prisma, verifyPassword } from "./helper"

/**
 * Return a promise that resolves with the user object and userType that matches
 * the given email. If the email is not found, user is null and userType is
 * undefined.
 */
const findUserByEmail = async (email: string) => {
  let user = await prisma.admin.findUnique({
    where: { email },
  })
  let userType = UserType.Admin

  if (user === null) {
    user = await prisma.company.findUnique({
      where: { email },
    })
    userType = UserType.Company
  }

  if (user === null) {
    user = await prisma.professional.findUnique({
      where: { email },
    })
    userType = UserType.Professional
  }

  return { user, userType }
}

const authLogin = async (email: string, password: string) => {
  const { user, userType } = await findUserByEmail(email)

  if (user === null) {
    throw HTTPError(401, "Incorrect email or password.")
  }

  if (await verifyPassword(password, user.password)) {
    return {
      loginToken: createToken(user.id.toString(), userType),
      userType,
    }
  }
  throw HTTPError(401, "Incorrect email or password.")
}

const authLogout = () => ({ success: true })

const onboardedData = async (userId: string, userType: UserType) => {
  if (userType === UserType.Company) {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(userId, 10) },
    })
    if (company === null) {
      throw HTTPError(400, "companyId does not exist.")
    }

    return { onboarded: company.onboarded }
  }

  if (userType === UserType.Professional) {
    const professional = await prisma.professional.findUnique({
      where: { id: parseInt(userId, 10) },
    })
    if (professional === null) {
      throw HTTPError(400, "professionalId does not exist.")
    }

    return { onboarded: professional.onboarded }
  }

  throw HTTPError(400, "Unsupported user type for getting onboarded data.")
}

const onboardedUpdate = async (userId: string, userType: UserType) => {
  if (userType === UserType.Company) {
    try {
      await prisma.company.update({
        where: { id: parseInt(userId, 10) },
        data: { onboarded: true },
      })
    } catch {
      throw HTTPError(400, "companyId does not exist.")
    }

    return { onboarded: true }
  }

  if (userType === UserType.Professional) {
    try {
      await prisma.professional.update({
        where: { id: parseInt(userId, 10) },
        data: { onboarded: true },
      })
    } catch {
      throw HTTPError(400, "professionalId does not exist.")
    }

    return { onboarded: true }
  }

  throw HTTPError(400, "Unsupported user type for updating onboarded data.")
}

export { authLogin, authLogout, onboardedData, onboardedUpdate }
