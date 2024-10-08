import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { router } from "./shared/infra/routes"
import "./shared/container/index"
import cors from "cors"

export const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(3000, () => console.log("Server is running on port 3000."))