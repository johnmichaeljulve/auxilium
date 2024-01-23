import axios from 'axios'

const url = "http://localhost:5001/api/projects"

export const client = axios.create({
    baseURL: url,
})

