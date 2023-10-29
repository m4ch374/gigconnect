import { CompanyProfileData } from "types/company.types"
import { TUser } from "types/general.types"
import { ProfessionalProfileData } from "types/professional.types"
import { CreateProjectData } from "types/project.types"

// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

// ###################################################
// Auth related endponts
// ###################################################

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

// ###################################################
// Professional related endponts
// ###################################################

// ===================================================
// /api/professional/profiledata
// ===================================================
export type TProfessionalProfile = TEndpoint<void, ProfessionalProfileData>
// ===================================================

// ===================================================
// /api/professional/profiledata/update
// ===================================================
export type TProfessionalProfileUpdate = TEndpoint<
  ProfessionalProfileData,
  void
>
// ===================================================

// ###################################################
// Company related endponts
// ###################################################

// ===================================================
// /api/company/profiledata
// ===================================================
export type TCompanyProfile = TEndpoint<void, CompanyProfileData>
// ===================================================

// ===================================================
// /api/company/profiledata/update
// ===================================================
export type TCompanyProfileUpdate = TEndpoint<CompanyProfileData, void>
// ===================================================

// ===================================================
// .................. adding more ....................
// ===================================================

// Project related endpoints

type CreateProjectRes = {
  projectId: string
}
export type TCreateProject = TEndpoint<CreateProjectData, CreateProjectRes>
