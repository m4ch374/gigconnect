// Professional related endpoints

import Fetcher from "utils/fetcher"
import {
  TGetProfessionalUsers,
  TProfessionalById,
  TProfessionalProfile,
  TProfessionalProfileUpdate,
  TPublicProfessionalProfile,
} from "./types"

// Function for calling API route /api/professional/profiledata
// Gets the profile data of the currently logged in professional user.
export const getProfessionalProfile = () => {
  return Fetcher.init<TProfessionalProfile>(
    "GET",
    "/api/professional/profiledata",
  )
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/professional/profiledata/public
// Used to get the profile data of a professional user specified in the request
export const getProfessionalPublicProfile = (
  data: TPublicProfessionalProfile["requestType"],
) => {
  return Fetcher.init<TPublicProfessionalProfile>(
    "GET",
    "/api/professional/profiledata/public",
  )
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

// Function for calling API route /api/professional/profiledata/update
// Used to update the profile data of the currently logged in professional user.
export const updateProfessionalProfile = (
  data: TProfessionalProfileUpdate["requestType"],
) => {
  return Fetcher.init<TProfessionalProfileUpdate>(
    "POST",
    "/api/professional/profiledata/update",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/professional/allpublicprofiledata
// Used to get details of all professional users on the system.
export const getAllProfessionals = () => {
  return Fetcher.init<TGetProfessionalUsers>(
    "GET",
    "/api/professional/allpublicprofiledata",
  )
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/professional/profiledata/public
// Used to get public profile data of a professional user
export const apiGetProfessionalById = (
  data: TProfessionalById["requestType"],
) => {
  return Fetcher.init<TProfessionalById>(
    "GET",
    "/api/professional/profiledata/public",
  )
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}
