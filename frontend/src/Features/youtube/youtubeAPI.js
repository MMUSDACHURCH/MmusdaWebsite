import { APIDomain } from "../../utils/APIDomain";

export const fetchLatestVideos = async () => {
  try {
    const response = await fetch(`${APIDomain}/youtube/latest-videos`);
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    console.log("Fetched videos:", data); //  Verify in console
    return data; // Array of videos
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
};
