import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute(){
    // const token = localStorage.getItem("token")

    const token = '123';
    if(!token){
        return <Navigate to="/login" />;
    }
    return <Outlet/>;
} 