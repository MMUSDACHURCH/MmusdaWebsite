import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({ baseURL: `${APIDomain}/api/announcements` });

export const getAllAnnouncements = async () => {
  const res = await API.get("/");
  return res.data;
};

export const getAnnouncementsByDate = async (startDate) => {
  const res = await API.get(`/filter/from-date?startDate=${startDate}`);
  return res.data;
};

export const createAnnouncement = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const updateAnnouncement = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteAnnouncement = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};