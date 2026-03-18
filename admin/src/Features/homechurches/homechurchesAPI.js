import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({
  baseURL: `${APIDomain}/api/homechurches`
});

export const getAllHomeChurches = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createHomeChurch = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const updateHomeChurch = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteHomeChurch = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};