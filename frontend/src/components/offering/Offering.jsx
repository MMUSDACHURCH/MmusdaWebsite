import React, { useState } from "react";
import { createOffering } from "../../Features/offering/offeringAPI";
import OfferingDetails from "../../components/offeringdetails/OfferingDetails";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Quote, Heart, CheckCircle, Loader2 } from "lucide-react";
import "./Offering.css";

const Offering = () => {
  const [formData, setFormData] = useState({ phoneNumber: "", name: "", amount: "", purpose: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOffering(formData);
      setStatus({ type: "success", message: "Offering recorded successfully!" });
      setFormData({ phoneNumber: "", name: "", amount: "", purpose: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="choirs-outer-wrapper">
      <div className="choirs-page-card offering-max">
        <header className="choirs-slim-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Heart size={16} />
              <span>GIVING BACK</span>
            </div>
            <h1 className="slim-title">
              CHURCH <span className="highlight">OFFERING</span>
            </h1>
          </motion.div>
        </header>

        <div className="choirs-content-area">
          <div className="choir-stripe">
            <div className="choir-visual bg-navy-giving">
              <div className="offering-instructions">
                <div className="instruction-step">
                  <span className="step-tag">01</span>
                  <p>Send your offering via the details below</p>
                </div>
                <div className="details-embed">
                  <OfferingDetails />
                </div>
                <div className="instruction-step">
                  <span className="step-tag">02</span>
                  <p>Complete the form to help us track your gift</p>
                </div>
              </div>
              <div className="img-overlay-glow"></div>
            </div>

            <div className="choir-details">
              <div className="details-inner">
                <form onSubmit={handleSubmit} className="offering-modern-form">
                  <div className="form-grid">
                    <div className="input-field">
                      <label>Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                    </div>
                    <div className="input-field">
                      <label>Phone Number</label>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="0712..." required />
                    </div>
                    <div className="input-field">
                      <label>Amount (Ksh)</label>
                      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="1000" required />
                    </div>
                    <div className="input-field">
                      <label>Purpose</label>
                      <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Tithe / Project" required />
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="yt-btn-modern offering-submit"
                  >
                    {loading ? <Loader2 className="spinner" size={18} /> : <Send size={18} />}
                    <span>{loading ? "Processing..." : "Confirm Offering"}</span>
                  </motion.button>
                </form>

                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`status-alert ${status.type}`}
                    >
                      <CheckCircle size={16} />
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="details-actions">
                  <div className="verse-snippet full-verse">
                    <Quote size={14} />
                    <span>"Give, and it will be given to you. A good measure, pressed down, shaken together and running over." — Luke 6:38</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offering;