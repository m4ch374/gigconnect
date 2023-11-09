// Types for company users

import { ExternalLink, ProjectStatus } from "./general.types"

export type CompanyProfileData = {
  companyName: string
  abn: string
  companyDescription: string
  profilePhoto: string
  externalWebsites: ExternalLink[]
  verified: boolean
  projects: {
    projectId: string
    title: string
    publicDescription: string
    companyName: string
    companyId: string
    inPerson: boolean
    location?: string
    creationDate: string
    status: ProjectStatus
  }[]
}

export type CompanyUser = {
  userId: string
  companyName: string
  profilePhoto: string
  verified: boolean
}
