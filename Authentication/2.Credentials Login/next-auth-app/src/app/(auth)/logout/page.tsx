"use client";

import { useLayoutEffect } from 'react';
import Loading from '@/components/ui/loading';
import { signOut } from "next-auth/react";

const LogoutPage = () => {
    useLayoutEffect(()=> {
        const handleLogout = async()=>{
            await signOut({ redirectTo: "/login" });
        }

        handleLogout();
    }, [])
    return (
        <div className="flex flex-col justify-center items-center w-full h-64">
            <Loading />
            <h1 className="text-gray-500 font-semibold text-2xl mt-3">Logging Out...</h1>
        </div>
    )
}

export default LogoutPage