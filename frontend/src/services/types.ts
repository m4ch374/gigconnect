import { CompanyProfileData, CompanyUser } from "types/company.types"
import { ProjectStatus, TUser } from "types/general.types"
import {
  ProfessionalProfileData,
  ProfessionalUser,
} from "types/professional.types"
import { CreateProjectData, ListedProjectData } from "types/project.types"

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

// ===================================================
// /api/professional/allpublicprofiledata
// ===================================================
type GetProfessionalUsersRes = {
  professionalUsers: ProfessionalUser[]
}

export type TGetProfessionalUsers = TEndpoint<void, GetProfessionalUsersRes>
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
// /api/company/allpublicprofiledata
// ===================================================
type GetCompanyUsersRes = {
  companyUsers: CompanyUser[]
}

export type TGetCompanyUsers = TEndpoint<void, GetCompanyUsersRes>
// ===================================================

// ###################################################
// Project related endponts
// ###################################################

type CreateProjectRes = {
  projectId: string
}
export type TCreateProject = TEndpoint<CreateProjectData, CreateProjectRes>

// ===================================================
// /api/project/allpublicprofiledata
// ===================================================
type AllPublicProjectsRes = {
  projects: ListedProjectData[]
}

export type TAllPublicProjects = TEndpoint<void, AllPublicProjectsRes>
// ===================================================

// ===================================================
// /api/project/profiledata/professional
// ===================================================
type ProjDetailsProfessionalReq = {
  projectId: string
}

type ProjDetailsProfessionalRes = {
  title: string
  companyId: string
  companyName: string
  description: string
  tags: string[]
  inPerson: boolean
  location?: string
  creationDate: string
  status: ProjectStatus
  professionals: ProfessionalProfileData[]
}

export type TProjDetailsProfessional = TEndpoint<
  ProjDetailsProfessionalReq,
  ProjDetailsProfessionalRes
>
// ===================================================

// ===================================================
// .................. adding more ....................
// ===================================================
