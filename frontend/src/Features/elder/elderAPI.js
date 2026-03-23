import axios from "axios";
import { APIDomain } from "../../utils/APIDomain.jsx";

export const getAllElders = async () => {
  const response = await axios.get(`${APIDomain}/api/elders`);
  return response.data;
};