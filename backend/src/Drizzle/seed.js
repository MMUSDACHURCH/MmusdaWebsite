import { db } from "./db.js";
import { testimonies, dedications } from "./schema.js";

async function seed() {
  try {
    await db.insert(testimonies).values({
      name: "John Doe",
      description: "I thank God for His goodness and blessings in my life.",
      isApproved: true
    });

    await db.insert(dedications).values({
      childName: "Baby Jane",
      fatherName: "Michael Doe",
      motherName: "Sarah Doe",
      availableDate: "2026-04-10",
      contactNumber: "0712345678",
      email: "parent@example.com",
      status: "pending",
      notes: "First dedication request"
    });

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();