import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { getInitialSermons, getAllSermons } from "../../Features/sermons/sermonsAPI";
import "./Sermons.css";

const getEmbedUrl = (url) => {
  if (!url) return "";

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtube.com/embed")) {
    return url;
  }

  return "";
};

const Sermons = () => {
  const [sermons, setSermons] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSermons = async () => {
      setLoading(true);
      const data = showAll ? await getAllSermons() : await getInitialSermons();
      setSermons(data);
      setLoading(false);
    };

    fetchSermons();
  }, [showAll]);

  if (loading) {
    return <p className="loading">Loading sermons...</p>;
  }

  return (
    <section className="sermons-section">
      <div className="sermons-wrapper">

        <div className="sermons-header">
          <div>
            <h2>Latest Sermons</h2>
            <p>
              Listen to powerful messages from our pulpit that inspire faith,
              build hope, and strengthen our walk with Christ.
            </p>
          </div>

          <button
            className="toggle-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All Sermons"}
          </button>
        </div>

        <div className="sermons-grid">

          {sermons.length === 0 && <p>No sermons available.</p>}

          {sermons.map((sermon, index) => (
            <motion.div
              key={sermon.sermonId}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="sermon-card"
            >

              <div className="video-wrapper">
                <iframe
                  src={getEmbedUrl(sermon.videoUrl)}
                  title={sermon.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="sermon-content">

                <h3>{sermon.title}</h3>

                <div className="sermon-meta">
                  <Clock size={16} />
                  <span>
                    {new Date(sermon.sermonDate).toLocaleDateString()}
                  </span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Sermons;