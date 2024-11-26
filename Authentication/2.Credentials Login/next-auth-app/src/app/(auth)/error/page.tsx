"use client";
import { FaFlag } from "react-icons/fa";
import { useRouter } from "next/navigation"
 
export default function Error(){
    const router = useRouter();

    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <FaFlag
                    size={100}
                    className="mx-auto text-destructive"
                />
                <h1 className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 mt-10 !text-3xl !leading-snug md:!text-4xl">
                Error <br />
                It looks like something went wrong!
                </h1>
                <p className="block antialiased font-sans text-[18px] leading-relaxed text-inherit mt-8 mb-14 font-normal text-gray-500 mx-auto md:max-w-sm">
                    Don&apos;t worry, our team is already on it.Please try refreshing the page or
                    come back later.
                    </p>
                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-full px-4 md:w-[8rem]"
                    type="button"
                    data-ripple-light="true"
                    onClick={ ()=>router.back() }
                > 
                Go Back
                </button>
            </div>
        </div>
    )
}