import { APIDomain } from "../../utils/APIDomain";

const BASE_URL = `${APIDomain}/api/department`;

export const getAllDepartments = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createDepartment = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateDepartment = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteDepartment = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};