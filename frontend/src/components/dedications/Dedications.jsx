import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Calendar, Users, Heart, Plus, ChevronRight, Info, Quote } from "lucide-react";
import CreateDedication from "./CreateDedication";
import { getFirstTwoDedications, getAllDedications } from "../../Features/dedications/dedicationsAPI";
import "./Dedications.css";

const Dedications = () => {
  const [firstTwo, setFirstTwo] = useState([]);
  const [allDedications, setAllDedications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFirstTwoDedications().then(data => {
      setFirstTwo(data || []);
      setLoading(false);
    });
  }, []);

  const handleShowAll = () => {
    setLoading(true);
    getAllDedications().then(data => {
      setAllDedications(data || []);
      setShowAll(true);
      setLoading(false);
    });
  };

  const toggleRead = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const dedicationsToShow = showAll ? allDedications : firstTwo;

  if (loading && !dedicationsToShow.length) {
    return (
      <div className="choirs-loading-container">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <Baby size={50} className="pulse-icon" />
        </motion.div>
        <p>Loading Dedication Records...</p>
      </div>
    );
  }

  return (
    <div className="choirs-outer-wrapper">
      <div className="choirs-page-card">
        <header className="choirs-slim-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Baby size={16} />
              <span>FAMILY MINISTRY</span>
            </div>
            <h1 className="slim-title">
              CHILD <span className="highlight">DEDICATIONS</span>
            </h1>
            <p className="hero-subtitle">A sacred commitment to raise our children in the way of the Lord.</p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="yt-btn-modern dedication-register-btn" 
              onClick={() => setShowCreate(true)}
            >
              <Plus size={18} /> Register Child
            </motion.button>
          </motion.div>
        </header>

        <div className="choirs-content-area dedication-layout">
          <aside className="dedication-sidebar">
            <div className="info-sticky-card">
              <h3><Info size={20} /> Why Dedicate?</h3>
              <div className="benefit-item">
                <Heart className="accent-icon" size={18} />
                <p><strong>Public Covenant:</strong> A beautiful way for parents to commit to teaching God's Word.</p>
              </div>
              <div className="benefit-item">
                <Users className="accent-icon" size={18} />
                <p><strong>Community Support:</strong> The church family vows to support the child's spiritual growth.</p>
              </div>
              <div className="benefit-item">
                <Calendar className="accent-icon" size={18} />
                <p><strong>Spiritual Foundation:</strong> Sets a milestone for the child to look back on with joy.</p>
              </div>
            </div>
          </aside>

          <main className="dedication-list-flow">
            <div className="section-header">
              <h2>Upcoming Schedules</h2>
              <span className="count-tag">{dedicationsToShow.length} Records</span>
            </div>

            <AnimatePresence mode="popLayout">
              {dedicationsToShow.map((d, index) => {
                const isExpanded = expanded[d.dedicationId];
                const noteText = d.notes || "No additional notes provided for this dedication service.";

                return (
                  <motion.div
                    key={d.dedicationId || index}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="choir-stripe dedication-card-item"
                  >
                    <div className="choir-visual bg-baby-blue">
                      <Baby size={60} className="visual-icon" />
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="choir-details">
                      <div className="details-inner">
                        <div className="details-top">
                          <div className="date-pill">
                            <Calendar size={14} />
                            <span>{d.availableDate}</span>
                          </div>
                          <h3 className="choir-display-name">{d.childName}</h3>
                          <p className="parent-names">Parents: {d.fatherName} & {d.motherName}</p>
                        </div>

                        <p className="choir-excerpt">
                          {isExpanded ? noteText : `${noteText.slice(0, 100)}...`}
                        </p>

                        <button className="read-more-btn" onClick={() => toggleRead(d.dedicationId)}>
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>

                        <div className="details-actions">
                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>"Train up a child in the way he should go." — Prov 22:6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {!showAll && firstTwo.length > 0 && (
              <button className="load-more-full" onClick={handleShowAll}>
                <span>View All Dedications</span>
                <ChevronRight size={20} />
              </button>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateDedication closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Dedications;