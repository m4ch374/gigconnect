import "dotenv/config"
import express, { Express } from "express"
import cors from "cors"
import { returnHi } from "srvices/hello"
import { authLogin, authLogout } from "srvices/auth"

interface ReqBody<T> extends Express.Request {
  body: T
}

const port = process.env.PORT

const app: Express = express()

app.use(cors())

app.get("/", (_, res) => {
  res.json({
    result: returnHi(),
  })
})

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

// Add more routes here

app.listen(port, () => {
  console.log(`Listening on port ${port} at`)
  console.log(`http://localhost:${port}`)
})
