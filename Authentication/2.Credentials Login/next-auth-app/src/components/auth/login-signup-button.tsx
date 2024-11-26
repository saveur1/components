"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AunthenticationButtons = () => {
    const pathname = usePathname();

    return (
        <>
            {
                !pathname.includes("/login") &&
                    <Link
                        href="/login"
                        className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'
                    >
                        Login
                    </Link>
            }
            {
                !pathname.includes("signup") && 
                    <Link
                        href="/signup"
                        className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'
                    >
                        Sign up
                    </Link>
            }
            
        </>
    )
}

export default AunthenticationButtons