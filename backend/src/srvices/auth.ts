import HTTPError from "http-errors"
import { UserType, createToken, prisma, verifyPassword } from "./helper"

/**
 * @returns a promise that resolves with the user object and userType that matches
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

/**
 * Logs user in, given a correct pass+email combo
 * @returns a token for that login session.
 */
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

/**
 * Logs user out off that session
 * @returns success object with boolean value.
 */
const authLogout = () => ({ success: true })

/**
 * Confirms if user has completed onboarding (initial details inputs)
 * Throws 400 error if userId doesn't exist
 * @returns success object with boolean value.
 */
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

  if (userType === UserType.Admin) {
    return { onboarded: true }
  }

  throw HTTPError(400, "Unsupported user type for getting onboarded data.")
}

/**
 * Updates user's onboard completion status as true
 * Throws 400 error if user Id doesn't exist
 * @returns success object with boolean value.
 */
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

  if (userType === UserType.Admin) {
    return { onboarded: true }
  }

  throw HTTPError(400, "Unsupported user type for updating onboarded data.")
}

export { authLogin, authLogout, onboardedData, onboardedUpdate }
