// This file is for any auth related services / endpoints

import Fetcher from "utils/fetcher"
import { TCreateComp, TCreatePro, TLogin, TLogout } from "./types"

export const login = (data: TLogin["requestType"]) => {
  return Fetcher.init<TLogin>("POST", "/api/login")
    .withJsonPaylad(data)
    .fetchData()
}

export const createProfessional = (data: TCreatePro["requestType"]) => {
  return Fetcher.init<TCreatePro>("POST", "/api/professional/create")
    .withJsonPaylad(data)
    .fetchData()
}

export const createCompany = (data: TCreateComp["requestType"]) => {
  return Fetcher.init<TCreateComp>("POST", "/api/company/create")
    .withJsonPaylad(data)
    .fetchData()
}

export const logout = () => {
  return Fetcher.init<TLogout>("POST", "/api/logout")
    .withCurrentToken()
    .fetchData()
}
