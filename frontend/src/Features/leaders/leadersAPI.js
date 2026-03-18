import { APIDomain } from "../../utils/APIDomain";

export const fetchAllLeaders = async () => {
  try {
    const res = await fetch(`${APIDomain}/api/leaders`);
    const data = await res.json();
    return data.leaders || [];
  } catch (error) {
    console.error("Error fetching leaders:", error);
    return [];
  }
};

export const fetchLeadersByRole = async (role) => {
  try {
    const res = await fetch(`${APIDomain}/api/leaders/role?role=${encodeURIComponent(role)}`);
    const data = await res.json();
    return data.leaders || [];
  } catch (error) {
    console.error("Error searching leaders by role:", error);
    return [];
  }
};