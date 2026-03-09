import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllEvents } from "../../Features/events/eventsAPI.js";
import "./Event.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="loader"
        />
        <p className="loading-text">Gathering MMUSDA Events...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="hero-overlay">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="hero-title"
          >
            MMUSDA CHURCH EVENTS
          </motion.h1>
          
          <motion.div 
            className="search-container"
            initial={{ width: "0%", opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for an event title..."
                className="interactive-search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="hero-subtitle"
          >
            “Where two or three gather in My name, I am there among them.”
          </motion.p>
        </div>
      </section>

      <main className="events-main-content">
        <motion.div 
          className="content-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="verse-card-interactive">
            <p className="interactive-text">“Let us consider one another to stir up love and good works, not forsaking the assembling of ourselves together.”</p>
            <span className="reference">— Hebrews 10:24–25</span>
          </div>
        </motion.div>

        <motion.div
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.eventId}
                className="event-card"
                variants={cardVariants}
                layout
                whileHover={{ 
                  y: -15,
                  boxShadow: "0 20px 40px rgba(255, 127, 17, 0.2)"
                }}
              >
                <div className="event-image-container">
                  <img
                    src={event.photo || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800"}
                    alt={event.title}
                  />
                  <div className="status-badge">Live Event</div>
                </div>

                <div className="event-details">
                  <span className="event-label">Church Fellowship</span>
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-desc">
                    {event.description?.substring(0, 110) || "Join us for this special gathering as we grow together in faith and community."}...
                  </p>
                  <div className="event-footer-meta">
                    <div className="event-date-pill">
                      <span className="date-num">{new Date(event.eventDate).getDate()}</span>
                      <span className="date-month">{new Date(event.eventDate).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <span className="interaction-hint">Hover to Zoom</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="empty-search">
            <div className="empty-icon">📂</div>
            <p>No matches found for "{searchText}"</p>
          </motion.div>
        )}
      </main>

      <footer className="footer-interactive">
        <div className="footer-glow"></div>
        <p className="footer-quote">“Serve the Lord with gladness; come before His presence with singing.”</p>
        <p className="footer-ref">— Psalm 100:2</p>
      </footer>
    </div>
  );
};

export default Events;