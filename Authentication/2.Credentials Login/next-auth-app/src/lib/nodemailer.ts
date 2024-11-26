import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465, //email port 587
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASSWORD,
    },
});

export default transporter;