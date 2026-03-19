import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateTestmony from "./CreateTestmony";
import UpdateTestmony from "./UpdateTestmony";
import "./Testmony.css";
import { getAllTestimonies, deleteTestimony } from "../../Features/testmony/testmonyAPI";

const Testmony = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);

  const fetchTestimonies = async () => {
    setLoading(true);
    const data = await getAllTestimonies();
    setTestimonies(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const handleDelete = async (id) => {
    await deleteTestimony(id);
    fetchTestimonies();
  };

  return (
    <div className="testmony-container">
      <div className="header">
        <h2>Testimonies</h2>
        <button className="create-btn" onClick={() => setShowCreate(true)}>Create</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="testimonies-list">
        {testimonies.map(t => (
          <motion.div
            key={t.testimonyId}
            className="testimony-card"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="testimony-name">{t.name}</h3>
            <p className="testimony-desc">{t.description}</p>
            <div className="card-buttons">
              <button className="update-btn" onClick={() => setUpdateItem(t)}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(t.testimonyId)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showCreate && <CreateTestmony closeModal={() => setShowCreate(false)} onCreate={fetchTestimonies} />}
        {updateItem && <UpdateTestmony testimony={updateItem} closeModal={() => setUpdateItem(null)} onUpdate={fetchTestimonies} />}
      </AnimatePresence>
    </div>
  );
};

export default Testmony;