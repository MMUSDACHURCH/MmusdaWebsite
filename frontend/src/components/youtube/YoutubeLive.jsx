import { useEffect, useState } from "react";
import { fetchLatestVideos } from "../../Features/youtube/youtubeAPI";
import "./YouTubeLive.css";

const YouTubeLive = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      const data = await fetchLatestVideos();
      if (!data || data.length === 0) return;

      const sorted = data.sort((a, b) => (a.type === "live" ? -1 : 1));
      setVideos(sorted);

      const firstLive = sorted.find(v => v.type === "live");
      setCurrentVideo(firstLive || sorted[0]);
    };

    getVideos();
  }, []);

  if (!showPlayer || !currentVideo) return null;

  return (
    <div className={`video-wrapper ${expanded ? "expanded" : ""}`}>
      <div className="video-header">
        <span className={`live-indicator ${currentVideo.type}`}>
          {currentVideo.type === "live" ? "LIVE" : "VIDEO"}
        </span>
        <h3>{currentVideo.title}</h3>
        <div className="video-actions">
          <button onClick={() => setExpanded(!expanded)}>⛶</button>
          <button className="close-btn" onClick={() => setShowPlayer(false)}>✕</button>
        </div>
      </div>

      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&mute=1`}
          title={currentVideo.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {videos.length > 1 && expanded && (
        <div className="video-list" style={{ display: 'block', background: '#000', padding: '5px' }}>
          {videos
            .filter(v => v.videoId !== currentVideo.videoId)
            .map((vid) => (
              <div 
                key={vid.videoId} 
                className="video-item" 
                onClick={() => setCurrentVideo(vid)}
                style={{ color: 'white', fontSize: '10px', cursor: 'pointer', padding: '4px', borderBottom: '1px solid #333' }}
              >
                {vid.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeLive;