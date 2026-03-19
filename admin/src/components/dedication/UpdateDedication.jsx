import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UpdateDedication.css";
import { updateDedication } from "../../Features/dedication/dedicationAPI";

const UpdateDedication = ({ dedication, closeModal, onUpdate }) => {
  const [childName, setChildName] = useState(dedication.childName);
  const [fatherName, setFatherName] = useState(dedication.fatherName);
  const [motherName, setMotherName] = useState(dedication.motherName);
  const [availableDate, setAvailableDate] = useState(dedication.availableDate);
  const [contactNumber, setContactNumber] = useState(dedication.contactNumber || "");
  const [email, setEmail] = useState(dedication.email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDedication(dedication.dedicationId, { childName, fatherName, motherName, availableDate, contactNumber, email });
    onUpdate && onUpdate();
    closeModal();
  };

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <h2>Update Dedication</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Child Name" value={childName} onChange={e => setChildName(e.target.value)} required />
          <input type="text" placeholder="Father Name" value={fatherName} onChange={e => setFatherName(e.target.value)} required />
          <input type="text" placeholder="Mother Name" value={motherName} onChange={e => setMotherName(e.target.value)} required />
          <input type="date" placeholder="Available Date" value={availableDate} onChange={e => setAvailableDate(e.target.value)} required />
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Update</button>
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateDedication;