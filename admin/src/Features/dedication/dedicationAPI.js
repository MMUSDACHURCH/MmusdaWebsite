import { APIDomain } from "../../utils/APIDomain";

export const getAllDedications = async () => {
  const res = await fetch(`${APIDomain}/api/dedications`);
  if (!res.ok) throw new Error("Failed to fetch all dedications");
  return res.json();
};

export const updateDedication = async (id, updatedData) => {
  const res = await fetch(`${APIDomain}/api/dedications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update dedication");
  return res.json();
};

export const deleteDedication = async (id) => {
  const res = await fetch(`${APIDomain}/api/dedications/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete dedication");
  return res.json();
};