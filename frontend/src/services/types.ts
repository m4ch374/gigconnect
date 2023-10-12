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
  loginToken: string
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
  loginToken: string
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
  loginToken: string
  userType: TUser
}

export type TCreateComp = TEndpoint<CreateCompReq, CreateCompRes>
// ===================================================

// ===================================================
// /api/logout
// ===================================================
export type TLogout = TEndpoint<void, { success: boolean }>
// ===================================================

// ###################################################
// Admin related endponts
// ###################################################

// ===================================================
// /api/admin/dashboard
// ===================================================
type TCompanyUser = {
  userId: string
  companyName: string
  verified: boolean
}

type TProfessionalUser = {
  userId: string
  firstName: string
  lastName: string
  verified: boolean
}

type GetAdminRes = {
  companyUsers: TCompanyUser[]
  professionalUsers: TProfessionalUser[]
}

export type TGetAdmin = TEndpoint<void, GetAdminRes>
// ===================================================

// ===================================================
// /api/admin/setverified
// ===================================================
type SetVerifyReq = {
  userId: string
  userType: TUser
  verified: boolean
}

type SetVerifyRes = {
  success: boolean
}

export type TSetVerify = TEndpoint<SetVerifyReq, SetVerifyRes>
// ===================================================

// ===================================================
// .................. adding more ....................
// ===================================================
