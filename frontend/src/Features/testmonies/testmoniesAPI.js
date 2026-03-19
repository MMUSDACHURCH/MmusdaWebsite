import { APIDomain } from "../../utils/APIDomain";

export const getFirstTwoTestimonies = async () => {
  const res = await fetch(`${APIDomain}/api/testimonies?limit=2`);
  if (!res.ok) throw new Error("Failed to fetch first two testimonies");
  return res.json();
};

export const getAllTestimonies = async () => {
  const res = await fetch(`${APIDomain}/api/testimonies`);
  if (!res.ok) throw new Error("Failed to fetch all testimonies");
  return res.json();
};

export const createTestimony = async (newTestimony) => {
  const res = await fetch(`${APIDomain}/api/testimonies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestimony),
  });
  if (!res.ok) throw new Error("Failed to create testimony");
  return res.json();
};