import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, User, Phone, Mail, Calendar, ClipboardCheck } from "lucide-react";
import { fetchBaptisms, createBaptism } from "../../Features/baptisms/baptismsAPI";
import "./Baptisms.css";

const Baptisms = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchBaptisms();
    setRecords(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createBaptism(formData);
      setFormData({ fullName: "", email: "", phoneNumber: "", dob: "" });
      await loadData();
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="bap-loader">Loading records...</div>;

  return (
    <div className="bap-outer-container">
      <div className="bap-main-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bap-form-card"
        >
          <div className="bap-header">
            <Droplets className="bap-icon-main" />
            <h2>Baptism Registration</h2>
          </div>
          <form onSubmit={handleSubmit} className="bap-form">
            <div className="bap-input-box">
              <User size={18} />
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="bap-input-box">
              <Mail size={18} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="bap-input-box">
              <Phone size={18} />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="bap-input-box">
              <Calendar size={18} />
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <button type="submit" disabled={isSubmitting} className="bap-submit-btn">
              {isSubmitting ? "Saving..." : "Register for Baptism"}
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bap-list-card"
        >
          <div className="bap-header">
            <ClipboardCheck className="bap-icon-list" />
            <h2>Candidates List</h2>
          </div>
          <div className="bap-scroll-area">
            <AnimatePresence mode="popLayout">
              {records.length > 0 ? (
                records.map((record) => (
                  <motion.div 
                    key={record.baptismId} 
                    layout 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bap-item-card"
                  >
                    <div className="bap-item-info">
                      <h4>{record.fullName}</h4>
                      <div className="bap-item-meta">
                        <span><Phone size={12} /> {record.phoneNumber}</span>
                        {record.dob && <span><Calendar size={12} /> Born: {new Date(record.dob).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div className="bap-status-tag">Registered</div>
                  </motion.div>
                ))
              ) : (
                <div className="bap-empty">No candidates registered yet.</div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Baptisms;