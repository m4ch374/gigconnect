// Company related endponts

import Fetcher from "utils/fetcher"
import {
  TCompanyProfile,
  TCompanyProfileUpdate,
  TGetCompanyUsers,
} from "./types"

// Function for calling API route /api/company/profiledata
// Used to get the profile data of the currently logged in company user
export const getCompanyProfile = () => {
  return Fetcher.init<TCompanyProfile>("GET", "/api/company/profiledata")
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/company/profiledata/update
// Used to update the profile datails of the currently logged in company user.
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

// Function for calling API route /api/company/allpublicprofiledata
// Used to get details of all company users on the system.
export const getAllCompanies = () => {
  return Fetcher.init<TGetCompanyUsers>(
    "GET",
    "/api/company/allpublicprofiledata",
  )
    .withCurrentToken()
    .newFetchData()
}
