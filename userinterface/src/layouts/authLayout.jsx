
import { Navigate, Outlet } from "react-router-dom"

export default function AuthLayout(){
    // const token =
    // localStorage.getItem("token")
    const token = 123;
    if(token){
        return <Navigate to='/' replace/>
    }
    return(

        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Outlet/>
        </div>
    )
}