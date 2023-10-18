import {Outlet,Navigate} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider.tsx";
export default function Protectedroute(){
    const auth = useAuth()

    return auth ? <Outlet /> : <Navigate to={"/"} />
}