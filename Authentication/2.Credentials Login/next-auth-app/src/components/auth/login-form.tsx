"use client";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { loginValidations } from "@/validations/loginValidations";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from "react";
import { TbLoader2 } from "react-icons/tb";
import { login } from "@/app/actions/login";
import { DangerAlert, SuccessAlert } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
    const [isPending, startTransition]= useTransition();
    const [error, setError] = useState("");
    const [success,setSuccess] = useState("");

    const form = useForm<z.infer<typeof loginValidations>>({
        resolver: zodResolver(loginValidations),
        defaultValues: {
          email: "",
          password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginValidations>) {
        //clear success and error
        setError("");
        setSuccess("");

        startTransition(()=>{
            login(values).then((data)=>{
                setError(data?.error || "");
                setSuccess(data?.success || "");
            })
        })
    }

    //Catch Provider authentication error
    const searchParam = useSearchParams();
    const providerError = searchParam.get("error")==="OAuthAccountNotLinked"? "Email Already exists with different provider!" : "";

    return (
        <Form {...form}>
            <form method="POST"  onSubmit={ form.handleSubmit(onSubmit) }>
                <div className="relative w-full mb-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block uppercase text-gray-700 text-xs font-bold mb-2">Email</FormLabel>
                                <FormControl>
                                    <Input {...field } type="email" placeholder="xxxxxxx@example.com" style={{transition: "all 0.15s ease 0s"}} required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                </div>
                <div className="relative w-full mb-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block uppercase text-gray-700 text-xs font-bold mb-2">Password</FormLabel>
                                <FormControl>
                                    <Input {...field } type="password" placeholder="xxxxxxx@example.com" style={{transition: "all 0.15s ease 0s"}} required/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <label className="inline-flex items-center cursor-pointer">
                        <Input id="customCheckLogin" type="checkbox" className="block form-checkbox text-gray-800 ml-1 w-5 h-5" style={{transition: "all 0.15s ease 0s"}} /><span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                </div>
                {/* ERROR */}
                { 
                    (error || providerError) && 
                        <DangerAlert 
                            message={  error || providerError  }
                        /> 
                }

                { success && <SuccessAlert message={ success }/> }

                <div className="text-center mt-6">
                    <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full flex justify-center" type="submit" style={{transition: "all 0.15s ease 0s"}}>
                        { isPending? <TbLoader2 size={25} className="animate-spin text-white"/> : "Sign In" }
                    </button>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm