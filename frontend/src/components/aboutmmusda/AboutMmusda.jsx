import React, { useState } from 'react';
import './AboutMmusda.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const AboutMmusda = () => {
  const [activeTab, setActiveTab] = useState('who');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const content = {
    who: (
      <div className="animate-fade">
        <h2>Who We Are</h2>
        <p>MMUSDA is a vibrant Christ-centered community at Masinde Muliro University of Science and Technology. We are dedicated to inviting members of the MMUST community to accept Jesus Christ as Lord and Savior while engaging in charitable activities and public evangelism both within and without the university walls.</p>
        <p>Our method is simple: we mingle with others as those who desire their good, showing genuine sympathy, ministering to needs, and building trust to lead others to Christ.</p>
      </div>
    ),
    vision: (
      <div className="animate-fade">
        <h2>Vision & Mission</h2>
        <div className="content-card">
          <h3>Our Mission</h3>
          <p>To nurture a Christ-centered community on campus, empowering students and faculty to live and share the Adventist message of hope and wholeness through worship, evangelism, discipleship, and service.</p>
        </div>
        <div className="content-card">
          <h3>Our Vision</h3>
          <p>In harmony with Bible revelation, MMUSDA envisions an empowered, spiritually mature, Christ-centered community prepared for impactful service in the church, society, and the world to come.</p>
        </div>
      </div>
    ),
    activities: (
      <div className="animate-fade">
        <h2>Weekly & Semester Activities</h2>
        <div className="grid-container">
          <div className="day-card"><strong>Sunday:</strong> 10am Family Meetings | 4pm Choir</div>
          <div className="day-card"><strong>Monday:</strong> 5:30am Morning Glory | 6:30pm Health Class</div>
          <div className="day-card"><strong>Tuesday:</strong> 6:30pm Prophecy Class</div>
          <div className="day-card"><strong>Wednesday:</strong> 12pm Gethsemane | 6:30pm Vespers</div>
          <div className="day-card"><strong>Thursday:</strong> 6:30pm Year Group Meetings</div>
          <div className="day-card"><strong>Friday:</strong> 6:30pm Sabbath Welcoming</div>
        </div>
        <h3>Semester Highlights</h3>
        <ul>
          <li>December Mission (End of Semester 1)</li>
          <li>Mission Follow-ups (Semester 2)</li>
          <li>Annual Camp Meeting</li>
          <li>Special Weeks: Revival, Music, Health, Stewardship, and Youth weeks</li>
        </ul>
      </div>
    ),
    worship: (
      <div className="animate-fade">
        <h2>Worship Services</h2>
        <h3>Sabbath Morning Service</h3>
        <table className="schedule-table">
          <tbody>
            <tr><td>07:30 - 08:00</td><td>Singing Session</td></tr>
            <tr><td>08:00 - 08:30</td><td>Devotion</td></tr>
            <tr><td>08:30 - 09:50</td><td>Sabbath School & Discussion</td></tr>
            <tr><td>10:00 - 11:10</td><td>Song Service & Prayer Session</td></tr>
            <tr className="highlight-row"><td>11:10 - 12:40</td><td>Divine Hour</td></tr>
          </tbody>
        </table>
        <h3>Sabbath Afternoon Service</h3>
        <p>2:00pm - 4:10pm: Song Service & Bible Study</p>
        <p>4:10pm - Sunset: Visitations & Social Connections</p>
      </div>
    )
  };

  return (
    <div className="about-container">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-section">
          <h1>MMUSDA</h1>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={25} />
          </button>
        </div>
        <nav className="nav-menu">
          <button className={activeTab === 'who' ? 'active' : ''} onClick={() => { setActiveTab('who'); setSidebarOpen(false); }}>Who We Are</button>
          <button className={activeTab === 'vision' ? 'active' : ''} onClick={() => { setActiveTab('vision'); setSidebarOpen(false); }}>Vision & Mission</button>
          <button className={activeTab === 'activities' ? 'active' : ''} onClick={() => { setActiveTab('activities'); setSidebarOpen(false); }}>Activities</button>
          <button className={activeTab === 'worship' ? 'active' : ''} onClick={() => { setActiveTab('worship'); setSidebarOpen(false); }}>Worship</button>
        </nav>
      </div>

      <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
        <FaBars size={25} />
      </button>

      <div className="main-frame">
        <div className="content-area">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default AboutMmusda;