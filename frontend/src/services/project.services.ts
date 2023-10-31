import Fetcher from "utils/fetcher"
import { TAllPublicProjects, TCreateProject } from "./types"

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
