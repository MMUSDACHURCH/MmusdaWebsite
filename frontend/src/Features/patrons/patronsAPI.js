import axios from "axios";
import { APIDomain } from "../../utils/APIDomain.jsx";

export const getAllPatrons = async () => {
  const response = await axios.get(`${APIDomain}/api/patrons`);
  return response.data;
};