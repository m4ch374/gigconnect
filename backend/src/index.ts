import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from "express"
import cors from "cors"
import HTTPError from "http-errors"
import {
  returnDummy,
  returnError,
  returnHi,
  returnPassword,
  returnTestData,
} from "./srvices/hello"
import { ExternalLink, UserType, verifyToken } from "./srvices/helper"
import {
  authLogin,
  authLogout,
  onboardedData,
  onboardedUpdate,
} from "./srvices/auth"
import {
  companyCreate,
  companyData,
  companyUpdate,
  allCompanyPublicData,
  companyDataPublic,
} from "./srvices/company"
import {
  professionalCreate,
  professionalData,
  professionalUpdate,
  allProfessionalPublicData,
  professionalDataPublic,
} from "./srvices/professional"
import { adminDashboard, adminSetVerified } from "./srvices/admin"
import {
  projectChangeStatus,
  projectCreate,
  projectUpdate,
  projectDataCompany,
  projectDataProfessional,
  allProjectPublicData,
  removeProfessional,
  projectData,
  projectDataEdit,
  projectDelete,
} from "./srvices/project"
import { requestCreate, requestData, requestRespond } from "./srvices/request"
import {
  reviewCandidates,
  reviewCreate,
  reviewData,
  reviewInput,
} from "./srvices/review"

interface ReqQuery<T> extends Express.Request {
  query: T
}

interface ReqBody<T> extends Express.Request {
  body: T
}

interface Error {
  status?: number
  statusCode?: number
  message?: string
  stack?: string
}

const port = process.env.PORT

const app: Express = express()

app.use(express.json())
app.use(cors())

// Helper functions

/**
 * Return token payload if the user's token is valid and matches the
 * expected userType, otherwise throw error.
 */
const checkAuthPayload = (req: Request, userType: UserType) => {
  const header = req.headers.authorization
  if (header === undefined || !header.startsWith("Bearer ")) {
    throw HTTPError(
      401,
      "Authorization header is missing or incorrectly formatted.",
    )
  }

  const payload = verifyToken(header.substring(7))
  if (userType !== UserType.Any && userType !== payload.userType) {
    throw HTTPError(403, "Incorrect permissions to access this route.")
  }

  return payload
}

/**
 * Return userId as string if the user's token is valid and matches the
 * expected userType, otherwise throw error.
 */
const checkAuth = (req: Request, userType: UserType) =>
  checkAuthPayload(req, userType).userId

// Debug routes

app.get("/", (_, res) => {
  res.json({
    result: returnHi(),
  })
})

app.get("/error", (_, res) => {
  res.json(returnError())
})

app.get("/password", (_, res, next) => {
  returnPassword()
    .then(result => res.json(result))
    .catch(next)
})

app.get("/dummy", (_, res, next) => {
  returnDummy()
    .then(result => res.json(result))
    .catch(next)
})

app.get("/testdata", (_, res, next) => {
  returnTestData()
    .then(result => res.json(result))
    .catch(next)
})

// API routes

app.post(
  "/api/login",
  (req: ReqBody<{ email: string; password: string }>, res, next) => {
    const { email, password } = req.body
    authLogin(email, password)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post("/api/logout", (req, res) => {
  checkAuth(req, UserType.Any)
  res.json(authLogout())
})

app.get("/api/user/onboarded", (req, res, next) => {
  const { userId, userType } = checkAuthPayload(req, UserType.Any)
  onboardedData(userId, userType)
    .then(result => res.json(result))
    .catch(next)
})

app.put("/api/user/onboarded", (req, res, next) => {
  const { userId, userType } = checkAuthPayload(req, UserType.Any)
  onboardedUpdate(userId, userType)
    .then(result => res.json(result))
    .catch(next)
})

app.post(
  "/api/company/create",
  (
    req: ReqBody<{
      email: string
      password: string
      companyName: string
      abn: string
    }>,
    res,
    next,
  ) => {
    const { email, password, companyName, abn } = req.body
    companyCreate(email, password, companyName, abn)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/company/profiledata", (req, res, next) => {
  const userId = checkAuth(req, UserType.Company)
  companyData(userId)
    .then(result => res.json(result))
    .catch(next)
})

app.get(
  "/api/company/profiledata/public",
  // tested via "?userId=2" in link, since its a GET req
  (req: ReqQuery<{ userId: string }>, res, next) => {
    checkAuth(req as unknown as Request, UserType.Any)
    const { userId } = req.query
    companyDataPublic(userId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/company/allpublicprofiledata", (req, res, next) => {
  checkAuth(req, UserType.Any)
  allCompanyPublicData()
    .then(result => res.json(result))
    .catch(next)
})

app.post(
  "/api/company/profiledata/update",
  (
    req: ReqBody<{
      companyName: string
      profilePhoto: string
      abn: string
      companyDescription: string
      externalWebsites: ExternalLink[]
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const {
      companyName,
      profilePhoto,
      abn,
      companyDescription,
      externalWebsites,
    } = req.body
    companyUpdate(
      userId,
      companyName,
      profilePhoto,
      abn,
      companyDescription,
      externalWebsites,
    )
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/professional/create",
  (
    req: ReqBody<{
      email: string
      password: string
      firstName: string
      lastName: string
    }>,
    res,
    next,
  ) => {
    const { email, password, firstName, lastName } = req.body
    professionalCreate(email, password, firstName, lastName)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/professional/profiledata", (req, res, next) => {
  const userId = checkAuth(req, UserType.Professional)
  professionalData(userId)
    .then(result => res.json(result))
    .catch(next)
})

app.get(
  "/api/professional/profiledata/public",
  (req: ReqQuery<{ userId: string }>, res, next) => {
    checkAuth(req as unknown as Request, UserType.Any)
    const { userId } = req.query
    professionalDataPublic(userId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/professional/allpublicprofiledata", (req, res, next) => {
  // viewer must still be logged in, but we don't need userId
  checkAuth(req, UserType.Any)
  allProfessionalPublicData()
    .then(result => res.json(result))
    .catch(next)
})

app.post(
  "/api/professional/profiledata/update",
  (
    req: ReqBody<{
      firstName: string
      lastName: string
      profilePhoto: string
      description: string
      skills: string[]
      qualifications: ExternalLink[]
      externalWebsites: ExternalLink[]
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Professional)
    const {
      firstName,
      lastName,
      profilePhoto,
      description,
      skills,
      qualifications,
      externalWebsites,
    } = req.body
    professionalUpdate(
      userId,
      firstName,
      lastName,
      profilePhoto,
      description,
      skills,
      qualifications,
      externalWebsites,
    )
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/admin/dashboard", (req, res, next) => {
  checkAuth(req, UserType.Admin)
  adminDashboard()
    .then(result => res.json(result))
    .catch(next)
})

app.post(
  "/api/admin/setverified",
  (
    req: ReqBody<{
      userId: string
      userType: string
      verified: boolean
    }>,
    res,
    next,
  ) => {
    checkAuth(req as Request, UserType.Admin)
    const { userId, userType, verified } = req.body
    adminSetVerified(userId, userType, verified)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/create",
  (
    req: ReqBody<{
      title: string
      publicDescription: string
      privateDescription: string
      tags: string[]
      inPerson: boolean
      location: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const {
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    } = req.body
    projectCreate(
      userId,
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    )
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/update",
  (
    req: ReqBody<{
      projectId: string
      title: string
      publicDescription: string
      privateDescription: string
      tags: string[]
      inPerson: boolean
      location: string
    }>,
    res,
    next,
  ) => {
    const companyId = checkAuth(req as Request, UserType.Company)
    const {
      projectId,
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    } = req.body
    projectUpdate(
      projectId,
      companyId,
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    )
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/profiledata/professional",
  (
    req: ReqQuery<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as unknown as Request, UserType.Professional)
    const { projectId } = req.query
    projectDataProfessional(userId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/profiledata/company",
  (
    req: ReqQuery<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as unknown as Request, UserType.Company)
    const { projectId } = req.query
    projectDataCompany(userId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/data",
  (
    req: ReqQuery<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const { userId, userType } = checkAuthPayload(
      req as unknown as Request,
      UserType.Any,
    )
    const { projectId } = req.query
    projectData(userId, userType, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/editdata",
  (
    req: ReqQuery<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as unknown as Request, UserType.Company)
    const { projectId } = req.query
    projectDataEdit(userId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/requestdata",
  (
    req: ReqQuery<{
      requestId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as unknown as Request, UserType.Company)
    const { requestId } = req.query
    requestData(userId, requestId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/changestatus",
  (
    req: ReqBody<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const { projectId } = req.body
    projectChangeStatus(userId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/request",
  (
    req: ReqBody<{
      projectId: string
      message: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Professional)
    const { projectId, message } = req.body
    requestCreate(userId, projectId, message)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/request/respond",
  (
    req: ReqBody<{
      requestId: string
      accepted: boolean
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const { requestId, accepted } = req.body
    requestRespond(userId, requestId, accepted)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/project/review-userinfo",
  (
    req: ReqQuery<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const { userId, userType } = checkAuthPayload(
      req as unknown as Request,
      UserType.Any,
    )
    const { projectId } = req.query
    reviewCandidates(userId, userType, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/review-data",
  (
    req: ReqBody<{
      projectId: string
      reviews: reviewInput[]
    }>,
    res,
    next,
  ) => {
    const { userId, userType } = checkAuthPayload(
      req as unknown as Request,
      UserType.Any,
    )
    const { projectId, reviews } = req.body
    reviewCreate(userId, userType, projectId, reviews)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get(
  "/api/user/reviews",
  (
    req: ReqQuery<{
      userId: string
      userType: string
    }>,
    res,
    next,
  ) => {
    checkAuth(req as unknown as Request, UserType.Any)
    const { userId, userType } = req.query
    reviewData(userId, userType)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.get("/api/project/allpublicprofiledata", (req, res, next) => {
  checkAuth(req, UserType.Any)
  allProjectPublicData()
    .then(result => res.json(result))
    .catch(next)
})

app.post(
  "/api/project/removeprofessional/",
  (
    req: ReqBody<{
      professionalId: string
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const { professionalId, projectId } = req.body
    removeProfessional(userId, professionalId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

app.post(
  "/api/project/delete",
  (
    req: ReqBody<{
      projectId: string
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const { projectId } = req.body
    projectDelete(userId, projectId)
      .then(result => res.json(result))
      .catch(next)
  },
)

// Error-handler, this must be defined LAST after all other app.use() and routes
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  })
  next()
})
app.listen(port, () => {
  console.log(`Listening on port ${port} at`)
  console.log(`http://localhost:${port}`)
})
