import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, ScrollText, Users, Lock, Globe, Sparkles, Activity } from "lucide-react";
import {
  getPublicPrayerRequests,
  getLatestPrayerRequests,
  createPrayerRequest,
} from "../../Features/prayerRequest/prayerRequestAPI";
import "./PrayerRequest.css";

const PrayerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [stats, setStats] = useState({ public: 0, private: 0 });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    title: "",
    description: "",
    isPublic: "yes",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchLatest = async () => {
    try {
      const data = await getLatestPrayerRequests();
      setRequests(data);
      setStats(prev => ({ ...prev, public: data.length }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAll = async () => {
    try {
      const data = await getPublicPrayerRequests();
      setRequests(data);
      setShowAll(true);
      setStats(prev => ({ ...prev, public: data.length }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLatest();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createPrayerRequest(formData);
      setMessage("Your prayer request has been lifted up!");
      if (formData.isPublic === "no") {
        setStats(prev => ({ ...prev, private: prev.private + 1 }));
      }
      setFormData({
        firstName: "", lastName: "", phoneNumber: "",
        title: "", description: "", isPublic: "yes",
      });
      fetchLatest();
      setShowAll(false);
    } catch (error) {
      setMessage(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prayer-page-wrapper">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prayer-container"
      >
        <header className="prayer-hero">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="hero-badge"
          >
            <Heart size={16} fill="currentColor" />
            <span>Divine Connection</span>
          </motion.div>

          <h1 className="interactive-title">
            MMUSDA PRAYER <span className="altar-text">ALTAR</span>
          </h1>

          <div className="stats-container">
            <div className="stat-pill public">
              <Globe size={14} /> <span>{stats.public} Public</span>
            </div>
            <div className="stat-pill private">
              <Lock size={14} /> <span>{stats.private} Private</span>
            </div>
          </div>

          <p className="hero-sub">
            "For where two or three gather in my name, there am I with them."
          </p>
        </header>

        <div className="prayer-main-grid">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="form-card-glass"
          >
            <div className="card-header">
              <ScrollText size={20} className="icon-blue" />
              <h2>Submit Petition</h2>
            </div>

            <form className="prayer-form-refined" onSubmit={handleSubmit}>
              <div className="input-row">
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </div>
              <input name="phoneNumber" placeholder="Phone (Optional)" value={formData.phoneNumber} onChange={handleChange} />
              <input name="title" placeholder="Request Title" value={formData.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Describe your burden..." value={formData.description} onChange={handleChange} required />

              <div className="privacy-toggle">
                <div 
                  className={`toggle-option ${formData.isPublic === 'yes' ? 'active' : ''}`} 
                  onClick={() => setFormData({...formData, isPublic: 'yes'})}
                >
                  <Globe size={14} /> Public
                </div>
                <div 
                  className={`toggle-option ${formData.isPublic === 'no' ? 'active' : ''}`} 
                  onClick={() => setFormData({...formData, isPublic: 'no'})}
                >
                  <Lock size={14} /> Private
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading} 
                className="submit-btn-animated"
              >
                {loading ? <div className="spinner"></div> : <><span>Lift to Prayer</span> <Send size={18} /></>}
              </motion.button>
            </form>

            <AnimatePresence>
              {message && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="status-msg">
                  <Activity size={14} /> {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="requests-card-glass"
          >
            <div className="card-header">
              <Users size={20} className="icon-blue" />
              <h2>Community Wall</h2>
            </div>

            <div className="prayer-feed">
              {requests.length === 0 ? (
                <div className="empty-feed">
                  <Sparkles size={30} />
                  <p>Be the first to share.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {requests.map((req, index) => (
                    <motion.div 
                      key={req.requestId || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="feed-item"
                    >
                      <div className="feed-avatar">{req.firstName?.charAt(0)}</div>
                      <div className="feed-content">
                        <div className="feed-meta">
                          <h3 className="hover-title">{req.title}</h3>
                          <span className="author-name">{req.firstName} {req.lastName}</span>
                        </div>
                        <p className="feed-desc">{req.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {!showAll && requests.length >= 5 && (
              <button className="view-more-btn" onClick={fetchAll}>
                Explore All Petitions
              </button>
            )}
          </motion.div>
        </div>

        <footer className="verse-footer">
          <p>"The prayer of a righteous person is powerful and effective." — James 5:16</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default PrayerRequest;