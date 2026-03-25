import { APIDomain } from "../../utils/APIDomain";

export const fetchTransfers = async () => {
  try {
    const response = await fetch(`${APIDomain}/api/membership-transfers`);
    if (!response.ok) throw new Error("Failed to fetch transfers");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createTransfer = async (transferData) => {
  try {
    const response = await fetch(`${APIDomain}/api/membership-transfers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transferData),
    });
    if (!response.ok) throw new Error("Failed to create transfer");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};