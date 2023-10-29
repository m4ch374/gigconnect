import Fetcher from "utils/fetcher"
import { TCreateProject } from "./types"

export const apiCreateProject = (data: TCreateProject["requestType"]) => {
  return Fetcher.init<TCreateProject>("POST", "/api/project/create")
    .withCurrentToken()
    .withJsonPaylad(data)
    .fetchData()
}
