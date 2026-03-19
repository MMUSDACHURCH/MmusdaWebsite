import { APIDomain } from "../../utils/APIDomain";

export const getFirstTwoDedications = async () => {
  const res = await fetch(`${APIDomain}/api/dedications?limit=2`);
  if (!res.ok) throw new Error("Failed to fetch first two dedications");
  return res.json();
};

export const getAllDedications = async () => {
  const res = await fetch(`${APIDomain}/api/dedications`);
  if (!res.ok) throw new Error("Failed to fetch all dedications");
  return res.json();
};

export const createDedication = async (newDedication) => {
  const res = await fetch(`${APIDomain}/api/dedications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDedication),
  });
  if (!res.ok) throw new Error("Failed to create dedication");
  return res.json();
};