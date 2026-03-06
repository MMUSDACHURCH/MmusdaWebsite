import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({ baseURL: `${APIDomain}/api/members` });

export const getAllMembers = async () => {
  const res = await API.get("/");
  return res.data;
};

export const createMember = async (data) => {
  const res = await API.post("/", data);
  return res.data;
};

export const deleteMember = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};

export const getMembersByArea = async (area) => {
  const res = await API.get(`/area/${area}`);
  return res.data;
};