import { APIDomain } from "../../utils/APIDomain";

const BASE_URL = `${APIDomain}/api/elders`;

export const getAllElders = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch elders");
  return await res.json();
};

export const createElder = async (elderData) => {
  const formData = new FormData();

  Object.keys(elderData).forEach((key) => {
    if (key !== "image") formData.append(key, elderData[key]);
  });

  if (elderData.image) formData.append("image", elderData.image);

  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create elder");
  return await res.json();
};

export const updateElder = async (id, elderData) => {
  const formData = new FormData();

  Object.keys(elderData).forEach((key) => {
    if (key !== "image") formData.append(key, elderData[key]);
  });

  if (elderData.image) formData.append("image", elderData.image);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update elder");
  return await res.json();
};

export const deleteElder = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete elder");
  return await res.json();
};