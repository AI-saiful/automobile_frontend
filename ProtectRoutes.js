"use client"
import React, {useContext} from "react";
import {UserContext} from "./context/AuthContext";
import {useRouter} from "next/navigation"

export default function ProtectRoute({children}){
    const {users} = useContext(UserContext);
    const router = useRouter();

    
    if (!users) return router.push('/login')
    
    return (
        <>{children}</>
    )
}
