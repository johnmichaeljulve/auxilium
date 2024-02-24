import axios from 'axios'
import {API} from "../../../backend/utils/config"

// const url = "http://localhost:5001/api/"
const url = API

export const client = axios.create({
    baseURL: url,
})

