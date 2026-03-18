import { APIDomain } from "../../utils/APIDomain";

export const getPublicPrayerRequests = async () => {
  try {
    const res = await fetch(`${APIDomain}/api/prayer-requests`);
    if (!res.ok) throw new Error("Failed to fetch prayer requests");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLatestPrayerRequests = async () => {
  try {
    const res = await fetch(`${APIDomain}/api/prayer-requests/latest`);
    if (!res.ok) throw new Error("Failed to fetch latest prayer requests");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createPrayerRequest = async (requestData) => {
  try {
    const res = await fetch(`${APIDomain}/api/prayer-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    if (!res.ok) throw new Error("Failed to create prayer request");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};