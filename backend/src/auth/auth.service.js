import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../Drizzle/db.js";
import { admins, registeredAdmins } from "../Drizzle/schema.js";
import { sendVerificationEmail } from "../mailer.js";
import { eq } from "drizzle-orm";

// Generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register or resend verification code
export const registerAdmin = async ({ email, password }) => {
  // 1. Check if email exists in admins table
  const admin = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (!admin.length) {
    throw new Error("Email not registered in system");
  }

  const adminId = admin[0].adminId;

  // 2. Check if already registered
  const registered = await db
    .select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  // Already registered but not verified → resend code
  if (registered.length && !registered[0].isVerified) {
    const code = generateCode();
    await db
      .update(registeredAdmins)
      .set({ verificationCode: code })
      .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

    await sendVerificationEmail(email, code);

    return { message: "Verification code resent" };
  }

  // Already registered and verified
  if (registered.length && registered[0].isVerified) {
    throw new Error("Admin already registered and verified");
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Generate verification code
  const code = generateCode();

  // 5. Insert into registeredAdmins
  await db
    .insert(registeredAdmins)
    .values({
      adminId,
      password: hashedPassword,
      verificationCode: code,
    });

  // 6. Send verification email
  await sendVerificationEmail(email, code);

  return { message: "Verification code sent" };
};

// Verify code and login
export const verifyAndLoginAdmin = async ({ email, code, password }) => {
  // 1. Look up admin
  const admin = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (!admin.length) {
    throw new Error("Admin not found");
  }

  const adminId = admin[0].adminId;

  // 2. Look up registration
  const registered = await db
    .select()
    .from(registeredAdmins)
    .where(eq(registeredAdmins.adminId, adminId))
    .limit(1);

  if (!registered.length) {
    throw new Error("Registration record not found");
  }

  // 3. Check verification code
  if (registered[0].verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  // 4. Update as verified and clear code
  await db
    .update(registeredAdmins)
    .set({ isVerified: true, verificationCode: null })
    .where(eq(registeredAdmins.registeredId, registered[0].registeredId));

  // 5. Compare password
  const isMatch = await bcrypt.compare(password, registered[0].password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // 6. Generate JWT
  const token = jwt.sign(
    { adminId, email: admin[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    fullName: admin[0].fullName,
    email: admin[0].email,
  };
};