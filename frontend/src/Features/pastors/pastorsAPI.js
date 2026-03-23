import axios from "axios";
import { APIDomain } from "../../utils/APIDomain.jsx";

export const getAllPastors = async () => {
  const response = await axios.get(`${APIDomain}/api/pastors`);
  return response.data;
};