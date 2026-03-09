import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const BASE = `${APIDomain}/api/choirs`;

export const getAllChoirs = async () => {
  const res = await axios.get(BASE);
  return res.data;
};

export const createChoir = async (data) => {
  const res = await axios.post(BASE, data);
  return res.data;
};

export const updateChoir = async (id, data) => {
  const res = await axios.put(`${BASE}/${id}`, data);
  return res.data;
};

export const deleteChoir = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data;
};