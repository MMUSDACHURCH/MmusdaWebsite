import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ClipboardList, MapPin, User, Phone, CheckCircle } from "lucide-react";
import { fetchTransfers, createTransfer } from "../../Features/membershipTransfer/membershipTransferAPI";
import "./MembershipTransfer.css";

const MembershipTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    fromChurch: "",
    toChurch: "",
    destinationDistrict: "",
    destinationConference: "",
    destinationLocation: "",
    reason: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await fetchTransfers();
    setTransfers(data);
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
      await createTransfer(formData);
      setFormData({
        fullName: "", email: "", phoneNumber: "", fromChurch: "", toChurch: "",
        destinationDistrict: "", destinationConference: "", destinationLocation: "", reason: "",
      });
      await loadData();
    } catch (err) {
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transfer-container">
      <div className="transfer-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="form-section"
        >
          <div className="form-header">
            <Send className="header-icon" />
            <h2>Transfer Request</h2>
          </div>
          <form onSubmit={handleSubmit} className="transfer-form">
            <div className="input-group">
              <User size={18} />
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="input-row">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="input-row">
              <input type="text" name="fromChurch" placeholder="Current Church" value={formData.fromChurch} onChange={handleInputChange} required />
              <input type="text" name="toChurch" placeholder="Target Church" value={formData.toChurch} onChange={handleInputChange} required />
            </div>
            <div className="input-row">
              <input type="text" name="destinationDistrict" placeholder="District" value={formData.destinationDistrict} onChange={handleInputChange} required />
              <input type="text" name="destinationConference" placeholder="Conference" value={formData.destinationConference} onChange={handleInputChange} required />
            </div>
            <input type="text" name="destinationLocation" placeholder="Location City/Town" value={formData.destinationLocation} onChange={handleInputChange} required />
            <textarea name="reason" placeholder="Reason for transfer..." value={formData.reason} onChange={handleInputChange}></textarea>
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? "Processing..." : "Submit Request"}
            </button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="list-section"
        >
          <div className="form-header">
            <ClipboardList className="header-icon" />
            <h2>Recent Transfers</h2>
          </div>
          <div className="transfer-list">
            <AnimatePresence>
              {transfers.map((item) => (
                <motion.div 
                  key={item.transferId} 
                  layout 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="transfer-card"
                >
                  <div className="card-top">
                    <h4>{item.fullName}</h4>
                    <span className={`status-badge ${item.status}`}>{item.status}</span>
                  </div>
                  <div className="card-details">
                    <p><MapPin size={14} /> {item.fromChurch} → {item.toChurch}</p>
                    <p><Phone size={14} /> {item.phoneNumber}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipTransfer;