import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaPlus, FaUserCircle } from "react-icons/fa";
import CreateTestimony from "./CreateTestmony";
import { getFirstTwoTestimonies, getAllTestimonies } from "../../Features/testmonies/testmoniesAPI";
import "./Testimonies.css";

const Testimonies = () => {
  const [firstTwo, setFirstTwo] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFirstTwoTestimonies();
        setFirstTwo(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleShowAll = async () => {
    setLoading(true);
    try {
      const data = await getAllTestimonies();
      setAllTestimonies(data || []);
      setShowAll(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const testimoniesToShow = showAll ? allTestimonies : firstTwo;

  if (loading && testimoniesToShow.length === 0) {
    return (
      <div className="loading-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="main-loader" />
        <p>Loading Testimonies...</p>
      </div>
    );
  }

  return (
    <div className="events-master-container">
      <section className="dynamic-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hero-text-content">
          <h1 className="glitch-title">TESTIMONIES</h1>
          <p className="hero-tagline">His Faithfulness, Our Stories</p>
        </motion.div>

        <div className="search-portal">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="search-glass-card create-trigger-btn"
            onClick={() => setShowCreate(true)}
          >
            <FaPlus className="inner-search-icon" />
            <span>Share Your Testimony</span>
          </motion.button>
        </div>
      </section>

      <main className="events-content-wrapper">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="verse-interactive-box">
          <FaQuoteLeft className="quote-accent" />
          <p>“And they overcame him by the blood of the Lamb and by the word of their testimony.”</p>
          <span className="bible-reference">Revelation 12:11</span>
        </motion.div>

        <motion.div className="events-modern-grid" layout>
          <AnimatePresence>
            {testimoniesToShow.map((t, index) => (
              <motion.div
                key={t.testimonyId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -12 }}
                className="modern-event-card testimony-card"
              >
                <div className="card-info">
                  <div className="category-label"><FaUserCircle /> Faithful Servant</div>
                  <h3 className="event-title-text">{t.name}</h3>
                  <p className="event-description-text">
                    {expanded[t.testimonyId] ? t.description : `${t.description?.substring(0, 120)}...`}
                  </p>
                  
                  <div className="card-meta-row">
                    <button onClick={() => toggleRead(t.testimonyId)} className="read-more-toggle">
                      {expanded[t.testimonyId] ? "Show Less" : "Read Full Story"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && firstTwo.length > 0 && (
          <div className="load-more-container">
            <button className="show-more-btn" onClick={handleShowAll}>View All Testimonies</button>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showCreate && <CreateTestimony closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Testimonies;