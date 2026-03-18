import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export const sendVerificationEmail = async (email, code) => {
  const messageParts = [
    `From: Admin System <${process.env.EMAIL_USER}>`,
    `To: ${email}`,
    "Subject: Your Verification Code",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    `<p>Your verification code is <strong>${code}</strong></p>`,
  ];
  const message = messageParts.join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });
};
// import nodemailer from "nodemailer";

// export const sendVerificationEmail = async (email, code) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     const mailOptions = {
//       from: `"Admin System" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Verification Code",
//       html: `<p>Your verification code is <strong>${code}</strong></p>`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Verification code sent to ${email}`);
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to send email");
//   }
// };


// import sgMail from '@sendgrid/mail'

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export const sendVerificationEmail = async (email, code) => {
//   try {
//     await sgMail.send({
//       to: email,
//       from: process.env.SENDGRID_VERIFIED_SENDER,
//       subject: 'Your Verification Code',
//       html: `<p>Your verification code is <strong>${code}</strong></p>`
//     })
//     console.log(`Verification code sent to ${email}`)
//   } catch (err) {
//     console.error(err)
//     throw new Error('Failed to send email')
//   }
// }