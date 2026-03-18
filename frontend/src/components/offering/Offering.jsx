import React, { useState } from "react";
import { createOffering } from "../../Features/offering/offeringAPI";
import OfferingDetails from "../../components/offeringdetails/OfferingDetails";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Quote } from "lucide-react";
import "./Offering.css";

const Offering = () => {
  const [formData, setFormData] = useState({ phoneNumber: "", name: "", amount: "", purpose: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOffering(formData);
      setMessage("Offering recorded successfully!");
      setFormData({ phoneNumber: "", name: "", amount: "", purpose: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="offering-page-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="offering-card"
      >
        <header className="offering-header">
          <h1 className="main-title">CHURCH <span className="highlight">OFFERING</span></h1>
          <div className="quote-box">
            <Quote size={16} className="quote-icon" />
            <p>"Give, and it will be given to you. A good measure, pressed down." — Luke 6:38</p>
          </div>
        </header>

        <div className="offering-grid">
          <section className="info-side">
            <div className="instruction-block">
              <span className="step-num">01</span>
              <p>Send Offering to the number below.</p>
            </div>
            
            <OfferingDetails />

            <div className="instruction-block bottom">
              <span className="step-num">02</span>
              <p>Fill the form to help us track your offering</p>
            </div>
          </section>

          <section className="form-side">
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="input-group">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount (Ksh)" required />
                <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="Purpose (e.g. Tithe)" required />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="submit-button"
              >
                Confirm Offering <Send size={18} />
              </motion.button>

              <AnimatePresence>
                {message && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="form-message">
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Offering;