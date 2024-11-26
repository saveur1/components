import { User } from 'next-auth';
export interface ILogin {
    email: string;
    password: string;
}

export interface IAuthenticationFeedback {
    error?: string,
    success?: string,
    user?: User
}