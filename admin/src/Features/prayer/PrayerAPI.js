import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const BASE = `${APIDomain}/api/prayer-requests`;

export const getAllPrayerRequests = async () => {
  const res = await axios.get(BASE);
  return res.data;
};

export const deletePrayerRequest = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data;
};