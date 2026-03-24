import fetch from "node-fetch";

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const YT_BASE = "https://www.googleapis.com/youtube/v3";

export const getLatestVideo = async (req, res) => {
  try {
    const videos = [];

    const searchResponse = await fetch(
      `${YT_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&type=video&key=${API_KEY}`
    );
    const searchData = await searchResponse.json();

    if (searchData.items) {
      searchData.items.forEach(item => {
        if (item.snippet.liveBroadcastContent === "live") {
          videos.push({
            type: "live",
            videoId: item.id.videoId,
            title: item.snippet.title
          });
        }
      });
    }

    if (videos.length === 0 && searchData.items) {
      searchData.items.slice(0, 5).forEach(item => {
        videos.push({
          type: "recorded",
          videoId: item.id.videoId,
          title: item.snippet.title
        });
      });
    }

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    return res.json(videos);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
};