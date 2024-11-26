import { VerificationEmailTemplate } from "@/components/auth/verification-email";
import { Resend } from "resend";
import transporter from "./nodemailer";


const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  const { response,rejected } = await transporter.sendMail({
    from: "bikorimanaxavier@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: VerificationEmailTemplate(confirmLink, name),
  });

  console.log(response, rejected);
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
