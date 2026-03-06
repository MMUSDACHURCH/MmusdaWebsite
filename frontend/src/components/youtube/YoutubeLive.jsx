import { useEffect, useState } from "react";
import { fetchLatestVideos } from "../../Features/youtube/youtubeAPI";
import "./YouTubeLive.css";

const YouTubeLive = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchLatestVideos();
      setVideos(data);
      if (data.length > 0) setCurrentVideo(data[0]);
    };
    getVideos();
  }, []);

  if (!showPlayer || !currentVideo) return null;

  return (
    <div className="video-wrapper">
      <div className="video-header">
        <h2>{currentVideo.title}</h2>
        <button className="close-button" onClick={() => setShowPlayer(false)}>X</button>
      </div>

      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&mute=1`}
          title={currentVideo.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <button className="overlay-close" onClick={() => setShowPlayer(false)}>Close Live</button>
      </div>

      {videos.length > 1 && (
        <div className="video-list">
          {videos.slice(1).map((vid) => (
            <div key={vid.videoId} className="video-item" onClick={() => setCurrentVideo(vid)}>
              {vid.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeLive;