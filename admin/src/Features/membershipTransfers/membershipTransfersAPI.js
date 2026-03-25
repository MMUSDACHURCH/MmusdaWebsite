import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const TRANSFER_URL = `${APIDomain}/api/membership-transfers`;

export const MembershipTransfersAPI = {
  getAll: async () => {
    const res = await axios.get(TRANSFER_URL);
    return res.data;
  },
  create: async (data) => {
    const res = await axios.post(TRANSFER_URL, data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await axios.put(`${TRANSFER_URL}/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`${TRANSFER_URL}/${id}`);
  },
};