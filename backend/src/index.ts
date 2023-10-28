import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from "express"
import cors from "cors"
import HTTPError from "http-errors"
import {
  returnDummy,
  returnError,
  returnHi,
  returnPassword,
} from "srvices/hello"
import { ExternalLink, UserType, verifyToken } from "srvices/helper"
import { authLogin, authLogout } from "srvices/auth"
import { companyCreate, companyData, companyUpdate } from "srvices/company"
import {
  professionalCreate,
  professionalData,
  professionalUpdate,
} from "srvices/professional"
import { adminDashboard, adminSetVerified } from "srvices/admin"
import {
  projectCreate,
  projectDataCompany,
  projectDataProfessional,
} from "srvices/project"
import { requestCreate, requestRespond } from "srvices/request"

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
 * Return userId as string if the user's token is valid and matches the
 * expected userType, otherwise throw error.
 */
const checkAuth = (req: Request, userType: UserType) => {
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

  return payload.userId
}

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

app.post(
  "/api/company/profiledata/update",
  (
    req: ReqBody<{
      companyName: string
      abn: string
      companyDescription: string
      externalWebsites: ExternalLink[]
    }>,
    res,
    next,
  ) => {
    const userId = checkAuth(req as Request, UserType.Company)
    const { companyName, abn, companyDescription, externalWebsites } = req.body
    companyUpdate(
      userId,
      companyName,
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

app.post(
  "/api/professional/profiledata/update",
  (
    req: ReqBody<{
      firstName: string
      lastName: string
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
      description,
      skills,
      qualifications,
      externalWebsites,
    } = req.body
    professionalUpdate(
      userId,
      firstName,
      lastName,
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
