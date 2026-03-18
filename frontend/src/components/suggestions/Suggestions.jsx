import React, { useState } from "react";
import { createSuggestion } from "../../Features/suggestions/suggestionsAPI";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Phone, MessageSquare, Info } from "lucide-react";
import "./Suggestions.css";

const Suggestions = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    message: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSuggestion(formData);
      setIsError(false);
      setMessage("Your suggestion has been received. Thank you!");
      setFormData({ name: "", contactNumber: "", message: "" });
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <div className="suggestions-page">
      <motion.div 
        className="suggestions-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="suggestions-header">
          <h2 className="suggestions-title">Submit a Suggestion</h2>
          <div className="title-underline"></div>
        </div>

        <div className="info-banner">
          <Info size={18} />
          <p>Name and Contact are optional. You can remain anonymous.</p>
        </div>

        <form className="suggestions-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label><User size={16} /> Full Name (Optional)</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="input-group">
            <label><Phone size={16} /> Contact Number (Optional)</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 0712345678"
            />
          </div>

          <div className="input-group">
            <label><MessageSquare size={16} /> Your Suggestion</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we improve our services?"
              required
            />
          </div>

          <motion.button 
            type="submit" 
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Suggestion <Send size={18} />
          </motion.button>

          <AnimatePresence>
            {message && (
              <motion.div 
                className={`feedback-msg ${isError ? 'error' : 'success'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default Suggestions;