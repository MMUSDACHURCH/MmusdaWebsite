import React from "react";
import { motion } from "framer-motion";
import "./Main.css";
import logo1 from "../../assets/images/logo1.jpeg";
import { BookOpen, Heart, Users, Music, ShieldCheck, Zap, Globe } from "lucide-react";

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
    { text: "Proclaiming the Three Angels' Messages", icon: Zap, i: 4 },
    { text: "Restoring the Sabbath Truth", icon: ShieldCheck, i: 3 },
    { text: "Preparing a People for Glory", icon: Globe, i: 2 },
    { text: "Worshipping in Spirit and Truth", icon: Music, i: 1 }
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
          Faith, <span className="highlight">Truth</span> & Prophecy at MMUSDA
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

        <motion.div variants={item} className="main-content-rich">
          <p className="hover-text">
            MMUSDA is more than a church; it is a prophetic movement within Masinde Muliro 
            University. We are called to proclaim the everlasting gospel of Revelation 14 
            to every nation, kindred, tongue, and people. In a world of confusion, we 
            stand as a beacon of the remnant church, upholding the commandments of God 
            and the faith of Jesus.
          </p>

          <p className="hover-text">
            Our mission is rooted in the urgent call to "Fear God and give glory to Him." 
            We invite you to experience the beauty of the Seventh-day Sabbath, a sanctuary 
            in time where we disconnect from the world and reconnect with our Creator. 
            From deep theological insights to heartfelt student fellowship, your spiritual 
            journey finds its home here.
          </p>

          <p className="hover-text">
            Join our diverse ministries—from the Singing Ambassadors and Health Outreach 
            to vibrant Youth Societies. Together, we are growing in grace, studying 
            the word, and looking forward to the blessed hope of the Second Coming.
          </p>
        </motion.div>

        <motion.div variants={item} className="main-buttons">
          <a href="/learn-more" className="main-btn">
            Explore Our Beliefs
          </a>

          <a href="/become-member" className="main-btn outline">
            Join the Remnant
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
            <img src={logo1} alt="SDA Logo or Bible" />
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
            <p className="card-sub">Active Students</p>
          </div>
        </motion.div>

        <motion.div
          className="floating-card second"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="card-icon alt">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="card-title">28</p>
            <p className="card-sub">Fundamental Beliefs</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Main;