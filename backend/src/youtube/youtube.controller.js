import fetch from "node-fetch";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const YT_BASE = "https://www.googleapis.com/youtube/v3";

export const getLatestVideo = async (req, res) => {
  try {
    const videos = [];

    /** 1️ Check for live stream */
    const liveResponse = await fetch(
      `${YT_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    );
    const liveData = await liveResponse.json();

    if (liveData.items && liveData.items.length > 0) {
      liveData.items.forEach(item => {
        videos.push({
          type: "live",
          videoId: item.id.videoId,
          title: item.snippet.title
        });
      });
    }

    /** 2️ If no live → get latest uploaded video */
    if (videos.length === 0) {
      const latestResponse = await fetch(
        `${YT_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&order=date&type=video&key=${API_KEY}`
      );
      const latestData = await latestResponse.json();

      if (latestData.items && latestData.items.length > 0) {
        latestData.items.forEach(item => {
          videos.push({
            type: "recorded",
            videoId: item.id.videoId,
            title: item.snippet.title
          });
        });
      }
    }

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    return res.json(videos);

  } catch (error) {
    console.error("YouTube API error:", error);
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
};
