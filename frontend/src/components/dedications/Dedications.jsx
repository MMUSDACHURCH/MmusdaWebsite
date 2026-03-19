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
  const [expanded, setExpanded] = useState({});
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

  const toggleRead = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const dedicationsToShow = showAll ? allDedications : firstTwo;

  return (
    <div className="dedications-container">
      <div className="header">
        <div>
          <h2>Child Dedications</h2>
          <p className="page-info">This page is for managing and viewing child dedication schedules.</p>
        </div>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create Dedication</button>
      </div>

      <div className="dedications-list">
        {loading && <p className="loading-text">Loading...</p>}

        {dedicationsToShow?.map(d => {
          const isExpanded = expanded[d.dedicationId];
          const shortNotes = d.notes ? d.notes.slice(0, 100) + "..." : "";

          return (
            <motion.div
              key={d.dedicationId}
              className="dedication-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="dedication-name">{d.childName}</h3>
              <p className="dedication-info">{`Father: ${d.fatherName}, Mother: ${d.motherName}`}</p>
              <p className="dedication-date">{`Available: ${d.availableDate}`}</p>
              {d.notes && (
                <>
                  <p className="dedication-notes">{isExpanded ? d.notes : shortNotes}</p>
                  <button className="read-btn" onClick={() => toggleRead(d.dedicationId)}>
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {!showAll && firstTwo.length > 0 && (
        <button className="show-more-btn" onClick={handleShowAll}>Show More</button>
      )}

      <AnimatePresence>
        {showCreate && <CreateDedication closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Dedications;