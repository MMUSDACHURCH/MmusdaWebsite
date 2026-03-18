import { APIDomain } from "../../utils/APIDomain";

export const fetchAllHomeChurches = async () => {
  try {
    const res = await fetch(`${APIDomain}/api/homechurches`);
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching home churches:", error);
    return [];
  }
};