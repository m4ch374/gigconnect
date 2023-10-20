// Professional related endpoints

import Fetcher from "utils/fetcher"
import { TProfessionalProfile, TProfessionalProfileUpdate } from "./types"

export const getProfessionalProfile = () => {
  return Fetcher.init<TProfessionalProfile>(
    "GET",
    "/api/professional/profiledata",
  )
    .withCurrentToken()
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
