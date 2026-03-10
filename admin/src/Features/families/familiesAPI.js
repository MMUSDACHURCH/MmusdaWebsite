import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({ baseURL: `${APIDomain}/api/families` });

export const getAllFamilies = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createFamily = async (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  const res = await API.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateFamily = async (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  const res = await API.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteFamily = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};