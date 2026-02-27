import { APIDomain } from "../../utils/APIDomain";

const API_BASE_URL = `${APIDomain}/api/offeringsdetails`;

export const getAllOfferingDetails = async () => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};