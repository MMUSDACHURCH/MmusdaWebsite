import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateDedication from "./CreateDedication";
import "./Dedications.css";
import { getFirstTwoDedications, getAllDedications } from "../../Features/dedications/dedicationsAPI";

const Dedications = () => {
  const [firstTwo, setFirstTwo] = useState([]);
  const [allDedications, setAllDedications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFirstTwoDedications().then(data => {
      setFirstTwo(data);
      setLoading(false);
    });
  }, []);

  const handleShowAll = () => {
    setLoading(true);
    getAllDedications().then(data => {
      setAllDedications(data);
      setShowAll(true);
      setLoading(false);
    });
  };

  const dedicationsToShow = showAll ? allDedications : firstTwo;

  return (
    <div className="dedications-container">
      <div className="header">
        <h2>Dedications</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create</button>
      </div>

      <div className="dedications-list">
        {loading && <p className="loading-text">Loading...</p>}
        {dedicationsToShow?.map(d => (
          <motion.div
            key={d.dedicationId}
            className="dedication-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="dedication-name">{d.childName}</h3>
            <p className="dedication-info">{`Father: ${d.fatherName}, Mother: ${d.motherName}`}</p>
            <p className="dedication-date">{`Available: ${d.availableDate}`}</p>
          </motion.div>
        ))}
      </div>

      {!showAll && (
        <button className="show-more-btn" onClick={handleShowAll}>Show More</button>
      )}

      <AnimatePresence>
        {showCreate && <CreateDedication closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Dedications;