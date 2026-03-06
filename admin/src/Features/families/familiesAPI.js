import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({ baseURL: `${APIDomain}/api/families` });

export const getAllFamilies = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createFamily = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const updateFamily = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteFamily = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};