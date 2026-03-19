import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTestimony from "./CreateTestmony";
import "./Testimonies.css";
import { getFirstTwoTestimonies, getAllTestimonies } from "../../Features/testmonies/testmoniesAPI";

const Testimonies = () => {
  const [firstTwo, setFirstTwo] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFirstTwoTestimonies().then(data => {
      setFirstTwo(data);
      setLoading(false);
    });
  }, []);

  const handleShowAll = () => {
    setLoading(true);
    getAllTestimonies().then(data => {
      setAllTestimonies(data);
      setShowAll(true);
      setLoading(false);
    });
  };

  const testimoniesToShow = showAll ? allTestimonies : firstTwo;

  return (
    <div className="testimonies-container">
      <div className="header">
        <h2>Testimonies</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create</button>
      </div>

      <div className="testimonies-list">
        {loading && <p className="loading-text">Loading...</p>}
        {testimoniesToShow?.map(t => (
          <motion.div
            key={t.testimonyId}
            className="testimony-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="testimony-name">{t.name}</h3>
            <p className="testimony-desc">{t.description}</p>
          </motion.div>
        ))}
      </div>

      {!showAll && (
        <button className="show-more-btn" onClick={handleShowAll}>Show More</button>
      )}

      <AnimatePresence>
        {showCreate && <CreateTestimony closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Testimonies;