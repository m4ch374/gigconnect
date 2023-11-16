// Project related endopints
import Fetcher from "utils/fetcher"
import {
  TAllPublicProjects,
  TCreateProject,
  TEditProject,
  TProjDetailsProfessional,
  TProjectChangeStatus,
  TProjectData,
  TProjectDelete,
  TProjectDetailsCompany,
  TProjectEditData,
  TProjectRequest,
  TProjectRequestData,
  TProjectRequestRespond,
  TProjectReviewData,
  TProjectReviewUserInfo,
  TRemoveProfessional,
  TUsserReviews,
} from "./types"

// Function for calling API route /api/project/create
// Used for company users to create a new project.
export const apiCreateProject = (data: TCreateProject["requestType"]) => {
  return Fetcher.init<TCreateProject>("POST", "/api/project/create")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/allpublicprofiledata
// Used to get a list of all publicly viewable projects.
export const getAllPublicProjects = () => {
  return Fetcher.init<TAllPublicProjects>(
    "GET",
    "/api/project/allpublicprofiledata",
  )
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/project/profiledata/professional
// Used to get project details to show to the logged in professional user.
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

// Function for calling API route /api/project/profiledata/company
// Used to get project details to show to the logged in professional user.
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

// Function for calling API route /api/project/update
// Used to edit the details of a project.
export const apiEditProject = (data: TEditProject["requestType"]) => {
  return Fetcher.init<TEditProject>("POST", "/api/project/update")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/request
// Used for a professional user to create a request to join a project.
export const apiCreateProjectRequest = (
  data: TProjectRequest["requestType"],
) => {
  return Fetcher.init<TProjectRequest>("POST", "/api/project/request")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/request/respond
// Used for a company user to respond to a request to join a project.
export const apiProjectRequestRespond = (
  data: TProjectRequestRespond["requestType"],
) => {
  return Fetcher.init<TProjectRequestRespond>(
    "POST",
    "/api/project/request/respond",
  )
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/removeprofessional
// Used for a company user to remove a professional user from a project.
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

// Function for calling API route /api/project/changestatus
// Used to change the status of a project
export const apiProjectChangeStatus = (
  data: TProjectChangeStatus["requestType"],
) => {
  return Fetcher.init<TProjectChangeStatus>("POST", "/api/project/changestatus")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/data
// Used to get information about a project.
export const apiProjectData = (data: TProjectData["requestType"]) => {
  return Fetcher.init<TProjectData>("GET", "/api/project/data")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

// Function for calling API route /api/project/editdata
// Used to get information used by the edit project data form.
export const apiGetProjectEditData = (
  data: TProjectEditData["requestType"],
) => {
  return Fetcher.init<TProjectEditData>("GET", "/api/project/editdata")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

// Function for calling API route /api/project/requestdata
// Used to get data about a request to join a project.
export const apiGetProjectRequestData = (
  data: TProjectRequestData["requestType"],
) => {
  return Fetcher.init<TProjectRequestData>("GET", "/api/project/requestdata")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}

// Function for calling API route /api/project/delete
// Used to delete a project.
export const apiProjectDelete = (data: TProjectDelete["requestType"]) => {
  return Fetcher.init<TProjectDelete>("POST", "/api/project/delete")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/project/review-userinfo
// Used to get information about users who the currently logged in user
// can write a review about for the specified project.
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

// Function for calling API route /api/project/review-data
// Used to pust review data about come users after completing a project.
export const apiProjectReviewData = (
  data: TProjectReviewData["requestType"],
) => {
  return Fetcher.init<TProjectReviewData>("POST", "/api/project/review-data")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/user/reviews
// Used to get the reviews which a user has received in the past.
export const apiUserReviews = (data: TUsserReviews["requestType"]) => {
  return Fetcher.init<TUsserReviews>("GET", "/api/user/reviews")
    .withCurrentToken()
    .withParams(data)
    .newFetchData()
}
