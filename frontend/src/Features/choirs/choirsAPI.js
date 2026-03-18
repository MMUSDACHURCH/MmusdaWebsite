// src/Features/choirs/choirsAPI.js
import { APIDomain } from "../../utils/APIDomain";

export const fetchChoirs = async () => {
  try {
    const response = await fetch(`${APIDomain}/api/choirs`);
    if (!response.ok) {
      throw new Error("Failed to fetch choirs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching choirs:", error);
    return [];
  }
};