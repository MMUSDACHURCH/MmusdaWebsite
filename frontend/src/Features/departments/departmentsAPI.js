import { APIDomain } from "../../utils/APIDomain";

// GET all departments
export const fetchDepartments = async () => {
  try {
    const response = await fetch(`${APIDomain}/api/department`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }

    const data = await response.json();
    return data.departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};