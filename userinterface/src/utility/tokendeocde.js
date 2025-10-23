import { jwtDecode } from "jwt-decode"
export const token =()=>{

    const token = localStorage.getItem('token')
    if(!token) return
    const data = jwtDecode(token)
    return data
}