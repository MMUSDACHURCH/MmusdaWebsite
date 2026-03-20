import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllEvents } from "../../Features/events/eventsAPI.js";
import { FaSearch, FaCalendarAlt, FaQuoteLeft, FaInfoCircle } from "react-icons/fa";
import "./Event.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="main-loader"
        />
        <p>Loading MMUSDA Experience...</p>
      </div>
    );
  }

  return (
    <div className="events-master-container">
      <section className="dynamic-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-text-content"
        >
          <h1 className="glitch-title">MMUSDA EVENTS</h1>
          <p className="hero-tagline">Experience Faith Through Fellowship</p>
        </motion.div>

        <div className="search-portal">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="search-glass-card"
          >
            <FaSearch className="inner-search-icon" />
            <input
              type="text"
              placeholder="Search for an event..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      <main className="events-content-wrapper">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="verse-interactive-box"
        >
          <FaQuoteLeft className="quote-accent" />
          <p>“Let us consider one another to stir up love and good works...”</p>
          <span className="bible-reference">Hebrews 10:24–25</span>
        </motion.div>

        <motion.div 
          className="events-modern-grid"
          layout
        >
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.eventId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="modern-event-card"
              >
                <div className="card-top">
                  <img src={event.photo || "https://images.unsplash.com/photo-1510154221590-ff63e90a136f"} alt={event.title} />
                  <div className="card-status-pill">Live Update</div>
                </div>

                <div className="card-info">
                  <div className="category-label">Church Fellowship</div>
                  <h3 className="event-title-text">{event.title}</h3>
                  <p className="event-description-text">
                    {event.description?.substring(0, 95) || "Experience a special gathering as we grow together in faith and community."}...
                  </p>
                  
                  <div className="card-meta-row">
                    <div className="date-display-box">
                      <span className="date-d">{new Date(event.eventDate).getDate()}</span>
                      <span className="date-m">{new Date(event.eventDate).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="details-circle-btn"
                    >
                      <FaInfoCircle />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="null-state">
            <span>Empty Folder</span>
            <p>No matches for "{searchText}"</p>
          </motion.div>
        )}
      </main>

      <footer className="glossy-footer">
        <div className="footer-line"></div>
        <p>“Serve the Lord with gladness; come before His presence with singing.”</p>
        <strong>— Psalm 100:2</strong>
      </footer>
    </div>
  );
};

export default Events;