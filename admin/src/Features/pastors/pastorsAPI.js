import { APIDomain } from "../../utils/APIDomain";

const BASE_URL = `${APIDomain}/api/pastors`;

export const getAllPastors = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch pastors");
  return await res.json();
};

export const createPastor = async (pastorData) => {
  const formData = new FormData();

  Object.keys(pastorData).forEach((key) => {
    if (key !== "image") formData.append(key, pastorData[key]);
  });

  if (pastorData.image) formData.append("image", pastorData.image);

  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create pastor");
  return await res.json();
};

export const updatePastor = async (id, pastorData) => {
  const formData = new FormData();

  Object.keys(pastorData).forEach((key) => {
    if (key !== "image") formData.append(key, pastorData[key]);
  });

  if (pastorData.image) formData.append("image", pastorData.image);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update pastor");
  return await res.json();
};

export const deletePastor = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete pastor");
  return await res.json();
};