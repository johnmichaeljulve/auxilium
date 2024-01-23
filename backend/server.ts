import express from "express"
import { connectDB } from "./database/db"
import { errorHandler } from "./middleware/errorMiddleware"
import { PORT } from "./utils/config"
import * as Colors from 'colors.ts'
Colors.colors( '','' )
const cors = require("cors")

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)
 
app.listen(PORT, () => {console.log("listening on port " + PORT)})