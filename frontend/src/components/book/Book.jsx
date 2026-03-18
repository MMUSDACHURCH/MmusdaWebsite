import React from 'react';
import { BookOpen, Target, History, BookMarked, Globe, Quote, Library, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import './Books.css';

const Books = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="books-outer-wrapper">
      <div className="books-page-card">
        <header className="books-slim-hero">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="slim-hero-content"
          >
            <motion.div 
              className="mini-badge"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 140, 0, 0.25)" }}
            >
              <Sparkles size={16} />
              <span>MMUSDA MINISTRY</span>
            </motion.div>
            <h1 className="slim-title">LITERATURE <span className="highlight">MINISTRY</span></h1>
            <p className="hero-subtitle">Sharing truth through the power of the printed page</p>
          </motion.div>
        </header>

        <motion.div 
          className="books-content-area"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.section variants={itemVariants} className="intro-stripe">
            <div className="text-content">
              <h2 className="section-display-name">Who Are We?</h2>
              <p className="section-excerpt">
                The Literature Ministry Department of Masinde Muliro University SDA Church is part of a global network 
                committed to evangelism through printed and digital materials. Inspired by the three angels' message, 
                we provide gospel-centered resources to church members and the community.
              </p>
              <div className="meta-row">
                <motion.div whileHover={{ y: -3 }} className="meta-pill">
                  <Target size={14} />
                  <span>Hope & Salvation</span>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="meta-pill">
                  <Globe size={14} />
                  <span>Global Network</span>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <div className="info-grid">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)" }}
              className="glass-card"
            >
              <div className="card-head">
                <div className="icon-circle">
                  <History size={20} />
                </div>
                <h3>Historical Foundation</h3>
              </div>
              <p>Dating back to 1849 with James White's "The Present Truth," MMUSDA's chapter began in 2012, spreading the gospel one page at a time under divine guidance.</p>
              <div className="verse-snippet">
                <Quote size={12} />
                <span>"No better witness than inspired text."</span>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)" }}
              className="glass-card"
            >
              <div className="card-head">
                <div className="icon-circle">
                  <BookMarked size={20} />
                </div>
                <h3>What We Do</h3>
              </div>
              <ul className="interactive-list">
                <motion.li whileHover={{ x: 5 }}><span>📖</span> Literature Distribution</motion.li>
                <motion.li whileHover={{ x: 5 }}><span>🛠️</span> Member Training</motion.li>
                <motion.li whileHover={{ x: 5 }}><span>🤝</span> Outreach Support</motion.li>
                <motion.li whileHover={{ x: 5 }}><span>💻</span> Digital Access</motion.li>
              </ul>
            </motion.div>
          </div>

          <motion.section variants={itemVariants} className="cta-stripe">
            <motion.div 
              className="importance-box"
              whileHover={{ scale: 1.01 }}
            >
              <div className="importance-content">
                <Quote className="quote-icon" size={40} />
                <p>"If there is one work more important than another, it is that of getting our publications before the people."</p>
                <cite>— Ellen G. White, The Publishing Ministry</cite>
              </div>
            </motion.div>

            <div className="library-action">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Library size={40} className="lib-icon" />
              </motion.div>
              <h3>Full Online Library</h3>
              <p>Deepen your spiritual journey by accessing the complete collection through the official EGW Writings website.</p>
              
              <motion.a 
                href="https://egwwritings.org/titles/books" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="interactive-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Browse All EGW Books</span>
                <ArrowRight size={18} className="btn-arrow" />
              </motion.a>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Books;