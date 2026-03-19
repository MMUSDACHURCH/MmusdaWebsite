import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UpdateTestmony.css";
import { updateTestimony } from "../../Features/testmony/testmonyAPI";

const UpdateTestmony = ({ testimony, closeModal, onUpdate }) => {
  const [name, setName] = useState(testimony.name);
  const [description, setDescription] = useState(testimony.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTestimony(testimony.testimonyId, { name, description });
    onUpdate && onUpdate();
    closeModal();
  };

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <h2>Update Testimony</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Update</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateTestmony;