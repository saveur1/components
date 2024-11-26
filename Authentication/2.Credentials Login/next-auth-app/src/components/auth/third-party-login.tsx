"use client";

import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const ThirdPartLogin = () => {
    const onClickLogin = (provider:"google"|"github")=> {
        signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <>
            <Button onClick={()=> onClickLogin("github")} className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex border hover:bg-white items-center font-bold text-xs" type="button" style={{transition: "all 0.15s ease 0s"}}><FaGithub size={20} className="mr-1"/>Github</Button>
            <Button onClick={()=> onClickLogin("google")} className="bg-white active:bg-gray-100 text-gray-800 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex border hover:bg-white items-center font-bold text-xs" type="button" style={{transition: "all 0.15s ease 0s"}}><FcGoogle size={20} className="mr-1"/>Google</Button>
        </>
    )
}

export default ThirdPartLogin