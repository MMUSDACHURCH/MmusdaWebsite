import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const BAPTISM_URL = `${APIDomain}/api/baptisms`;

export const BaptismsAPI = {
  getAll: async () => {
    const res = await axios.get(BAPTISM_URL);
    return res.data;
  },
  create: async (data) => {
    const res = await axios.post(BAPTISM_URL, data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await axios.put(`${BAPTISM_URL}/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`${BAPTISM_URL}/${id}`);
  },
};