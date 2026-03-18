import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../Drizzle/db.js";
import { admins, registeredAdmins } from "../Drizzle/schema.js";
import { sendVerificationEmail } from "../mailer.js";
import { eq } from "drizzle-orm";

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const registerAdmin = async ({ email, password }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Email not registered in system");

  const adminId = admin[0].adminId;

  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);

  if (registered.length && !registered[0].isVerified) {
    const code = generateCode();
    await db.update(registeredAdmins).set({ verificationCode: code }).where(eq(registeredAdmins.registeredId, registered[0].registeredId));
    await sendVerificationEmail(email, code);
    return { message: "Verification code resent" };
  }

  if (registered.length && registered[0].isVerified) throw new Error("Admin already registered and verified");

  const hashedPassword = await bcrypt.hash(password, 10);
  const code = generateCode();

  await db.insert(registeredAdmins).values({
    adminId,
    password: hashedPassword,
    verificationCode: code,
  });

  await sendVerificationEmail(email, code);
  return { message: "Verification code sent" };
};

export const verifyAdmin = async ({ email, code }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const adminId = admin[0].adminId;

  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);
  if (!registered.length) throw new Error("Registration record not found");
  if (registered[0].verificationCode !== code) throw new Error("Invalid verification code");

  await db.update(registeredAdmins).set({ isVerified: true, verificationCode: null }).where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  return { message: "Verification successful" };
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const adminId = admin[0].adminId;

  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);
  if (!registered.length) throw new Error("Account not registered");
  if (!registered[0].isVerified) throw new Error("Account not verified");

  const isMatch = await bcrypt.compare(password, registered[0].password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ adminId, email: admin[0].email }, process.env.JWT_SECRET, { expiresIn: "1d" });

  return { token, fullName: admin[0].fullName, email: admin[0].email };
};

export const requestPasswordReset = async ({ email }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Email not found");

  const adminId = admin[0].adminId;

  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);
  if (!registered.length) throw new Error("Account not registered");

  const code = generateCode();
  await db.update(registeredAdmins).set({ verificationCode: code }).where(eq(registeredAdmins.registeredId, registered[0].registeredId));
  await sendVerificationEmail(email, code);

  return { message: "Reset code sent" };
};

export const verifyResetCode = async ({ email, code }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const adminId = admin[0].adminId;
  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);
  if (!registered.length) throw new Error("Account not registered");
  if (registered[0].verificationCode !== code) throw new Error("Invalid reset code");

  return { message: "Code verified" };
};

export const resetPassword = async ({ email, newPassword }) => {
  const admin = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin.length) throw new Error("Email not found");

  const adminId = admin[0].adminId;
  const registered = await db.select().from(registeredAdmins).where(eq(registeredAdmins.adminId, adminId)).limit(1);
  if (!registered.length) throw new Error("Account not registered");

  if (!registered[0].verificationCode) 
    throw new Error("Reset not requested or code not verified");

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.update(registeredAdmins)
    .set({ password: hashed, verificationCode: null })
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  return { message: "Password reset successful" };
};