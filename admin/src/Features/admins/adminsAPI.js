import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const ADMINS_URL = `${APIDomain}/api/admins`;

export const AdminsAPI = {
  getAdmins: async () => {
    const res = await axios.get(ADMINS_URL);
    return res.data.admins;
  }
};