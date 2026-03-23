import axios from "axios"; 
import { APIDomain } from "../../utils/APIDomain";

const ADMINS_URL = `${APIDomain}/api/admins`;

export const AdminsAPI = {
  getAdmins: async () => {
    const res = await axios.get(ADMINS_URL);
    return res.data.admins;
  },
  createAdmin: async (data) => {
    const res = await axios.post(ADMINS_URL, data);
    return res.data.admin;
  },
  updateAdmin: async (id, data) => {
    const res = await axios.put(`${ADMINS_URL}/${id}`, data);
    return res.data.admin;
  },
  deleteAdmin: async (id) => {
    await axios.delete(`${ADMINS_URL}/${id}`);
  },
};