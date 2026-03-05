import React, { useState } from "react";
import { createOffering } from "../../Features/offering/offeringAPI";
import OfferingDetails from "../../components/offeringdetails/OfferingDetails";
import { motion } from "framer-motion";
import "./Offering.css";

const Offering = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    amount: "",
    purpose: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOffering(formData);
      setMessage("Offering created successfully!");
      setFormData({ phoneNumber: "", name: "", amount: "", purpose: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="offering-container">
      <motion.h1
        className="offering-page-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Church Offering
      </motion.h1>

      <motion.div
        className="offering-quote-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="offering-quote">
          “Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.” — Luke 6:38
        </motion.p>

        <motion.p variants={itemVariants} className="offering-quote">
          “Honor the Lord with your wealth, with the firstfruits of all your crops.” — Proverbs 3:9
        </motion.p>
      </motion.div>

      <motion.div
        className="offering-details-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="instruction">
          Send money to the number above
        </motion.p>

        <OfferingDetails />

        <motion.p variants={itemVariants} className="instruction">
          Submit the following in the form after sending
        </motion.p>
      </motion.div>

      <motion.form
        className="offering-form"
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants}>Create New Offering</motion.h2>

        <motion.input
          variants={itemVariants}
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <motion.input
          variants={itemVariants}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <motion.input
          variants={itemVariants}
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />

        <motion.input
          variants={itemVariants}
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Purpose"
          required
        />

        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.03, backgroundColor: "#ff8c00", color: "#001f4d" }}
        >
          Submit
        </motion.button>

        {message && (
          <motion.p variants={itemVariants} className="message">
            {message}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default Offering;