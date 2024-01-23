import express from "express"
import { connectDB } from "./backend/database/db"
import { errorHandler } from "./backend/middleware/errorMiddleware"
import { PORT } from "./backend/utils/config"
import * as Colors from 'colors.ts'
Colors.colors( '','' )
const cors = require("cors")

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/projects', require('./backend/routes/projectRoutes'))
app.use('/api/users', require('./backend/routes/userRoutes'))

app.use(errorHandler)
 
app.listen(PORT, () => {console.log("listening on port " + PORT)})