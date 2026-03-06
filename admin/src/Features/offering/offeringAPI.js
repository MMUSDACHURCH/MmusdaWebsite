import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

// GET ALL OFFERINGS
export const getAllOfferings = async () => {
  try {
    const res = await axios.get(`${APIDomain}/api/offerings`);
    return res.data;
  } catch (error) {
    console.error("Error fetching offerings:", error);
    return [];
  }
};

// DELETE OFFERING
export const deleteOffering = async (id) => {
  try {
    const res = await axios.delete(`${APIDomain}/api/offerings/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting offering:", error);
  }
};