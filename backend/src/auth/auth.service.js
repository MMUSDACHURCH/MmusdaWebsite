import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../Drizzle/db.js";
import { admins, registeredAdmins } from "../Drizzle/schema.js";
import { sendVerificationEmail } from "../mailer.js";

// Generate 6-digit verification code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const registerAdmin = async ({ email, password }) => {
  // Check if admin exists
  const existingAdmin = await db.select().from(admins).where({ email }).limit(1);
  if (!existingAdmin.length) throw new Error("Admin not found in system");

  // Check if already registered
  const registered = await db.select().from(registeredAdmins)
    .where({ adminId: existingAdmin[0].adminId })
    .limit(1);
  if (registered.length) throw new Error("Admin already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate verification code
  const code = generateCode();

  // Insert into registeredAdmins
  const inserted = await db.insert(registeredAdmins).values({
    adminId: existingAdmin[0].adminId,
    password: hashedPassword,
    verificationCode: code,
  }).returning();

  // Send email
  await sendVerificationEmail(email, code);

  return inserted[0];
};

export const verifyAdmin = async ({ email, code }) => {
  const admin = await db.select().from(admins).where({ email }).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const registered = await db.select().from(registeredAdmins)
    .where({ adminId: admin[0].adminId })
    .limit(1);
  if (!registered.length) throw new Error("Registration record not found");

  if (registered[0].verificationCode !== code) throw new Error("Invalid verification code");

  await db.update(registeredAdmins)
    .set({ isVerified: true, verificationCode: null })
    .where({ registeredId: registered[0].registeredId });

  return true;
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await db.select().from(admins).where({ email }).limit(1);
  if (!admin.length) throw new Error("Admin not found");

  const registered = await db.select().from(registeredAdmins)
    .where({ adminId: admin[0].adminId })
    .limit(1);
  if (!registered.length || !registered[0].isVerified) throw new Error("Admin not verified");

  // Compare password
  const isMatch = await bcrypt.compare(password, registered[0].password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    { adminId: admin[0].adminId, email: admin[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, fullName: admin[0].fullName, email: admin[0].email };
};