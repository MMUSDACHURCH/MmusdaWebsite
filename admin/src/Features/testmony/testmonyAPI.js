import { APIDomain } from "../../utils/APIDomain";

export const getAllTestimonies = async () => {
  const res = await fetch(`${APIDomain}/api/testimonies`);
  if (!res.ok) throw new Error("Failed to fetch all testimonies");
  return res.json();
};

export const updateTestimony = async (id, updatedData) => {
  const res = await fetch(`${APIDomain}/api/testimonies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update testimony");
  return res.json();
};

export const deleteTestimony = async (id) => {
  const res = await fetch(`${APIDomain}/api/testimonies/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete testimony");
  return res.json();
};