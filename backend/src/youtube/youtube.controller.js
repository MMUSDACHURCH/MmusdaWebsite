import fetch from "node-fetch";
import { db } from "../Drizzle/db.js";
import { subscribers } from "../Drizzle/schema.js";
import { sendNotificationEmail } from "../mailer.js";

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
      for (const item of searchData.items) {
        if (item.snippet.liveBroadcastContent === "live") {
          videos.push({ type: "live", videoId: item.id.videoId, title: item.snippet.title });

          const allSubscribers = await db.select().from(subscribers);
          for (const sub of allSubscribers) {
            await sendNotificationEmail(
              sub.email,
              `A live session has started: ${item.snippet.title}. Watch here: https://www.youtube.com/watch?v=${item.id.videoId}`
            );
          }
        }
      }
    }

    if (videos.length === 0 && searchData.items) {
      searchData.items.slice(0, 5).forEach(item => {
        videos.push({ type: "recorded", videoId: item.id.videoId, title: item.snippet.title });
      });
    }

    if (videos.length === 0) return res.status(404).json({ message: "No videos found" });

    return res.json(videos);
  } catch {
    return res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
};