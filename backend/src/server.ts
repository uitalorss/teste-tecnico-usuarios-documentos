import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { router } from "./shared/infra/routes"
import "./shared/container/index"
import cors from "cors"
import bodyParser from "body-parser"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger-output.json"
import { handleErrors } from "./shared/infra/middlewares/handleErrors"

export const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(handleErrors)

app.listen(3000, () => console.log("Server is running on port 3000."))