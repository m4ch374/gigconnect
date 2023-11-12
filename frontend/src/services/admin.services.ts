// This file is for admin related endpoints

import Fetcher from "utils/fetcher"
import { TGetAdmin, TSetVerify } from "./types"

// Function for calling API route /api/admin/dashboard
// Returns data used on the Admin Dashboard page.
export const getAdmin = () => {
  return Fetcher.init<TGetAdmin>("GET", "/api/admin/dashboard")
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/admin/setverified
// Used to set the verified status of a user.
export const setVerify = (data: TSetVerify["requestType"]) => {
  return Fetcher.init<TSetVerify>("POST", "/api/admin/setverified")
    .withCurrentToken()
    .withJsonPaylad(data)
    .newFetchData()
}
