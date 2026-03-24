import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export const sendVerificationEmail = async (email, code) => {
  const message = [
    `From: Admin System <${process.env.EMAIL_USER}>`,
    `To: ${email}`,
    "Subject: Your Verification Code",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    `<p>Your verification code is <strong>${code}</strong></p>`
  ].join("\n");

  const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  await gmail.users.messages.send({ userId: "me", requestBody: { raw: encodedMessage } });
};

export const sendNotificationEmail = async (email, messageContent) => {
  const message = [
    `From: MMUSDA Church <${process.env.EMAIL_USER}>`,
    `To: ${email}`,
    "Subject: Live Session Notification",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    `<p>${messageContent}</p>`
  ].join("\n");

  const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  await gmail.users.messages.send({ userId: "me", requestBody: { raw: encodedMessage } });
};