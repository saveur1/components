import { z } from "zod"
 
export const loginValidations = z.object({
  email: z.string().min(5, { message: "email is required please!", }).email({message: "Enter valid email please!"}),
  password: z.string().min(6, { message: "Password is required please(6char+)!"})
})