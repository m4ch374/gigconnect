// Types for professional users

import { ExternalLink } from "./general.types"
import { ListedProjectData } from "./project.types"

export type ProfessionalProfileData = {
  firstName: string
  lastName: string
  profilePhoto: string
  projects: ListedProjectData[]
  description: string
  skills: string[]
  qualifications: ExternalLink[]
  externalWebsites: ExternalLink[]
  verified: boolean
}

export type ProfessionalUser = {
  userId: string
  firstName: string
  lastName: string
  profilePhoto: string
  verified: boolean
  description: string
}
