import { useContext } from "react"
import {  UsersContext } from "../context/UserContext"

export const useUserContext = () =>{
    const context = useContext(UsersContext)

    return context
}