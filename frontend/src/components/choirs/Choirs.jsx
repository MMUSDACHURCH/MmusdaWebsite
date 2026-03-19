import React, { useEffect, useState } from "react";
import { fetchChoirs } from "../../Features/choirs/choirsAPI.js";
import { Users, User, Quote, Mic2, Music4, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Choirs.css";

const Choirs = () => {
  const [choirs, setChoirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  const musicVerses = [
    "Psalm 95:1 - Oh come, let us sing to the Lord!",
    "Colossians 3:16 - Sing with thankfulness in your hearts.",
    "Psalm 147:1 - It is good to sing praises to our God.",
    "Psalm 104:33 - I will sing to the Lord as long as I live."
  ];

  useEffect(() => {
    const getChoirs = async () => {
      try {
        const data = await fetchChoirs();
        setChoirs(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getChoirs();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="choirs-loading-container">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Music4 size={50} className="pulse-icon" />
        </motion.div>
        <p>Harmonizing...</p>
      </div>
    );
  }

  return (
    <div className="choirs-outer-wrapper">
      <div className="choirs-page-card">

        <header className="choirs-slim-hero">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mini-badge">
              <Mic2 size={16} />
              <span>MMUSDA MUSIC</span>
            </div>
            <h1 className="slim-title">
              OUR <span className="highlight">CHOIRS</span>
            </h1>
          </motion.div>
        </header>

        <div className="choirs-content-area">
          <AnimatePresence>

            {choirs.length > 0 ? (

              choirs.map((choir, index) => {

                const choirId = choir.choirId || index;
                const isExpanded = expandedIds.includes(choirId);

                const displayText = isExpanded
                  ? choir.description
                  : choir.description
                  ? choir.description.slice(0, 120) + (choir.description.length > 120 ? "..." : "")
                  : "Leading the congregation in spiritual worship through the gift of song.";

                return (

                  <motion.div 
                    key={choirId} 
                    className={`choir-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >

                    <div className="choir-visual">
                      <motion.img 
                        whileHover={{ scale: 1.03 }}
                        src={choir.choirPhoto || "https://via.placeholder.com/1200x600?text=MMUSDA+Choir"} 
                        alt={choir.name} 
                        className="choir-img-wide"
                      />
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="choir-details">
                      <div className="details-inner">

                        <div className="details-top">
                          <span className="index-tag">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h2 className="choir-display-name">{choir.name}</h2>
                        </div>

                        <div className="meta-row">
                          <div className="meta-pill">
                            <User size={14} />
                            <span>{choir.leaderName}</span>
                          </div>

                          <div className="meta-pill">
                            <Users size={14} />
                            <span>{choir.membersCount} Voices</span>
                          </div>
                        </div>

                        <p className="choir-excerpt">
                          {displayText}
                        </p>

                        {choir.description && choir.description.length > 120 && (
                          <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(choirId)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}

                        <div className="details-actions">

                          {choir.videoUrl && (
                            <motion.a 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              href={choir.videoUrl} 
                              target="_blank" 
                              className="yt-btn-modern"
                            >
                              <Youtube size={18} />
                              <span>YouTube</span>
                            </motion.a>
                          )}

                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>{musicVerses[index % musicVerses.length]}</span>
                          </div>

                        </div>

                      </div>
                    </div>

                  </motion.div>

                );

              })

            ) : (
              <div className="no-data">No choirs found.</div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Choirs;