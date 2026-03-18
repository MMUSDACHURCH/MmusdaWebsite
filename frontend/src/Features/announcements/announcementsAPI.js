import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const baseURL = `${APIDomain.replace(/\/$/, "")}/api/announcements`;

export const announcementAPI = {

  getAll: async () => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (err) {
      console.error("Error fetching announcements:", err);
      throw err;
    }
  },

  getFromDate: async (startDate) => {
    try {
      const response = await axios.get(`${baseURL}/filter/from-date`, {
        params: { startDate }
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching announcements from date:", err);
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (err) {
      console.error(`Error fetching announcement by ID ${id}:`, err);
      throw err;
    }
  }

};