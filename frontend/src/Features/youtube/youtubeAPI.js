import { APIDomain } from "../../utils/APIDomain";

export const fetchLatestVideos = async () => {
  try {
    const response = await fetch(`${APIDomain}/youtube/latest-videos`);
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};