import React, { useEffect, useState } from "react";
import { fetchFamilies } from "../../Features/families/familiesAPI.js";
import { Users, User, Quote, Phone, Home, Music4 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Families.css";

const Families = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  const familyVerses = [
    "Joshua 24:15 - But as for me and my house, we will serve the Lord.",
    "Psalm 133:1 - How good and pleasant it is when God’s people live together in unity!",
    "Acts 16:31 - Believe in the Lord Jesus, and you will be saved—you and your household.",
    "Colossians 3:14 - And over all these virtues put on love, which binds them all together in perfect unity."
  ];

  useEffect(() => {
    const getFamilies = async () => {
      try {
        const data = await fetchFamilies();
        setFamilies(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getFamilies();
  }, []);

  if (loading) {
    return (
      <div className="families-loading-container">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Home size={50} className="pulse-icon" />
        </motion.div>
        <p>Gathering Families...</p>
      </div>
    );
  }

  return (
    <div className="families-outer-wrapper">
      <div className="families-page-card">
        <header className="families-slim-hero">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="slim-hero-content"
          >
            <div className="mini-badge">
              <Users size={16} />
              <span>MMUSDA FELLOWSHIP</span>
            </div>
            <h1 className="slim-title">OUR <span className="highlight">FAMILIES</span></h1>
          </motion.div>
        </header>

        <div className="families-content-area">
          <AnimatePresence>
            {families.length > 0 ? (
              families.map((family, index) => (
                <motion.div 
                  key={family.familyId} 
                  className={`family-stripe ${index % 2 !== 0 ? "reverse" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="family-visual">
                    <motion.img 
                      whileHover={{ scale: 1.03 }}
                      src={family.photoUrl || "https://via.placeholder.com/1200x600?text=MMUSDA+Family"} 
                      alt={family.familyName} 
                      className="family-img-wide"
                    />
                    <div className="img-overlay-glow"></div>
                  </div>

                  <div className="family-details">
                    <div className="details-inner">
                      <div className="details-top">
                        <span className="index-tag">FAMILY 0{index + 1}</span>
                        <h2 className="family-display-name">{family.familyName}</h2>
                      </div>

                      <div className="meta-row">
                        <div className="meta-pill">
                          <User size={14} />
                          <span><strong>Head:</strong> {family.headOfFamily}</span>
                        </div>
                        {(family.contactInfo || family.leaderContact) && (
                          <div className="meta-pill">
                            <Phone size={14} />
                            <span>{family.contactInfo || family.leaderContact}</span>
                          </div>
                        )}
                      </div>

                      <p className="family-excerpt">
                        {family.description || "A unit of the MMUSDA community dedicated to spiritual growth, mutual support, and shared Christian values."}
                      </p>

                      <div className="details-actions">
                        <div className="verse-snippet">
                          <Quote size={12} />
                          <span>{familyVerses[index % familyVerses.length]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-data">No families found.</div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Families;