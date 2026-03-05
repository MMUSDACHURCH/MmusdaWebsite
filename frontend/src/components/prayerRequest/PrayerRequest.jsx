import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, Users, BookOpen, Clock } from "lucide-react";
import {
  getPublicPrayerRequests,
  createPrayerRequest,
} from "../../Features/prayerRequest/prayerRequestAPI";
import "./PrayerRequest.css";

const PrayerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    title: "",
    description: "",
    isPublic: "yes",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const data = await getPublicPrayerRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createPrayerRequest(formData);
      setMessage("Prayer request submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        title: "",
        description: "",
        isPublic: "yes",
      });
      fetchRequests();
    } catch (error) {
      setMessage(error.message || "Failed to submit request");
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="prayer-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="prayer-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="hero-badge">
          <Heart size={18} />
          <span>We Pray With You</span>
        </motion.div>

        <motion.h1 variants={itemVariants}>Prayer Request</motion.h1>

        <motion.p variants={itemVariants} className="hero-sub">
          No burden is too heavy when shared. Our prayer team is here to lift you
          up in faith.
        </motion.p>

        <motion.p variants={itemVariants} className="bible-verse">
          "Do not be anxious about anything, but in every situation, by prayer
          and petition, with thanksgiving, present your requests to God." –
          Philippians 4:6
        </motion.p>
      </motion.div>

      <motion.section
        className="prayer-form-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(11, 61, 145, 0.4)" }}
      >
        <h2>Submit Your Prayer Request</h2>

        <form className="prayer-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="phoneNumber"
                placeholder="Phone Number (optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="title"
                placeholder="Prayer Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="description"
                placeholder="Share your prayer request..."
                value={formData.description}
                onChange={handleChange}
                required
              />
              <motion.select
                whileFocus={{ scale: 1.02 }}
                name="isPublic"
                value={formData.isPublic}
                onChange={handleChange}
              >
                <option value="yes">Public</option>
                <option value="no">Private</option>
              </motion.select>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="submit-btn"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ boxShadow: "0 10px 25px rgba(255,127,80,0.35)" }}
            animate={{ boxShadow: "0 15px 30px rgba(255,127,80,0.45)" }}
            transition={{ duration: 0.3 }}
          >
            {loading ? "Submitting..." : "Submit Prayer Request"}
            <Send size={18} style={{ marginLeft: "8px" }} />
          </motion.button>
        </form>

        {message && (
          <motion.p 
            className="form-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
        )}
      </motion.section>

      <motion.section 
        className="prayer-requests-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Public Prayer Requests
        </motion.h2>

        {requests.length === 0 ? (
          <motion.p 
            className="empty-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            No public prayer requests yet. Be the first to submit!
          </motion.p>
        ) : (
          <motion.div 
            className="prayer-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {requests.map((req, index) => (
              <motion.div
                key={req.requestId}
                className="prayer-item"
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 25px 40px -15px rgba(255,127,80,0.4)",
                  borderLeftWidth: "8px"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3>{req.title}</h3>
                <p className="prayer-author">
                  <span className="by-text">by</span> {req.firstName} {req.lastName}
                </p>
                <p className="prayer-desc">{req.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      <motion.footer 
        className="prayer-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        <p>
          "The prayer of a righteous person is powerful and effective." –
          James 5:16
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default PrayerRequest;