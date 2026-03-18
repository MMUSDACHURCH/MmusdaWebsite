import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from 'react-icons/fa';
import { Info, Target, Calendar, Sunrise, Sparkles, ArrowRight, Heart } from "lucide-react";
import './AboutMmusda.css';

const AboutMmusda = () => {
  const [activeTab, setActiveTab] = useState('who');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabData = [
    { id: 'who', label: 'Who We Are', icon: <Info size={18} /> },
    { id: 'vision', label: 'Vision & Mission', icon: <Target size={18} /> },
    { id: 'activities', label: 'Activities', icon: <Calendar size={18} /> },
    { id: 'worship', label: 'Worship', icon: <Sunrise size={18} /> },
  ];

  const content = {
    who: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
        <h2 className="content-title">Who We Are</h2>
        <p className="description-text">MMUSDA is a vibrant Christ-centered community at Masinde Muliro University of Science and Technology. We are dedicated to inviting members of the MMUST community to accept Jesus Christ as Lord and Savior while engaging in charitable activities and public evangelism both within and without the university walls.</p>
        <div className="quote-accent-box">
          <Heart className="heart-icon" size={24} />
          <p>Our method is simple: we mingle with others as those who desire their good, showing genuine sympathy, ministering to needs, and building trust to lead others to Christ.</p>
        </div>
      </motion.div>
    ),
    vision: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
        <h2 className="content-title">Vision & Mission</h2>
        <div className="vision-grid">
          <div className="glass-feature-card">
            <h3>Our Mission</h3>
            <p>To nurture a Christ-centered community on campus, empowering students and faculty to live and share the Adventist message of hope and wholeness through worship, evangelism, discipleship, and service.</p>
          </div>
          <div className="glass-feature-card highlight-card">
            <h3>Our Vision</h3>
            <p>In harmony with Bible revelation, MMUSDA envisions an empowered, spiritually mature, Christ-centered community prepared for impactful service in the church, society, and the world to come.</p>
          </div>
        </div>
      </motion.div>
    ),
    activities: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
        <h2 className="content-title">Weekly Fellowship</h2>
        <div className="activities-grid">
          {[
            { day: "Sunday", task: "10am Family Meetings | 4pm Choir" },
            { day: "Monday", task: "5:30am Morning Glory | 6:30pm Health" },
            { day: "Tuesday", task: "6:30pm Prophecy Class" },
            { day: "Wednesday", task: "12pm Gethsemane | 6:30pm Vespers" },
            { day: "Thursday", task: "6:30pm Year Group Meetings" },
            { day: "Friday", task: "6:30pm Sabbath Welcoming" }
          ].map((item, idx) => (
            <div key={idx} className="activity-mini-card">
              <span className="day-label">{item.day}</span>
              <p>{item.task}</p>
            </div>
          ))}
        </div>
        <div className="semester-highlights">
          <h3>Semester Highlights</h3>
          <ul className="modern-list">
            <li><ArrowRight size={14} /> December Mission (End of Semester 1)</li>
            <li><ArrowRight size={14} /> Mission Follow-ups (Semester 2)</li>
            <li><ArrowRight size={14} /> Annual Camp Meeting</li>
            <li><ArrowRight size={14} /> Revival, Music, Health, & Youth Weeks</li>
          </ul>
        </div>
      </motion.div>
    ),
    worship: (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tab-pane">
        <h2 className="content-title">Worship Services</h2>
        <div className="table-responsive">
          <table className="modern-schedule">
            <thead>
              <tr>
                <th>Time</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>07:30 - 08:00</td><td>Singing Session</td></tr>
              <tr><td>08:00 - 08:30</td><td>Devotion</td></tr>
              <tr><td>08:30 - 09:50</td><td>Sabbath School & Discussion</td></tr>
              <tr><td>10:00 - 11:10</td><td>Song Service & Prayer</td></tr>
              <tr className="divine-hour-row"><td>11:10 - 12:40</td><td>Divine Hour</td></tr>
            </tbody>
          </table>
        </div>
        <div className="afternoon-session">
          <h3>Afternoon Fellowship</h3>
          <div className="pill-container">
            <span className="time-pill">2:00pm - 4:10pm</span>
            <span className="desc-pill">Bible Study & Song Service</span>
          </div>
        </div>
      </motion.div>
    )
  };

  return (
    <div className="about-outer-wrapper">
      <div className="about-page-card">
        <header className="about-slim-hero">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-inner">
            <div className="mini-badge">
              <Sparkles size={16} />
              <span>ABOUT THE CHURCH</span>
            </div>
            <h1 className="slim-title">MMUSDA <span className="highlight">COMMUNITY</span></h1>
          </motion.div>
        </header>

        <div className="about-layout-body">
          <aside className={`about-sidebar ${sidebarOpen ? 'sidebar-active' : ''}`}>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
            <nav className="about-nav">
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  className={`about-nav-item ${activeTab === tab.id ? 'nav-active' : ''}`}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                >
                  <span className="nav-icon">{tab.icon}</span>
                  <span className="nav-text">{tab.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          <button className="about-mobile-trigger" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>

          <main className="about-main-content">
            <AnimatePresence mode="wait">
              <div key={activeTab}>
                {content[activeTab]}
              </div>
            </AnimatePresence>
          </main>
        </div>

        <footer className="about-bottom-bar">
           <p>“Unity in Purpose, Excellence in Service” <span>— MMUSDA 2026</span></p>
        </footer>
      </div>
    </div>
  );
};

export default AboutMmusda;