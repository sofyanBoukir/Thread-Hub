import { Navigate, Outlet } from "react-router-dom";

const useAuth = () =>{
    const tokenExist = localStorage.getItem("token");
    const authenticated = localStorage.getItem("authenticated");

    return tokenExist && authenticated === 'true' ? true : false;
}

export const ProtectHomeRoute = () =>{
    const isUserAuth = useAuth();
    return (
        isUserAuth ? <Outlet /> : <Navigate to={"/login"} /> 
    )
}