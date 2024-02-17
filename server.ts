import express from "express"
import { connectDB } from "./backend/database/db"
import { errorHandler } from "./backend/middleware/errorMiddleware"
import { PORT } from "./backend/utils/config"
require('dotenv').config()

const cors = require("cors")

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/projects', require('./backend/routes/projectRoutes'))
app.use('/api/user', require('./backend/routes/userRoutes'))

app.use(errorHandler)
 
app.listen(PORT, () => {console.log("listening on port " + PORT)})