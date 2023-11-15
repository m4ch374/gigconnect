import HTTPError from "http-errors"
import { UserType, prisma } from "./helper"

/**
 * Can only be called by an admin user, to retrieve all existing users
 * @returns basic info about all existing users
 */
const adminDashboard = async () => {
  const companyUsers = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      profilePic: true,
      verified: true,
    },
  })
  const professionalUsers = await prisma.professional.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profilePic: true,
      verified: true,
    },
  })

  return {
    companyUsers: companyUsers.map(c => ({
      userId: c.id.toString(),
      companyName: c.name,
      profilePhoto: c.profilePic,
      verified: c.verified,
    })),
    professionalUsers: professionalUsers.map(c => ({
      userId: c.id.toString(),
      firstName: c.firstName,
      lastName: c.lastName,
      profilePhoto: c.profilePic,
      verified: c.verified,
    })),
  }
}

/**
 * Admin user sets a professional or company user, as verified
 * Throws 400 error for input data issues.
 * @returns success object with boolean value
 */
const adminSetVerified = async (
  userId: string,
  userType: string,
  verified: boolean,
) => {
  if (userType === UserType.Company.valueOf()) {
    try {
      await prisma.company.update({
        where: { id: parseInt(userId, 10) },
        data: { verified },
      })
    } catch {
      throw HTTPError(400, "Invalid userId.")
    }
  } else if (userType === UserType.Professional.valueOf()) {
    try {
      await prisma.professional.update({
        where: { id: parseInt(userId, 10) },
        data: { verified },
      })
    } catch {
      throw HTTPError(400, "Invalid userId.")
    }
  } else {
    throw HTTPError(400, "Invalid userType.")
  }

  return { success: true }
}

export { adminDashboard, adminSetVerified }
