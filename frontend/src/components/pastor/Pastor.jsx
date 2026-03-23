import React, { useEffect, useState } from "react";
import { getAllPastors } from "../../Features/pastors/pastorsAPI";
import "./Pastor.css";
import { motion } from "framer-motion";

const Pastor = () => {
  const [pastors, setPastors] = useState([]);

  const fetchPastors = async () => {
    const data = await getAllPastors();
    setPastors(data);
  };

  useEffect(() => {
    fetchPastors();
  }, []);

  return (
    <div className="pastor-container">
      <h1>Our Pastors</h1>
      <div className="pastor-grid">
        {pastors.map((pastor) => (
          <motion.div
            key={pastor.pastorId}
            className="pastor-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {pastor.image && (
              <img
                src={pastor.image}
                alt={pastor.name}
                className="pastor-image"
              />
            )}
            <h3>{pastor.name}</h3>
            <p className="pastor-title">{pastor.title}</p>
            <p className="pastor-contact">{pastor.contactNumber}</p>
            <p className="pastor-message">{pastor.message || "Message from pastor"}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pastor;