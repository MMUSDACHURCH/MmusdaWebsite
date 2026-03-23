import React, { useEffect, useState } from "react";
import { getAllElders } from "../../Features/elder/elderAPI";
import { Users, Phone, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Elder.css";

const Elder = () => {
  const [elders, setElders] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const elderVerses = [
    "Proverbs 16:31 - Gray hair is a crown of splendor; it is attained in the way of righteousness.",
    "Leviticus 19:32 - Stand up in the presence of the aged, show respect for the elderly.",
    "1 Timothy 5:17 - The elders who direct the affairs of the church well are worthy of double honor.",
    "Psalm 92:12-14 - The righteous will flourish like a palm tree."
  ];

  const fetchEldersData = async () => {
    const data = await getAllElders();
    setElders(data || []);
  };

  useEffect(() => {
    fetchEldersData();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="elders-outer-wrapper">
      <div className="elders-page-card">
        <header className="elders-slim-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Users size={16} />
              <span>MMUSDA FELLOWSHIP</span>
            </div>
            <h1 className="slim-title">
              OUR <span className="highlight">ELDERS</span>
            </h1>
          </motion.div>
        </header>

        <div className="elders-content-area">
          <AnimatePresence>
            {elders.length > 0 ? (
              elders.map((elder, index) => {
                const elderId = elder.elderId || index;
                const isExpanded = expandedIds.includes(elderId);

                const displayText = isExpanded
                  ? elder.message
                  : elder.message
                  ? elder.message.slice(0, 120) + (elder.message.length > 120 ? "..." : "")
                  : "A devoted member of MMUSDA guiding our fellowship spiritually.";

                return (
                  <motion.div
                    key={elderId}
                    className={`elder-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="elder-visual">
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        src={elder.image || "https://via.placeholder.com/400x400?text=Elder"}
                        alt={elder.name}
                        className="elder-img"
                      />
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="elder-details">
                      <div className="details-inner">
                        <div className="details-top">
                          <span className="index-tag">ELDER {String(index + 1).padStart(2, "0")}</span>
                          <h2 className="elder-display-name">{elder.name}</h2>
                        </div>

                        <div className="meta-row">
                          {elder.role && (
                            <div className="meta-pill">
                              <Users size={14} />
                              <span><strong>Role:</strong> {elder.role}</span>
                            </div>
                          )}

                          {elder.contactNumber && (
                            <div className="meta-pill">
                              <Phone size={14} />
                              <span>{elder.contactNumber}</span>
                            </div>
                          )}
                        </div>

                        <p className="elder-excerpt">{displayText}</p>

                        {elder.message && elder.message.length > 120 && (
                          <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(elderId)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}

                        <div className="details-actions">
                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>{elderVerses[index % elderVerses.length]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-data">No elders found.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Elder;