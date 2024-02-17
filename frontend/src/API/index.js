import axios from 'axios'

// const url = "http://localhost:5001/api/"
const url = "https://auxilium.onrender.com/api/"

export const client = axios.create({
    baseURL: url,
})

