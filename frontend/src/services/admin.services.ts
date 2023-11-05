// This file is for admin related endpoints

import Fetcher from "utils/fetcher"
import { TGetAdmin, TSetVerify } from "./types"

export const getAdmin = () => {
  return Fetcher.init<TGetAdmin>("GET", "/api/admin/dashboard")
    .withCurrentToken()
    .newFetchData()
}

export const setVerify = (data: TSetVerify["requestType"]) => {
  return Fetcher.init<TSetVerify>("POST", "/api/admin/setverified")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}
