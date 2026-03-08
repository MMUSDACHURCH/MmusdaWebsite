import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    "Home",
    "About Us",
    "Ministries",
    "Announcements",
    "Tithes & Offerings",
    "Resources"
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-card">
          <h3>MMUSDA Church</h3>
          <p>
            A Christ-centered Seventh-day Adventist Church at Masinde Muliro
            University of Science and Technology nurturing spiritual growth,
            fellowship and service.
          </p>

          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <span>MMUST Main Campus, Kakamega</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <span>+254 705214338</span>
          </div>
        </div>

        <div className="footer-card">
          <h3>Quick Links</h3>

          <ul className="quick-links">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={`/${link.toLowerCase().replace(/\s/g, "-")}`}>
                  <span className="link-line"></span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-card">
          <h3>Sabbath Schedule</h3>

          <ul className="schedule">
            <li><span>Singing Session</span><span>7:30 AM</span></li>
            <li><span>Devotion</span><span>8:00 AM</span></li>
            <li><span>Sabbath School</span><span>8:30 AM</span></li>
            <li><span>Song Service</span><span>10:00 AM</span></li>
            <li><span>Divine Hour</span><span>11:10 AM</span></li>
            <li><span>Bible Study</span><span>2:00 PM</span></li>
          </ul>

          <h4 className="midweek">Midweek Programs</h4>

          <ul className="schedule">
            <li><span>Health Class (Mon)</span><span>6:30 PM</span></li>
            <li><span>Prophecy Class (Tue)</span><span>6:30 PM</span></li>
            <li><span>Midweek Vespers (Wed)</span><span>6:30 PM</span></li>
          </ul>
        </div>

        <div className="footer-card">
          <h3>Stay Connected</h3>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>
              <FaPaperPlane />
            </button>
          </div>

          <div className="socials">
            <a href="https://m.facebook.com/@MasindeMuliroSDA/?wtsid=rdr_0aLQHB4isZ7jCnp0Q&hr=1" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://x.com/Mmusda_church?s=09" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://www.tiktok.com/@mmustsda?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer"><FaTiktok /></a>
            <a href="https://youtube.com/@mmustsdachurch?si=Mzu6ODG4WY-aMk9z" target="_blank" rel="noreferrer"><FaYoutube /></a>
            <a href="mailto:Mmusdachurch1844@gmail.com"><FaEnvelope /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {currentYear} MMUSDA Church | Built with Faith & Technology
      </div>
    </footer>
  );
};

export default Footer;