import { db } from "../Drizzle/db.js";
import { subscribers } from "../Drizzle/schema.js";
import { eq } from "drizzle-orm";

export const subscribeService = async (email) => {
  if (!email) throw new Error("Email required");

  const existing = await db.select().from(subscribers).where(eq(subscribers.email, email));
  if (existing.length > 0) return { message: "Already subscribed" };

  await db.insert(subscribers).values({ email });
  return { message: "Subscribed successfully" };
};