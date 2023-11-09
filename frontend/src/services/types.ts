import { CompanyProfileData, CompanyUser } from "types/company.types"
import { ProjectStatus, TUser } from "types/general.types"
import {
  ProfessionalProfileData,
  ProfessionalUser,
  ViewedProfessionalProfileData,
} from "types/professional.types"
import {
  CreateProjectData,
  EditProjectData,
  ListedProjectData,
  ProjectRequestData,
} from "types/project.types"

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
// /api/professional/profiledata/public
// ===================================================
export type TPublicProfessionalProfile = TEndpoint<
  { userId: string },
  ViewedProfessionalProfileData
>
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

// /api/project/create
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

type ProjectDetailsCompanyReq = {
  projectId: string
}

type ProjectDetailsCompanyRes = {
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
  requests: ProjectRequestData[]
}

export type TProjectDetailsCompany = TEndpoint<
  ProjectDetailsCompanyReq,
  ProjectDetailsCompanyRes
>

export type TEditProject = TEndpoint<EditProjectData, void>
// /api/project/request
type ProjectRequestReq = {
  projectId: string
  message: string
}
export type TProjectRequest = TEndpoint<ProjectRequestReq, void>

type ProjectRequestRespondReq = {
  requestId: string
  accepted: boolean
}
export type TProjectRequestRespond = TEndpoint<ProjectRequestRespondReq, void>

type ProfessionalByIdReq = {
  userId: string
}

// type ProfessionalByIdRes = {
//   firstName: string,
//   lastName: string,
//   description: string,
//   skills: string[],
//   qualifications: ExternalLink[],
//   externalWebsites: ExternalLink[],
//   verified: boolean,
//   completedProjects: projects[],
// }

export type TProfessionalById = TEndpoint<
  ProfessionalByIdReq,
  ProfessionalProfileData
>

// /api/project/removeprofessional/
export type TRemoveProfessional = TEndpoint<
  {
    projectId: string
    professionalId: string
  },
  { success: boolean }
>

// /api/project/changestatus
export type TProjectChangeStatus = TEndpoint<
  { projectId: string },
  { newStatus: ProjectStatus }
>

// /api/project/editdata
export type TProjectEditData = TEndpoint<
  { projectId: string },
  {
    title: string
    publicDescription: string
    privateDescription: string
    tags: string[]
    inPerson: boolean
    location: string
  }
>

// /api/project/requestData
export type TProjectRequestData = TEndpoint<
  {
    requestId: string
  },
  {
    requestId: string
    projectId: string
    projectName: string
    userId: string
    firstname: string
    lastName: string
    profilePhoto: string
    message: string
    creationDate: string
  }
>

// /api/project/delete
export type TProjectDelete = TEndpoint<{ projectId: string }, void>

// /api/project/review-userinfo
export type TProjectReviewUserInfo = TEndpoint<
  { projectId: string },
  {
    users: [
      {
        userId: string
        userName: string
        profilePhoto: string
      },
    ]
  }
>

// /api/project/review-data
export type TProjectReviewData = TEndpoint<
  {
    projectId: string
    reviews: [
      {
        userId: string
        rating: number
        comment: string
      },
    ]
  },
  void
>

// /api/user/reviews
export type TUsserReviews = TEndpoint<
  {
    userId: string
    userType: string
  },
  {
    reviews: [
      {
        userId: string
        userName: string
        profilePhoto: string
        projectId: string
        projectName: string
        rating: number
        comment: string
      },
    ]
  }
>

export type TOnboarded = TEndpoint<void, { onboarded: boolean }>

// ===================================================
// .................. adding more ....................
// ===================================================
