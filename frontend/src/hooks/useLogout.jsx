import { useUserContext } from "./userUserContext"

export const useLogout = () => {
    const {state, dispatch} = useUserContext()

    const logout = () =>{
        localStorage.removeItem('user')
        dispatch({type: "LOGOUT"})
    }

    return {logout}
}