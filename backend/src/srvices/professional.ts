import { ExternalLink } from "./helper"

const professionalCreate = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  console.log(email, password, firstName, lastName)
}

const professionalData = (userId: string) => {
  console.log(userId)
}

const professionalUpdate = (
  userId: string,
  firstName: string,
  lastName: string,
  description: string,
  skills: string[],
  qualifications: ExternalLink[],
  externalWebsites: ExternalLink[],
) => {
  console.log(
    userId,
    firstName,
    lastName,
    description,
    skills,
    qualifications,
    externalWebsites,
  )
}

export { professionalCreate, professionalData, professionalUpdate }
