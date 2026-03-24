// import { useEffect, useState } from "react";
// import { fetchLatestVideos } from "../../Features/youtube/youtubeAPI";
// import "./YouTubeLive.css";

// const YouTubeLive = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [showPlayer, setShowPlayer] = useState(true);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     const getVideos = async () => {
//       const data = await fetchLatestVideos();
//       const sorted = data.sort((a, b) => (a.type === "live" ? -1 : 1));
//       setVideos(sorted);
//       if (sorted.length > 0) setCurrentVideo(sorted[0]);
//     };
//     getVideos();
//   }, []);

//   if (!showPlayer || !currentVideo) return null;

//   return (
//     <div className={`video-wrapper ${expanded ? "expanded" : ""}`}>
//       <div className="video-header">
//         <span className="live-indicator">
//           {currentVideo.type === "live" ? "LIVE" : "VIDEO"}
//         </span>
//         <h3>{currentVideo.title}</h3>

//         <div className="video-actions">
//           <button onClick={() => setExpanded(!expanded)}>⛶</button>
//           <button onClick={() => setShowPlayer(false)}>✕</button>
//         </div>
//       </div>

//       <div className="video-container">
//         <iframe
//           src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&mute=1`}
//           title={currentVideo.title}
//           frameBorder="0"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         />
//       </div>

//       {videos.length > 1 && (
//         <div className="video-list">
//           {videos.slice(1).map((vid) => (
//             <div
//               key={vid.videoId}
//               className="video-item"
//               onClick={() => setCurrentVideo(vid)}
//             >
//               {vid.title}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubeLive;