"use client"
import React from "react";
import {CookiesProvider} from "react-cookie"


export default function AppCookieProver({children}) {


    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    )


}
