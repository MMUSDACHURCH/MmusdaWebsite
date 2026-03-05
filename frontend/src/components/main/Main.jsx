import React from "react";
import { motion } from "framer-motion";
import "./Main.css";
import logo1 from "../../assets/images/logo1.jpeg";
import { BookOpen, Heart, Users, Music } from "lucide-react";

const Main = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const lines = [
    { text: "Empowering Faith", icon: BookOpen, i: 4 },
    { text: "Inspiring Hope", icon: Heart, i: 3 },
    { text: "Serving Community", icon: Users, i: 2 },
    { text: "Growing Together in Spirit", icon: Music, i: 1 }
  ];

  return (
    <section className="main-home">
      <motion.div
        className="main-info"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1 variants={item}>
          Welcome to <span className="highlight">MMUSDA</span> Church
        </motion.h1>

        <div className="animated-lines">
          {lines.map((line, index) => {
            const Icon = line.icon;
            return (
              <motion.div
                className="line-item"
                key={index}
                variants={item}
                style={{ "--i": line.i }}
              >
                <div className="icon-box">
                  <Icon size={18} />
                </div>
                <span data-text={line.text}>{line.text}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p variants={item}>
          We are committed to nurturing spiritual growth, fostering strong
          connections, and serving the community with love and purpose.
        </motion.p>

        <motion.p variants={item}>
          Join us every Sabbath for worship, fellowship, music, and meaningful
          spiritual enrichment that strengthens faith and builds lasting
          relationships.
        </motion.p>

        <motion.div variants={item} className="main-buttons">
          <a href="/learn-more" className="main-btn">
            Learn More
          </a>

          <a href="/become-member" className="main-btn outline">
            Become a Member
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="main-image"
        initial={{ opacity: 0, scale: 0.85, x: 80 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="image-box">
          <div className="image-inner">
            <img src={logo1} alt="Opened Bible" />
          </div>
        </div>

        <motion.div
          className="floating-card"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="card-icon">
            <Users size={20} />
          </div>
          <div>
            <p className="card-title">1000+</p>
            <p className="card-sub">Members Strong</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Main;