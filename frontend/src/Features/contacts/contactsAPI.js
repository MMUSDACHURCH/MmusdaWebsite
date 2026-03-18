import { APIDomain } from "../../utils/APIDomain";

export const createContact = async (contactData) => {
  const res = await fetch(`${APIDomain}/api/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });

  return await res.json();
};