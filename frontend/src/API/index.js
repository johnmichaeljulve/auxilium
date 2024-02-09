import axios from 'axios'

const url = "http://localhost:5001/api/"

export const client = axios.create({
    baseURL: url,
})

