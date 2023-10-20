// Types for company users

import { ExternalLink } from "./general.types"

export type CompanyProfileData = {
  companyName: string
  abn: string
  companyDescription: string
  externalWebsites: ExternalLink[]
  verified: boolean
}
