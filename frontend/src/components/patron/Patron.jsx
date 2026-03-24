import React, { useEffect, useState } from "react";
import { getAllPatrons } from "../../Features/patrons/patronsAPI";
import { Users, Phone, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Patron.css";

const Patron = () => {
  const [patrons, setPatrons] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const fetchPatronsData = async () => {
    const data = await getAllPatrons();
    setPatrons(data || []);
  };

  useEffect(() => {
    fetchPatronsData();
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
              OUR <span className="highlight">PATRONS</span>
            </h1>
          </motion.div>
        </header>

        <div className="elders-content-area">
          <AnimatePresence>
            {patrons.length > 0 ? (
              patrons.map((patron, index) => {
                const patronId = patron.patronId || index;
                const isExpanded = expandedIds.includes(patronId);
                const message = patron.message || "Dedicated to supporting and mentoring our youth and church community.";
                
                const displayText = isExpanded
                  ? message
                  : message.slice(0, 120) + (message.length > 120 ? "..." : "");

                return (
                  <motion.div
                    key={patronId}
                    className={`elder-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="elder-visual">
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        src={patron.image || "https://via.placeholder.com/400x400?text=Patron"}
                        alt={patron.name}
                        className="elder-img"
                      />
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="elder-details">
                      <div className="details-inner">
                        <div className="details-top">
                          <span className="index-tag">PATRON {String(index + 1).padStart(2, "0")}</span>
                          <h2 className="elder-display-name">{patron.name}</h2>
                        </div>

                        <div className="meta-row">
                          <div className="meta-pill">
                            <Users size={14} />
                            <span><strong>Title:</strong> {patron.title || "Patron"}</span>
                          </div>

                          {patron.contactNumber && (
                            <div className="meta-pill">
                              <Phone size={14} />
                              <span>{patron.contactNumber}</span>
                            </div>
                          )}
                        </div>

                        <p className="elder-excerpt">{displayText}</p>

                        {message.length > 120 && (
                          <button
                            className="read-more-btn"
                            onClick={() => toggleReadMore(patronId)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}

                        <div className="details-actions">
                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>"Be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity." - 1 Timothy 4:12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="no-data">No patrons found.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Patron;