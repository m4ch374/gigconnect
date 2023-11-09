// This file is for any auth related services / endpoints

import Fetcher from "utils/fetcher"
import { TCreateComp, TCreatePro, TLogin, TLogout, TOnboarded } from "./types"

export const login = (data: TLogin["requestType"]) => {
  return Fetcher.init<TLogin>("POST", "/api/login")
    .withJsonPaylad(data)
    .newFetchData()
}

export const createProfessional = (data: TCreatePro["requestType"]) => {
  return Fetcher.init<TCreatePro>("POST", "/api/professional/create")
    .withJsonPaylad(data)
    .newFetchData()
}

export const createCompany = (data: TCreateComp["requestType"]) => {
  return Fetcher.init<TCreateComp>("POST", "/api/company/create")
    .withJsonPaylad(data)
    .newFetchData()
}

export const logout = () => {
  return Fetcher.init<TLogout>("POST", "/api/logout")
    .withCurrentToken()
    .newFetchData()
}

export const getOnboarded = () => {
  return Fetcher.init<TOnboarded>("GET", "/api/user/onboarded")
    .withCurrentToken()
    .newFetchData()
}

export const putOnboarded = () => {
  return Fetcher.init<TOnboarded>("PUT", "/api/user/onboarded")
    .withCurrentToken()
    .newFetchData()
}
