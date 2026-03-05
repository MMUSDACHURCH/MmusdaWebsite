import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero1.css";

const Hero1 = () => {
  const stats = [
    { icon: <Users />, label: "Members", value: "500+" },
    { icon: <BookOpen />, label: "Ministries", value: "12" },
    { icon: <Calendar />, label: "Events", value: "Weekly" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: 0.8 + i * 0.15, duration: 0.6, ease: "backOut" } }),
    hover: { scale: 1.1, backgroundColor: "rgba(255, 215, 0, 0.15)", borderColor: "#ffd700", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2)", transition: { duration: 0.3 } },
  };

  return (
    <section className="hero1-section">
      <div
        className="hero1-bg"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcd96f32-c807-4917-aed3-b869773aa6d1/church-building-93ffa98d-1772685261781.webp')",
        }}
      >
        <div className="hero1-overlay" />
      </div>

      <div className="hero1-container">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="hero1-content">
          <motion.span variants={itemVariants} className="hero1-badge">
            Welcome to MMUSDA
          </motion.span>
          <motion.h1 variants={itemVariants} className="hero1-title">
            Connecting People <br />
            <span className="highlight">To The Light</span> of Truth
          </motion.h1>
          <motion.p variants={itemVariants} className="hero1-description">
            Join the Masinde Muliro University Seventh Day Adventist Church community. Experience spiritual growth, fellowship, and service in the heart of Kakamega.
          </motion.p>
          <motion.div variants={itemVariants} className="hero1-buttons">
            <Link to="/about" className="hero1-btn-primary">
              Learn More <ArrowRight className="icon" />
            </Link>
            <Link to="/sermons" className="hero1-btn-secondary">
              Watch Sermons
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero1-stats">
        {stats.map((stat, i) => (
          <motion.div key={i} custom={i} variants={statVariants} initial="hidden" animate="visible" whileHover="hover" className="hero1-stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero1;