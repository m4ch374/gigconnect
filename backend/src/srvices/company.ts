import { ExternalLink } from "./helper"

const companyCreate = (
  email: string,
  password: string,
  companyName: string,
  abn: string,
) => {
  console.log(email, password, companyName, abn)
}

const companyData = (userId: string) => {
  console.log(userId)
}

const companyUpdate = (
  userId: string,
  companyName: string,
  abn: string,
  companyDescription: string,
  externalWebsites: ExternalLink[],
) => {
  console.log(userId, companyName, abn, companyDescription, externalWebsites)
}

export { companyCreate, companyData, companyUpdate }
