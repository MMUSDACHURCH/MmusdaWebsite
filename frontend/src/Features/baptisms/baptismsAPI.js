import { APIDomain } from "../../utils/APIDomain";

export const fetchBaptisms = async () => {
  try {
    const response = await fetch(`${APIDomain}/api/baptisms`);
    if (!response.ok) throw new Error("Failed to fetch baptism records");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createBaptism = async (baptismData) => {
  try {
    const response = await fetch(`${APIDomain}/api/baptisms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(baptismData),
    });
    if (!response.ok) throw new Error("Failed to create record");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};