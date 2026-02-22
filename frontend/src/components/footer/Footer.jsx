import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiViber } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-card">
          <h3>MMUSDA Church</h3>
          <p>
            A Christ-centered Seventh-day Adventist Church at Masinde Muliro
            University of Science and Technology, nurturing spiritual growth,
            fellowship, and service.
          </p>
          <p>
            <FaMapMarkerAlt className="icon-inline"/> MMUST Main Campus
          </p>
          <p>
            <FaPhoneAlt className="icon-inline"/> +254 7XX XXX XXX
          </p>
        </div>

        <div className="footer-card">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/ministries">Ministries</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
            <li><Link to="/tithes">Tithes & Offerings</Link></li>
            <li><Link to="/resources">Resources</Link></li>
          </ul>
        </div>

        <div className="footer-card">
          <h3>Sabbath Program</h3>
          <ul>
            <li>7:30 – 8:00 AM: Singing Session</li>
            <li>8:00 – 8:30 AM: Devotion</li>
            <li>8:30 – 9:50 AM: Sabbath School</li>
            <li>10:00 – 10:40 AM: Song Service</li>
            <li>11:10 AM – 12:40 PM: Divine Hour</li>
            <li>2:00 – 4:10 PM: Bible Study</li>
          </ul>
        </div>

        <div className="footer-card">
          <h3>Weekly Programs</h3>
          <ul>
            <li>Sunday: Family Meetings & Choir</li>
            <li>Monday: Health Class (6:30 PM)</li>
            <li>Tuesday: Prophecy Class (6:30 PM)</li>
            <li>Wednesday: Midweek Vespers</li>
            <li>Thursday: Year Group Meetings</li>
            <li>Friday: Sabbath Welcoming</li>
            <li>Morning Glory: Mon 5:30 AM</li>
            <li>Gethsemane Prayers: Wed 12–1 PM</li>
          </ul>
        </div>

        <div className="footer-card">
          <h3>Stay Connected</h3>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
            <a href="mailto:emmanuelmose806@gmail.com"><FaEnvelope /></a>
            <a href="#"><SiViber /></a>
          </div>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 MMUSDA Church | Built with Faith & Technology
      </div>
    </footer>
  );
};

export default Footer;