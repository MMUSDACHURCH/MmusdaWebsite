import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Admin System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `<p>Your verification code is <strong>${code}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification code sent to ${email}`);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send email");
  }
};