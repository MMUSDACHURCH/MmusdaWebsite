import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, BookOpen, Users, Calendar, Heart, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Bible from "../../assets/Bible.png";
import "./Hero1.css";

const Hero1 = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgY = useSpring(y, { stiffness: 60, damping: 20 });

  const stats = [
    { icon: <Users />, label: "Members", value: "2000+" },
    { icon: <BookOpen />, label: "Ministries", value: "12" },
    { icon: <Calendar />, label: "Events", value: "Weekly" },
    { icon: <Heart />, label: "Outreach", value: "Daily" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="hero1-outer-page-wrapper">
      <section ref={ref} className="hero1-section">
        <motion.div
          className="hero1-bg"
          style={{
            backgroundImage: `url(${Bible})`,
            opacity,
            scale,
            y: bgY
          }}
        >
          <div className="hero1-overlay" />
        </motion.div>

        <div className="hero1-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero1-layout-grid"
          >
            <div className="hero1-content">
              <motion.div variants={itemVariants} className="hero1-badge-container">
                <span className="hero1-badge">
                  <Sparkles className="icon-small" /> Seventh-Day Adventist Church
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="hero1-title">
                Preparing People <br />
                <span className="interactive-highlight">For His Soon Coming</span>
              </motion.h1>

              <motion.div variants={itemVariants} className="hero1-mission-box">
                <p className="hero1-description hover-text-glow">
                  Welcome to MMUSDA, a vibrant sanctuary within Masinde Muliro University. 
                  We are a family of believers dedicated to sharing the everlasting gospel 
                  of the Three Angels' Messages through Christ-centered worship.
                </p>
                
                <div className="hero1-pillars">
                  {["Evangelism", "Fellowship", "Discipleship"].map((p, idx) => (
                    <motion.div 
                      key={p} 
                      className="pillar"
                      whileHover={{ scale: 1.05, color: "#fff" }}
                    >
                      {idx === 0 && <Globe size={14} />}
                      {idx === 1 && <Users size={14} />}
                      {idx === 2 && <BookOpen size={14} />}
                      {p}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="hero1-buttons">
                <Link to="/about" className="hero-btn primary">
                  Join Our Family <ArrowRight size={18} />
                </Link>
                <Link to="/sermons" className="hero-btn secondary">
                  Watch Livestream
                </Link>
              </motion.div>
              
              <motion.p variants={itemVariants} className="hero1-sabbath-note">
                "Remember the Sabbath day, to keep it holy." — Exodus 20:8
              </motion.p>
            </div>

            <div className="hero1-stats-container">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    borderColor: "#ff8c00",
                    boxShadow: "0 15px 30px rgba(255,140,0,0.2)"
                  }}
                  className="hero1-stat-card"
                >
                  <div className="stat-icon-wrapper">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero1;