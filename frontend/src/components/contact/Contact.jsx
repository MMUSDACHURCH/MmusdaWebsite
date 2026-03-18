import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Contact.css";
import { createContact } from "../../Features/contacts/contactsAPI";
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaWhatsapp,
  FaExpand,
  FaTimes
} from "react-icons/fa";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import MMUST from "../../assets/images/MMUST.png";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await createContact(form);

    if (res?.message) {
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setStatus("Failed to send message");
    }

    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>
              Get in Touch with <span>MMUSDA</span>
            </h2>
            <p className="contact-subtext">
              Whether you have a question, need counseling, or want to connect
              with our church family, we are here for you.
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <Mail size={20} />
                <div>
                  <p className="label">Email</p>
                  <p className="value">Mmusdachurch1844@gmail.com</p>
                </div>
              </div>
              <div className="contact-card">
                <Phone size={20} />
                <div>
                  <p className="label">Phone</p>
                  <p className="value">+254705214338</p>
                </div>
              </div>
              <div className="contact-card">
                <MapPin size={20} />
                <div>
                  <p className="label">Location</p>
                  <p className="value">MMUST Campus, Kakamega</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://m.facebook.com/@MasindeMuliroSDA/?wtsid=rdr_0aLQHB4isZ7jCnp0Q&hr=1" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://x.com/Mmusda_church?s=09" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.tiktok.com/@mmustsda?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer">
                <FaTiktok />
              </a>
              <a href="https://youtube.com/@mmustsdachurch?si=Mzu6ODG4WY-aMk9z" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
              <a href="mailto:Mmusdachurch1844@gmail.com">
                <FaEnvelope />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb2VS6M5vKA9AQyoJD3P" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="john@email.com"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+254..."
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Counseling"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <button className="contact-submit-btn" type="submit">
                Send Message
                <Send size={16} />
              </button>
              {status && <p className="status">{status}</p>}
            </form>
          </motion.div>
        </div>
      </div>
      <div className={`location-wrapper ${isExpanded ? 'expanded' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={isExpanded ? 'expanded' : 'normal'}
            className="location-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={MMUST} 
              alt="MMUST Campus" 
              className={`location-image ${isExpanded ? 'expanded' : ''}`} 
            />
            <button 
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <FaTimes size={16} /> : <FaExpand size={16} />}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;