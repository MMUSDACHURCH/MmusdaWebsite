import React, { useEffect, useState } from "react";
import { getAllPastors } from "../../Features/pastors/pastorsAPI";
import { Users, Phone, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Pastor.css";

const Pastor = () => {
  const [pastors, setPastors] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const fetchPastorsData = async () => {
    const data = await getAllPastors();
    setPastors(data || []);
  };

  useEffect(() => {
    fetchPastorsData();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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
              OUR <span className="highlight">PASTORS</span>
            </h1>
          </motion.div>
        </header>

        <div className="elders-content-area">
          <AnimatePresence>
            {pastors.length > 0 ? (
              pastors.map((pastor, index) => {
                const pastorId = pastor.pastorId || index;
                const isExpanded = expandedIds.includes(pastorId);
                const message = pastor.message || "Guiding our fellowship with spiritual wisdom and grace.";
                
                const displayText = isExpanded
                  ? message
                  : message.slice(0, 120) + (message.length > 120 ? "..." : "");

                return (
                  <motion.div
                    key={pastorId}
                    className={`elder-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="elder-visual">
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        src={pastor.image || "https://via.placeholder.com/400x400?text=Pastor"}
                        alt={pastor.name}
                        className="elder-img"
                      />
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="elder-details">
                      <div className="details-inner">
                        <div className="details-top">
                          <span className="index-tag">SHEPHERD {String(index + 1).padStart(2, "0")}</span>
                          <h2 className="elder-display-name">{pastor.name}</h2>
                        </div>

                        <div className="meta-row">
                          <div className="meta-pill">
                            <Users size={14} />
                            <span><strong>Title:</strong> {pastor.title || "Pastor"}</span>
                          </div>

                          {pastor.contactNumber && (
                            <div className="meta-pill">
                              <Phone size={14} />
                              <span>{pastor.contactNumber}</span>
                            </div>
                          )}
                        </div>

                        <p className="elder-excerpt">{displayText}</p>

                        {message.length > 120 && (
                          <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(pastorId)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}

                        <div className="details-actions">
                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>"Feed the flock of God which is among you, taking the oversight thereof." - 1 Peter 5:2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-data">No pastors found.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Pastor;