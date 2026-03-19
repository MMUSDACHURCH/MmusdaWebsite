import { useEffect, useState } from "react";
import { fetchAllHomeChurches } from "../../Features/homechurches/homechurchesAPI";
import { Users, User, Phone, Home, Quote, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./HomeChurch.css";

export default function HomeChurches() {

  const [homeChurches, setHomeChurches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  const verses = [
    "Matthew 18:20 - For where two or three gather in my name, there am I with them.",
    "Acts 2:46 - They broke bread in their homes and ate together with glad hearts.",
    "Hebrews 10:24 - Let us consider how we may spur one another on toward love and good deeds.",
    "Romans 12:10 - Be devoted to one another in love."
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllHomeChurches();
        setHomeChurches(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
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
      <div className="homechurch-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Home size={50} className="pulse-icon" />
        </motion.div>
        <p>Loading Home Churches...</p>
      </div>
    );
  }

  return (
    <div className="homechurch-outer-wrapper">
      <div className="homechurch-page-card">

        <header className="homechurch-hero">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Users size={16} />
              <span>MMUSDA FELLOWSHIP</span>
            </div>
            <h1 className="hero-title">
              HOME <span className="highlight">CHURCHES</span>
            </h1>
          </motion.div>
        </header>

        <div className="homechurch-content-area">

          <AnimatePresence>

            {homeChurches.length > 0 ? (

              homeChurches.map((church, index) => {

                const churchId = church.homechurchId || index;
                const isExpanded = expandedIds.includes(churchId);

                const displayText = isExpanded
                  ? church.description
                  : church.description
                  ? church.description.slice(0, 120) + (church.description.length > 120 ? "..." : "")
                  : "A home church dedicated to prayer, fellowship, Bible study and spiritual growth.";

                return (

                  <motion.div
                    key={churchId}
                    className="homechurch-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >

                    <span className="index-tag">
                      HOME CHURCH {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="church-name">
                      {church.name}
                    </h2>

                    <div className="meta-row">

                      <div className="meta-pill">
                        <User size={14} />
                        <span><strong>Leader:</strong> {church.leaderName || "Not specified"}</span>
                      </div>

                      <div className="meta-pill">
                        <Phone size={14} />
                        <span>{church.leaderContact || "No contact provided"}</span>
                      </div>

                      <div className="meta-pill">
                        <MapPin size={14} />
                        <span>{church.location || "Location not specified"}</span>
                      </div>

                    </div>

                    <p className="church-description">
                      {displayText}
                    </p>

                    {church.description && church.description.length > 120 && (
                      <button
                        className="read-more-btn"
                        onClick={() => toggleReadMore(churchId)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    <div className="verse-box">
                      <Quote size={14} />
                      <span>
                        {verses[index % verses.length]}
                      </span>
                    </div>

                  </motion.div>

                );

              })

            ) : (

              <div className="no-data">
                No home churches available
              </div>

            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}