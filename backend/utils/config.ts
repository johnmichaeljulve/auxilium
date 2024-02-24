require("dotenv").config()

export const PORT = process.env.PORT || 5000
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const MONGO_URI = process.env.MONGO_URI || null
export const SECRET = process.env.SECRET || null
export const API = process.env.API || null
