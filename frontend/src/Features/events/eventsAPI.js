import { APIDomain } from "../../utils/APIDomain";

export const fetchAllEvents = async () => {
  try {
    const res = await fetch(`${APIDomain}/api/events`);
    const data = await res.json();
    return data.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchEventsByTitle = async (title) => {
  try {
    const res = await fetch(`${APIDomain}/api/events/search?title=${encodeURIComponent(title)}`);
    const data = await res.json();
    return data.events || [];
  } catch (error) {
    console.error("Error searching events:", error);
    return [];
  }
};