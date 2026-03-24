import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const PATRONS_URL = `${APIDomain}/api/patrons`;

export const PatronsAPI = {
  getAllPatrons: async () => {
    const res = await axios.get(PATRONS_URL);
    return res.data;
  },
  createPatron: async (data) => {
    const formData = new FormData();
    for (let key in data) formData.append(key, data[key]);
    const res = await axios.post(PATRONS_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  },
  updatePatron: async (id, data) => {
    const formData = new FormData();
    for (let key in data) formData.append(key, data[key]);
    const res = await axios.put(`${PATRONS_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  },
  deletePatron: async (id) => {
    await axios.delete(`${PATRONS_URL}/${id}`);
  },
};