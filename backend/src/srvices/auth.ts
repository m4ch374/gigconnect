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

export { authLogin, authLogout }
