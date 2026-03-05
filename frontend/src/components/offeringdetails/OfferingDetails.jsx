import React, { useEffect, useState } from "react";
import { getAllOfferingDetails } from "../../Features/offeringdetails/offeringDetailsAPI";
import { motion } from "framer-motion";
import "./OfferingDetails.css";

const OfferingDetails = () => {
  const [offerings, setOfferings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const data = await getAllOfferingDetails();
        setOfferings(data);
      } catch (err) {
        setError("Failed to fetch offerings.");
        console.error(err);
      }
    };
    fetchOfferings();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="offering-details-box"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>Offering Details</motion.h3>
      {error && <motion.p variants={itemVariants} className="error">{error}</motion.p>}
      {offerings.length === 0 ? (
        <motion.p variants={itemVariants} className="no-offerings">No offerings found.</motion.p>
      ) : (
        <motion.ul variants={containerVariants}>
          {offerings.map((offering) => (
            <motion.li key={offering.id} variants={itemVariants} whileHover={{ scale: 1.03, backgroundColor: "#ff7f11", color: "#fff" }}>
              <span className="offering-name">{offering.name}</span> - <span className="offering-phone">{offering.phoneNumber}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default OfferingDetails;