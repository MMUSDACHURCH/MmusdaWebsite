import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Calendar, Users, Heart, Plus, ChevronRight, Info } from "lucide-react";
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
    <div className="dedications-outer-wrapper">
      <div className="dedications-hero">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hero-text-content"
        >
          <div className="badge"><Baby size={16} /> FAMILY MINISTRY</div>
          <h1>Child <span className="accent">Dedications</span></h1>
          <p>A sacred commitment to raise our children in the way of the Lord.</p>
        </motion.div>
        <button className="main-create-btn" onClick={() => setShowCreate(true)}>
          <Plus size={20} /> Register Child
        </button>
      </div>

      <div className="dedications-grid-container">
        <aside className="dedication-sidebar">
          <div className="info-card">
            <h3><Info size={20} /> Why Dedicate?</h3>
            <div className="info-item">
              <Heart className="icon-orange" size={18} />
              <p><strong>Public Covenant:</strong> A beautiful way for parents to commit to teaching their child God's Word.</p>
            </div>
            <div className="info-item">
              <Users className="icon-orange" size={18} />
              <p><strong>Community Support:</strong> The church family vows to support and pray for the child's growth.</p>
            </div>
            <div className="info-item">
              <Calendar className="icon-orange" size={18} />
              <p><strong>Future Foundation:</strong> It sets a spiritual milestone for the child to look back on with joy.</p>
            </div>
          </div>
        </aside>

        <main className="dedications-main-list">
          <div className="list-header">
            <h3>Upcoming Dedications</h3>
            <span className="count-pill">{dedicationsToShow.length} Records</span>
          </div>

          <AnimatePresence mode="popLayout">
            {dedicationsToShow.map((d, index) => (
              <motion.div
                key={d.dedicationId || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="modern-dedication-card"
              >
                <div className="card-top">
                  <div className="baby-avatar"><Baby size={24} /></div>
                  <div className="name-box">
                    <h4>{d.childName}</h4>
                    <p>{d.fatherName} & {d.motherName}</p>
                  </div>
                  <div className="date-tag">
                    <Calendar size={14} />
                    {d.availableDate}
                  </div>
                </div>

                {d.notes && (
                  <div className="card-notes">
                    <p>{expanded[d.dedicationId] ? d.notes : `${d.notes.slice(0, 80)}...`}</p>
                    <button onClick={() => toggleRead(d.dedicationId)} className="text-btn">
                      {expanded[d.dedicationId] ? "Show Less" : "Read More"}
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {!showAll && firstTwo.length > 0 && (
            <button className="load-more-action" onClick={handleShowAll}>
              View All Schedules <ChevronRight size={18} />
            </button>
          )}
        </main>
      </div>

      <AnimatePresence>
        {showCreate && <CreateDedication closeModal={() => setShowCreate(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Dedications;