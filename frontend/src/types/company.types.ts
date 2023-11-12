// Types for company users

import { ExternalLink } from "./general.types"
import { ListedProjectData } from "./project.types"

export type CompanyProfileData = {
  companyName: string
  abn: string
  companyDescription: string
  profilePhoto: string
  externalWebsites: ExternalLink[]
  verified: boolean
  projects: ListedProjectData[]
}

export type CompanyUser = {
  userId: string
  companyName: string
  profilePhoto: string
  verified: boolean
}
