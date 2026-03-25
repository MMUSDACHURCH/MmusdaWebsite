import { useState } from "react";
import { createMember } from "../../Features/members/membersAPI";
import { User, MapPin, Mail, Phone, Loader2, CheckCircle2, AlertCircle, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import "./Members.css";

const Members = () => {
  const [formData, setFormData] = useState({ name: "", area: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const newMember = await createMember({
        name: formData.name,
        areaOfResidence: formData.area,
        email: formData.email,
        phone: formData.phone,
      });
      setMessage({ type: "success", text: `Welcome ${newMember.name}! Registration successful.` });
      setFormData({ name: "", area: "", email: "", phone: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="members-page-wrapper">
      <motion.div 
        className="members-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="members-header">
          <div className="mini-badge"><UserPlus size={14} /> <span>Join Us</span></div>
          <h1 className="members-title">Member <span className="highlight">Portal</span></h1>
          <p className="members-subtitle">Complete the form to join the MMUSDA community</p>
        </div>

        <form onSubmit={handleSubmit} className="members-form">
          <div className="input-row">
            <div className="field-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="icon" />
                <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="field-group">
              <label>Residence</label>
              <div className="input-wrapper">
                <MapPin size={18} className="icon" />
                <input name="area" type="text" placeholder="Nairobi" value={formData.area} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="field-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="icon" />
                <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="field-group">
              <label>Phone</label>
              <div className="input-wrapper">
                <Phone size={18} className="icon" />
                <input name="phone" type="tel" placeholder="+254..." value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <Loader2 className="spinner" size={20} /> : "Register Member"}
          </button>
        </form>

        {message.text && (
          <div className={`message-banner ${message.type}`}>
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Members;