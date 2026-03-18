import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

// GET ALL OFFERING DETAILS
export const getAllOfferingDetails = async () => {
  try {
    const res = await axios.get(`${APIDomain}/api/offeringsdetails`);
    return res.data;
  } catch (error) {
    console.error("Error fetching offering details:", error);
    return [];
  }
};

// UPDATE OFFERING DETAILS
export const updateOfferingDetails = async (id, data) => {
  try {
    const res = await axios.put(`${APIDomain}/api/offeringsdetails/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating offering details:", error);
    return null;
  }
};