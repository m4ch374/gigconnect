// Types for professional users

import { ExternalLink } from "./general.types"

export type ProfessionalProfileData = {
  firstName: string
  lastName: string
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
  verified: boolean
  description: string
}
