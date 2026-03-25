import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { announcementAPI } from "../../Features/announcements/announcementsAPI";
import { Megaphone, Calendar, Hash, Loader2, AlertCircle, Quote } from "lucide-react";
import "./Announcements.css";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementAPI.getAll();
      setAnnouncements(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterById = async () => {
    if (!idFilter) return fetchAllAnnouncements();
    try {
      setLoading(true);
      const data = await announcementAPI.getById(idFilter);
      setAnnouncements(data ? [data] : []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterByDate = async () => {
    if (!dateFilter) return fetchAllAnnouncements();
    try {
      setLoading(true);
      const data = await announcementAPI.getFromDate(dateFilter);
      setAnnouncements(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="choirs-loading-container">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <Megaphone size={50} className="pulse-icon" />
        </motion.div>
        <p>Proclaiming...</p>
      </div>
    );
  }

  return (
    <div className="choirs-outer-wrapper">
      <div className="choirs-page-card">
        <header className="choirs-slim-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Megaphone size={16} />
              <span>MMUSDA UPDATES</span>
            </div>
            <h1 className="slim-title">
              CHURCH <span className="highlight">ANNOUNCEMENTS</span>
            </h1>
          </motion.div>
        </header>

        <div className="choirs-content-area">
          <div className="announcement-filters-row">
            <div className="filter-pill-group">
              <Hash size={16} />
              <input 
                type="number" 
                placeholder="ID" 
                value={idFilter} 
                onChange={(e) => setIdFilter(e.target.value)} 
              />
              <button onClick={handleFilterById}>Apply</button>
            </div>

            <div className="filter-pill-group">
              <Calendar size={16} />
              <input 
                type="date" 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)} 
              />
              <button onClick={handleFilterByDate}>Filter</button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-stripe">
                <AlertCircle size={20} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="announcements-stack">
              {announcements.length > 0 ? (
                announcements.map((item, index) => (
                  <motion.div
                    key={item.announcementId || index}
                    className={`choir-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="choir-visual">
                      <div className="announcement-date-box">
                        <span className="date-day">{new Date(item.createdAt).getDate()}</span>
                        <span className="date-month">
                          {new Date(item.createdAt).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div className="img-overlay-glow"></div>
                    </div>

                    <div className="choir-details">
                      <div className="details-inner">
                        <div className="details-top">
                          <span className="index-tag">REF #{item.announcementId}</span>
                          <h2 className="choir-display-name">{item.title}</h2>
                        </div>

                        <p className="choir-excerpt">{item.content}</p>

                        <div className="details-actions">
                          <div className="meta-pill">
                            <Calendar size={14} />
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="verse-snippet">
                            <Quote size={12} />
                            <span>"He who has ears, let him hear." - Matthew 13:9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="no-data">No announcements found.</div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Announcements;