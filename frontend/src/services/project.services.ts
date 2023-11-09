import Fetcher from "utils/fetcher"
import {
  TAllPublicProjects,
  TCreateProject,
  TEditProject,
  TProjDetailsProfessional,
  TProjectChangeStatus,
  TProjectDelete,
  TProjectDetailsCompany,
  TProjectEditData,
  TProjectRequest,
  TProjectRequestData,
  TProjectReviewData,
  TProjectReviewUserInfo,
  TRemoveProfessional,
  TUsserReviews,
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

export const apiProjectChangeStatus = (
  data: TProjectChangeStatus["requestType"],
) => {
  return Fetcher.init<TProjectChangeStatus>("POST", "/api/project/changestatus")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const apiGetProjectEditData = (
  data: TProjectEditData["requestType"],
) => {
  return Fetcher.init<TProjectEditData>("GET", "/api/project/edittdata")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

export const apiGetProjectRequestData = (
  data: TProjectRequestData["requestType"],
) => {
  return Fetcher.init<TProjectRequestData>("GET", "/api/project/requestdata")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

export const apiProjectDelete = (data: TProjectDelete["requestType"]) => {
  return Fetcher.init<TProjectDelete>("POST", "/api/project/delete")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const apiProjectReviewUserInfo = (
  data: TProjectReviewUserInfo["requestType"],
) => {
  return Fetcher.init<TProjectReviewUserInfo>(
    "GET",
    "/api/project/review-userinfo",
  )
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

export const apiProjectReviewData = (
  data: TProjectReviewData["requestType"],
) => {
  return Fetcher.init<TProjectReviewData>("POST", "/api/project/review-data")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

export const apiUserReviews = (data: TUsserReviews["requestType"]) => {
  return Fetcher.init<TUsserReviews>("GET", "/api/user/reviews")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}
