"use client";
import { newVerification } from "@/app/actions/verification-token";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState, useTransition } from "react";
import { MoonLoader } from "react-spinners";


const NewVerificationToken = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const params = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useLayoutEffect(()=> {
        startTransition(()=> {

            newVerification(params.get("token")!).then((data)=> {
                setError(data?.error || "");
                setSuccess(data?.success || "");
            })
            .catch((error)=> console.log(error))

        })
    }, [params])

    return (
        <div className="w-full flex flex-col justify-center h-96  items-center">
            { isPending &&
                <>
                    <MoonLoader size={40} className="animate-spin" color="green"/>
                    <h2 className="text-lg text-gray-600 mt-2">Verifying Email...</h2>
                </>
            }
            { success && 
                <>
                    <h2 className="text-emerald-600 text-2xl font-semibold">{ success }</h2>
                    <Button 
                        variant={"default"}
                        className="mt-3"
                        onClick={()=> router.push("/login")}>Login here</Button>
                </>
            }
            { error && <h2 className="text-red-700 text-2xl font-semibold">{ error }</h2>}
        </div>
    )
}

export default NewVerificationToken