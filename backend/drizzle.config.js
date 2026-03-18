import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/Drizzle/schema.js",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: process.env.Database_URL
  },
  verbose: true,
  strict: true
});
