import "dotenv/config"
import express, { Express } from "express"
import cors from "cors"
import { returnHi } from "srvices/hello"

const port = process.env.PORT

const app: Express = express()

app.use(cors())

app.get("/", (_, res) => {
  res.json({
    result: returnHi(),
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port} at`)
  console.log(`http://localhost:${port}`)
})
