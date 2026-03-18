import { APIDomain } from "../../utils/APIDomain";

export const fetchFamilies = async () => {
  try {
    const response = await fetch(`${APIDomain}/api/families`);
    if (!response.ok) throw new Error("Failed to fetch families");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching families:", error);
    return [];
  }
};