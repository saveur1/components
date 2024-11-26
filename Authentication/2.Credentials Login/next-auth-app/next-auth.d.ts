import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        user: {
            role:UserRole;
        } & DefaultSession
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role?: UserRole
    }
}