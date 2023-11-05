import Fetcher from "utils/fetcher"
import {
  TAllPublicProjects,
  TCreateProject,
  TEditProject,
  TProjDetailsProfessional,
  TProjectDetailsCompany,
  TProjectRequest,
  TRemoveProfessional,
} from "./types"

export const apiCreateProject = (data: TCreateProject["requestType"]) => {
  return Fetcher.init<TCreateProject>("POST", "/api/project/create")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const getAllPublicProjects = () => {
  return Fetcher.init<TAllPublicProjects>(
    "GET",
    "/api/project/allpublicprofiledata",
  )
    .withCurrentToken()
    .newFetchData()
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
    .newFetchData()
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
    .newFetchData()
}

export const apiEditProject = (data: TEditProject["requestType"]) => {
  return Fetcher.init<TEditProject>("POST", "/api/project/update")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const apiCreateProjectRequest = (
  data: TProjectRequest["requestType"],
) => {
  return Fetcher.init<TProjectRequest>("POST", "/api/project/request")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const removeProfessional = (
  data: TRemoveProfessional["requestType"],
) => {
  return Fetcher.init<TRemoveProfessional>(
    "POST",
    "/api/project/removeprofessional/",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}
