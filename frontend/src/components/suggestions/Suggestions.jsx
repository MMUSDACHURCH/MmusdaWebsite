import React, { useState } from "react";
import { createSuggestion } from "../../Features/suggestions/suggestionsAPI";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Phone, MessageSquare, Info, Sparkles, Loader2 } from "lucide-react";
import "./Suggestions.css";

const Suggestions = () => {
  const [formData, setFormData] = useState({ name: "", contactNumber: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSuggestion(formData);
      setStatus({ type: "success", message: "Your suggestion has been received. Thank you!" });
      setFormData({ name: "", contactNumber: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="choirs-outer-wrapper">
      <div className="choirs-page-card suggestion-max">
        <header className="choirs-slim-hero">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mini-badge">
              <Sparkles size={16} />
              <span>VOICE OF THE CONGREGATION</span>
            </div>
            <h1 className="slim-title">
              SUBMIT A <span className="highlight">SUGGESTION</span>
            </h1>
          </motion.div>
        </header>

        <div className="choirs-content-area">
          <div className="choir-stripe">
            <div className="choir-visual bg-navy-suggestion">
              <div className="suggestion-info-content">
                <div className="info-pill-modern">
                  <Info size={20} />
                  <p>Optional Anonymity</p>
                </div>
                <p className="suggestion-text-lead">
                  Your feedback helps us grow. Feel free to share your thoughts—identifying yourself is entirely optional.
                </p>
                <div className="img-overlay-glow"></div>
              </div>
            </div>

            <div className="choir-details">
              <div className="details-inner">
                <form className="offering-modern-form" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="input-field">
                      <label><User size={14} /> Full Name (Optional)</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Anonymous" />
                    </div>
                    <div className="input-field">
                      <label><Phone size={14} /> Contact (Optional)</label>
                      <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="e.g. 0712..." />
                    </div>
                  </div>

                  <div className="input-field full-width">
                    <label><MessageSquare size={14} /> Your Feedback</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="How can we improve our services?" 
                      required 
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="yt-btn-modern offering-submit"
                  >
                    {loading ? <Loader2 className="spinner" size={18} /> : <Send size={18} />}
                    <span>{loading ? "Sending..." : "Send Suggestion"}</span>
                  </motion.button>
                </form>

                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className={`status-alert ${status.type}`}
                    >
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;