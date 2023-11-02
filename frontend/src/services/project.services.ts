import Fetcher from "utils/fetcher"
import {
  TAllPublicProjects,
  TCreateProject,
  TEditProject,
  TProjDetailsProfessional,
  TProjectDetailsCompany,
  TProjectRequest,
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

export const getProjectDetailsCompany = (
  data: TProjectDetailsCompany["requestType"],
) => {
  return Fetcher.init<TProjectDetailsCompany>(
    "GET",
    "/api/project/profiledata/company",
  )
    .withCurrentToken()
    .withParams(data)
    .fetchData()
}

export const apiEditProject = (data: TEditProject["requestType"]) => {
  return Fetcher.init<TEditProject>("POST", "/api/project/update")
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}

export const apiCreateProjectRequest = (
  data: TProjectRequest["requestType"],
) => {
  return Fetcher.init<TProjectRequest>("POST", "/api/project/request")
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
