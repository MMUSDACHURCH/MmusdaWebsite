import React, { useEffect, useState } from "react";
import { getAllElders } from "../../Features/elder/elderAPI";
import "./Elder.css";
import { motion } from "framer-motion";

const Elder = () => {
  const [elders, setElders] = useState([]);

  const fetchElders = async () => {
    const data = await getAllElders();
    setElders(data);
  };

  useEffect(() => {
    fetchElders();
  }, []);

  return (
    <div className="elder-container">
      <h1>Our Elders</h1>
      <div className="elder-grid">
        {elders.map((elder) => (
          <motion.div
            key={elder.elderId}
            className="elder-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {elder.image && (
              <img
                src={elder.image}
                alt={elder.name}
                className="elder-image"
              />
            )}
            <h3>{elder.name}</h3>
            <p className="elder-role">{elder.role}</p>
            <p className="elder-contact">{elder.contactNumber}</p>
            <p className="elder-message">{elder.message || "Message from elder"}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Elder;