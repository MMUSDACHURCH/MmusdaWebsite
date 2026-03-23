import { APIDomain } from "../../utils/APIDomain";

const API_BASE_URL = `${APIDomain}/api/offeringsdetails`;

export const getAllOfferingDetails = async () => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch offerings: ${response.status}`);
  }

  return await response.json();
};

export const createOfferingDetail = async (data) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create offering: ${response.status}`);
  }

  return await response.json();
};

export const updateOfferingDetail = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("Offering not found.");
    throw new Error(`Failed to update offering: ${response.status}`);
  }

  return await response.json();
};

export const deleteOfferingDetail = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("Offering not found.");
    throw new Error(`Failed to delete offering: ${response.status}`);
  }

  return await response.json();
};