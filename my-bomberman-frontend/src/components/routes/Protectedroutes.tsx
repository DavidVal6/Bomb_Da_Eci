import {Outlet,Navigate} from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.tsx";
import React from "react";
export default function Protectedroute(){
    const auth = useAuth()

    return auth ? <Outlet /> : <Navigate to={"/"} />
}