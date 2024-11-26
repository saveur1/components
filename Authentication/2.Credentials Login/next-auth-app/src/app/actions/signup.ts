"use server";

import { IAuthenticationFeedback } from "@/types";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signupValidations } from "@/validations/sigupValidations";
import { Prisma } from "@prisma/client";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/emails";

export const signup = async (values: z.infer<typeof signupValidations>): Promise<IAuthenticationFeedback> => {
    const validatedFields = signupValidations.safeParse(values);

    if (!validatedFields.success)
        return { error: "Validation failed!" }

    const { email, password, name } = validatedFields.data;

    try {
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        await db.user.create({ data: { email, name, password: hashedPassword } });

        const verficationToken = await createVerificationToken(email);

        await sendVerificationEmail(email,verficationToken.token, name );

        return { success: "Confirmation email sent!" }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            // Customize Error if Email Already exists
            switch (error.code) {
                case "P2002":
                    return { error: "Email already exists in database" }
                default:
                    return { error: error?.message }
            }
        }

        return { error: (error as Error).message || "Something went wrong while creating user!" };

    }
}