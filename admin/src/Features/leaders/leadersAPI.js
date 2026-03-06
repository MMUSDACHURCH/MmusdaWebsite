import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({
  baseURL: `${APIDomain}/api/leaders`
});

export const createLeader = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const getAllLeaders = async () => {
  const res = await API.get("/");
  return res.data;
};

export const getLeadersByRole = async (role) => {
  const res = await API.get(`/role?role=${role}`);
  return res.data;
};

export const updateLeader = async (id, data) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};

export const deleteLeader = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};