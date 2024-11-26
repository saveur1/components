"use server";

import { signIn } from "@/auth";
import { IAuthenticationFeedback } from "@/types";
import { loginValidations } from "@/validations/loginValidations";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from "next-auth";
import { getUserByEmail } from "./users";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/emails";


export const login = async(values: z.infer<typeof loginValidations>):Promise<IAuthenticationFeedback> => {
    const validatedFields = loginValidations.safeParse(values);

    if(!validatedFields.success)
        return { error: "Validation failed!" }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password)
        return { error: "Email Does not exists!" }

    if(!existingUser.emailVerified){
        const verificationToken = await createVerificationToken(existingUser.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token, existingUser?.name || "Sir!");

        return { success : "Email Verification token sent!" }
    }

    try {
        await signIn("credentials", {
            email, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        }); 
        return { success: "Login Successful!"}
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error:"Invalid email or password!"}
                default:
                    return { error: "Something went wrong!"};
            }
        }

        throw error;
    }
}