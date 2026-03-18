import React, { useState } from 'react';
import logo1 from "../../assets/images/logo1.jpeg";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaLightbulb, FaGlobe, FaHistory, FaBookOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutSDA.css';

const AboutSDA = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const faqData = [
    {
      question: "How do Adventists view faith and science?",
      icon: <FaLightbulb />,
      content: [
        "Operate 118 universities with strong STEM programs",
        "Loma Linda researchers contribute to NASA studies",
        "\"All truth is God's truth\" whether revealed or discovered"
      ]
    },
    {
      question: "Why keep Sabbath in the 21st century?",
      icon: <FaHistory />,
      content: [
        "24-hour digital detox reduces stress",
        "Community building through fellowship",
        "Historical roots in early Christianity"
      ]
    },
    {
      question: "What makes Adventist education unique?",
      icon: <FaBookOpen />,
      content: [
        "Whole-person development",
        "Service learning opportunities",
        "Integration of values in all disciplines"
      ]
    },
    {
      question: "How does Adventism approach social justice?",
      icon: <FaGlobe />,
      content: [
        "Humanitarian work through ADRA",
        "Health advocacy and education",
        "Religious liberty initiatives"
      ]
    }
  ];

  return (
    <div className="sda-outer-wrapper">
      <div className="sda-page-card">
        
        <aside className={`sda-sidebar ${sidebarOpen ? 'sidebar-active' : ''}`}>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
          
          <div className="sidebar-header">
            <img src={logo1} alt="Logo" className="sidebar-logo-img" />
            <h3>SDA GLOBAL</h3>
          </div>

          <nav className="sda-nav">
            <a href="#history" className="sda-nav-item" onClick={() => setSidebarOpen(false)}>
              <FaHistory className="nav-icon" /> <span>History</span>
            </a>
            <a href="#faq" className="sda-nav-item" onClick={() => setSidebarOpen(false)}>
              <FaLightbulb className="nav-icon" /> <span>Frequent Q&A</span>
            </a>
            <a href="#video" className="sda-nav-item" onClick={() => setSidebarOpen(false)}>
              <FaGlobe className="nav-icon" /> <span>Impact</span>
            </a>
          </nav>

          <div className="sidebar-fact-card">
            <div className="fact-badge">DID YOU KNOW?</div>
            <p>Seventh-day Adventists observe the Sabbath on Saturday, emphasizing rest, worship, and family.</p>
          </div>
        </aside>

        <button className="sda-mobile-trigger" onClick={() => setSidebarOpen(true)}>
          <FaBars />
        </button>

        <main className="sda-main-layout">
          <header className="sda-hero-banner">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="hero-badge">OFFICIAL OVERVIEW</div>
              <h1>ABOUT SEVENTH DAY <span className="highlight">ADVENTIST</span></h1>
              <p className="bible-verse">"Come now, let us reason together" — Isaiah 1:18</p>
            </motion.div>
          </header>

          <div className="sda-content-padding">
            <section id="history" className="history-modern-section">
              <div className="history-flex">
                <div className="history-image-box">
                  <img src={logo1} alt="SDA Heritage" />
                  <div className="image-overlay-glow"></div>
                </div>
                <div className="history-content-text">
                  <h2 className="section-title">THE HERITAGE</h2>
                  <p>The Seventh-day Adventist Church emerged from the Great Awakening movements of the 19th century, when young Bible students began questioning mainstream interpretations of Scripture.</p>
                  <button className="learn-more-btn">Read Full Story</button>
                </div>
              </div>
            </section>

            <section id="faq" className="faq-modern-section">
              <h2 className="section-title text-center">FREQUENT Q&A</h2>
              <div className="accordion-group">
                {faqData.map((item, index) => (
                  <div key={index} className={`faq-card ${activeFaq === index ? 'faq-active' : ''}`}>
                    <button className="faq-trigger" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                      <span className="faq-q-text">{item.icon} {item.question}</span>
                      {activeFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="faq-answer"
                        >
                          <ul className="faq-list">
                            {item.content.map((line, i) => <li key={i}>{line}</li>)}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            <section id="video" className="video-modern-section">
              <div className="video-container-card">
                <h3 className="video-title">The Adventist Story</h3>
                <div className="video-frame-wrapper">
                  <iframe 
                    src="https://www.youtube.com/embed/Ezd2BdtkLX0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </section>
          </div>

          <footer className="sda-footer-branding">
             <div className="footer-logo-wrap">
                <img src={logo1} alt="MMUSDA" />
                <div>
                  <h4>MMUSDA</h4>
                  <p>Building Faith, Serving Humanity</p>
                </div>
             </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AboutSDA;