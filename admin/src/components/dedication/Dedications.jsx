import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateDedication from "./CreateDedication";
import UpdateDedication from "./UpdateDedication";
import "./Dedications.css";
import { getAllDedications, deleteDedication } from "../../Features/dedication/dedicationAPI";

const Dedications = () => {
  const [dedications, setDedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const fetchDedications = async () => {
    setLoading(true);
    const data = await getAllDedications();
    setDedications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDedications();
  }, []);

  const handleDelete = async (id) => {
    await deleteDedication(id);
    fetchDedications();
  };

  return (
    <div className="dedications-container">
      <div className="header">
        <h2>Dedications</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="dedications-list">
        {dedications.map(d => (
          <motion.div key={d.dedicationId} className="dedication-card" whileHover={{ scale: 1.03 }}>
            <h3 className="dedication-name">{d.childName}</h3>
            <p className="dedication-info">Father: {d.fatherName}, Mother: {d.motherName}</p>
            <p className="dedication-date">Available: {d.availableDate}</p>
            <div className="card-buttons">
              <button className="update-btn" onClick={() => setUpdateItem(d)}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(d.dedicationId)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && <CreateDedication closeModal={() => setShowCreate(false)} onCreate={fetchDedications} />}
        {updateItem && <UpdateDedication dedication={updateItem} closeModal={() => setUpdateItem(null)} onUpdate={fetchDedications} />}
      </AnimatePresence>
    </div>
  );
};

export default Dedications;