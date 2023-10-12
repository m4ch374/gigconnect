// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

// ###################################################
// Auth related endponts
// ###################################################

// ===================================================
// General
// ===================================================
type TUser = "admin" | "company" | "professional"

// ===================================================
// /api/login
// ===================================================
type LoginReq = {
  email: string
  password: string
}

type LoginRes = {
  token: string
  userType: TUser
}

export type TLogin = TEndpoint<LoginReq, LoginRes>
// ===================================================

// ===================================================
// /api/professional/create
// ===================================================
type CreateProReq = {
  email: string
  firstName: string
  lastName: string
  password: string
}

type CreateProRes = {
  token: string
  userType: TUser
}

export type TCreatePro = TEndpoint<CreateProReq, CreateProRes>
// ===================================================

// ===================================================
// /api/company/create
// ===================================================
type CreateCompReq = {
  email: string
  companyName: string
  abn: string
  password: string
}

type CreateCompRes = {
  token: string
  userType: TUser
}

export type TCreateComp = TEndpoint<CreateCompReq, CreateCompRes>
// ===================================================

// ===================================================
// .................. adding more ....................
// ===================================================
