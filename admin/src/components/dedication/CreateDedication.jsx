import React, { useState } from "react";
import { motion } from "framer-motion";
import "./CreateDedication.css";

const CreateDedication = ({ closeModal, onCreate }) => {
  const [childName, setChildName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/dedications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childName, fatherName, motherName, availableDate, contactNumber, email, status: "pending" }),
    });
    onCreate && onCreate();
    closeModal();
  };

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <h2>Create Dedication</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Child Name" value={childName} onChange={e => setChildName(e.target.value)} required />
          <input type="text" placeholder="Father Name" value={fatherName} onChange={e => setFatherName(e.target.value)} required />
          <input type="text" placeholder="Mother Name" value={motherName} onChange={e => setMotherName(e.target.value)} required />
          <input type="date" placeholder="Available Date" value={availableDate} onChange={e => setAvailableDate(e.target.value)} required />
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateDedication;