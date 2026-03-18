import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const BASE = `${APIDomain}/api/choirs`;

export const getAllChoirs = async () => {
  const res = await axios.get(BASE);
  return res.data;
};

export const createChoir = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "choirPhoto") {
      if (data[key] instanceof File) {
        formData.append("choirPhoto", data[key]);
      } else if (data[key]) {
        formData.append("choirPhoto", data[key]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  const res = await axios.post(BASE, formData, { 
    headers: { "Content-Type": "multipart/form-data" } 
  });
  return res.data;
};

export const updateChoir = async (id, data) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "choirPhoto") {
      if (data[key] instanceof File) {
        formData.append("choirPhoto", data[key]);
      } else if (data[key]) {
        formData.append("choirPhoto", data[key]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  const res = await axios.put(`${BASE}/${id}`, formData, { 
    headers: { "Content-Type": "multipart/form-data" } 
  });
  return res.data;
};

export const deleteChoir = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data;
};