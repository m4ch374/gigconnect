// Company related endponts

import Fetcher from "utils/fetcher"
import {
  TCompanyProfile,
  TCompanyProfileUpdate,
  TGetCompanyUsers,
} from "./types"

export const getCompanyProfile = () => {
  return Fetcher.init<TCompanyProfile>("GET", "/api/company/profiledata")
    .withCurrentToken()
    .newFetchData()
}

export const updateCompanyProfile = (
  data: TCompanyProfileUpdate["requestType"],
) => {
  return Fetcher.init<TCompanyProfileUpdate>(
    "POST",
    "/api/company/profiledata/update",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const getAllCompanies = () => {
  return Fetcher.init<TGetCompanyUsers>(
    "GET",
    "/api/company/allpublicprofiledata",
  )
    .withCurrentToken()
    .newFetchData()
}
