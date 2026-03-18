import axios from "axios";
import { APIDomain } from "../../utils/APIDomain";

export const getAllSuggestions = async () => {
  const res = await axios.get(`${APIDomain}/api/suggestions`);
  return res.data;
};

export const deleteSuggestion = async (id) => {
  const res = await axios.delete(`${APIDomain}/api/suggestions/${id}`);
  return res.data;
};