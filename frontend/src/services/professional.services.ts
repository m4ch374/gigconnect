// Professional related endpoints

import Fetcher from "utils/fetcher"
import {
  TGetProfessionalUsers,
  TProfessionalById,
  TProfessionalProfile,
  TProfessionalProfileUpdate,
  TProjectRequestRespond,
  TPublicProfessionalProfile,
} from "./types"

export const getProfessionalProfile = () => {
  return Fetcher.init<TProfessionalProfile>(
    "GET",
    "/api/professional/profiledata",
  )
    .withCurrentToken()
    .fetchData()
}

export const getProfessionalPublicProfile = (
  data: TPublicProfessionalProfile["requestType"],
) => {
  return Fetcher.init<TPublicProfessionalProfile>(
    "GET",
    "/api/professional/profiledata/public",
  )
    .withCurrentToken()
    .withParams(data)
    .fetchData()
}

export const updateProfessionalProfile = (
  data: TProfessionalProfileUpdate["requestType"],
) => {
  return Fetcher.init<TProfessionalProfileUpdate>(
    "POST",
    "/api/professional/profiledata/update",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

export const getAllProfessionals = () => {
  return Fetcher.init<TGetProfessionalUsers>(
    "GET",
    "/api/professional/allpublicprofiledata",
  )
    .withCurrentToken()
    .fetchData()
}

export const apiGetProfessionalById = (
  data: TProfessionalById["requestType"],
) => {
  return Fetcher.init<TProfessionalById>(
    "GET",
    "/api/professional/profiledata/public",
  )
    .withCurrentToken()
    .withParams(data)
    .fetchData()
}

export const apiProjectRequestRespond = (
  data: TProjectRequestRespond["requestType"],
) => {
  return Fetcher.init<TProjectRequestRespond>(
    "POST",
    "/api/project/request/respond",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
