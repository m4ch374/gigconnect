import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from "express"
import cors from "cors"
import { returnError, returnHi, returnPassword } from "srvices/hello"
import { ExternalLink } from "srvices/helper"
import { authLogin, authLogout } from "srvices/auth"
import { companyCreate, companyData, companyUpdate } from "srvices/company"
import {
  professionalCreate,
  professionalData,
  professionalUpdate,
} from "srvices/professional"
import { adminDashboard, adminSetVerified } from "srvices/admin"

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

app.use(cors())

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

// API routes

app.post(
  "/api/login",
  (req: ReqBody<{ email: string; password: string }>, res) => {
    const { email, password } = req.body
    res.json(authLogin(email, password))
  },
)

app.post("/api/logout", (_, res) => {
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
  ) => {
    const { email, password, companyName, abn } = req.body
    res.json(companyCreate(email, password, companyName, abn))
  },
)

app.get("/api/company/profiledata", (_, res) => {
  res.json(companyData("1"))
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
  ) => {
    const { companyName, abn, companyDescription, externalWebsites } = req.body
    res.json(
      companyUpdate(
        "1",
        companyName,
        abn,
        companyDescription,
        externalWebsites,
      ),
    )
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
  ) => {
    const { email, password, firstName, lastName } = req.body
    res.json(professionalCreate(email, password, firstName, lastName))
  },
)

app.get("/api/professional/profiledata", (_, res) => {
  res.json(professionalData("1"))
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
  ) => {
    const {
      firstName,
      lastName,
      description,
      skills,
      qualifications,
      externalWebsites,
    } = req.body
    res.json(
      professionalUpdate(
        "1",
        firstName,
        lastName,
        description,
        skills,
        qualifications,
        externalWebsites,
      ),
    )
  },
)

app.get("/api/admin/dashboard", (_, res) => {
  res.json(adminDashboard())
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
  ) => {
    const { userId, userType, verified } = req.body
    res.json(adminSetVerified(userId, userType, verified))
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
