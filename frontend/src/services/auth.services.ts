// This file is for any auth related services / endpoints

import Fetcher from "utils/fetcher"
import { TCreateComp, TCreatePro, TLogin, TLogout, TOnboarded } from "./types"

// Function for calling API route /api/login
// Used for logging in all types of users.
export const login = (data: TLogin["requestType"]) => {
  return Fetcher.init<TLogin>("POST", "/api/login")
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/professional/create
// Used for creating a professional user.
export const createProfessional = (data: TCreatePro["requestType"]) => {
  return Fetcher.init<TCreatePro>("POST", "/api/professional/create")
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/company/create
// Used for creating a company user.
export const createCompany = (data: TCreateComp["requestType"]) => {
  return Fetcher.init<TCreateComp>("POST", "/api/company/create")
    .withJsonPaylad(data)
    .newFetchData()
}

// Function for calling API route /api/logout
// Used for logging out all types of users.
export const logout = () => {
  return Fetcher.init<TLogout>("POST", "/api/logout")
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/user/onboarded (GET)
// Used for getting the onboarded status of a user to determine if the acccount
// setup screen should be shown.
export const getOnboarded = () => {
  return Fetcher.init<TOnboarded>("GET", "/api/user/onboarded")
    .withCurrentToken()
    .newFetchData()
}

// Function for calling API route /api/user/onboarded (PUT)
// Used for setting the onboarded status of a user.
export const putOnboarded = () => {
  return Fetcher.init<TOnboarded>("PUT", "/api/user/onboarded")
    .withCurrentToken()
    .newFetchData()
}
