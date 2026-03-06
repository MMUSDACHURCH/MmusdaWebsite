import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

const API = axios.create({ baseURL: `${APIDomain}/api/contacts` });

export const getAllContacts = async () => {
  const res = await API.get("/");
  return res.data.contacts;
};

export const deleteContact = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};