import Fetcher from "utils/fetcher"
import {
  TAllPublicProjects,
  TCreateProject,
  TProjDetailsProfessional,
} from "./types"

export const apiCreateProject = (data: TCreateProject["requestType"]) => {
  return Fetcher.init<TCreateProject>("POST", "/api/project/create")
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

export const getAllPublicProjects = () => {
  return Fetcher.init<TAllPublicProjects>(
    "GET",
    "/api/project/allpublicprofiledata",
  )
    .withCurrentToken()
    .fetchData()
}

export const getProjectDetailsProfessional = (
  data: TProjDetailsProfessional["requestType"],
) => {
  return Fetcher.init<TProjDetailsProfessional>(
    "GET",
    "/api/project/profiledata/professional",
  )
    .withCurrentToken()
    .withParams(data)
    .fetchData()
}
