import React, { useState } from 'react';
import logo1 from "../../assets/images/logo1.jpeg";
import './AboutSDA.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const AboutSDA = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const faqData = [
    {
      question: "How do Adventists view faith and science?",
      content: [
        "Operate 118 universities with strong STEM programs",
        "Loma Linda researchers contribute to NASA studies",
        "\"All truth is God's truth\" whether revealed or discovered"
      ]
    },
    {
      question: "Why keep Sabbath in the 21st century?",
      content: [
        "24-hour digital detox reduces stress",
        "Community building through fellowship",
        "Historical roots in early Christianity"
      ]
    },
    {
      question: "What makes Adventist education unique?",
      content: [
        "Whole-person development",
        "Service learning opportunities",
        "Integration of values in all disciplines"
      ]
    },
    {
      question: "How does Adventism approach social justice?",
      content: [
        "Humanitarian work through ADRA",
        "Health advocacy and education",
        "Religious liberty initiatives"
      ]
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="sda-container">
      <aside className={`sda-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <FaTimes size={22} />
        </button>
        <nav className="sidebar-nav">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#history" onClick={() => setSidebarOpen(false)}>History</a></li>
            <li><a href="#faq" onClick={() => setSidebarOpen(false)}>Frequent Q&A</a></li>
            <li><a href="#video" onClick={() => setSidebarOpen(false)}>Global Impact</a></li>
            <li><a href="#mission" onClick={() => setSidebarOpen(false)}>Mission & Structure</a></li>
          </ul>
        </nav>
        <div className="did-you-know">
          <h4>Did You Know?</h4>
          <p>Seventh-day Adventists observe the Sabbath on Saturday, emphasizing rest, worship, and family.</p>
        </div>
      </aside>

      <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
        <FaBars size={22} />
      </button>

      <main className="sda-main">
        <header className="sda-header">
          <h1>ABOUT SEVENTH DAY ADVENTIST CHURCH (SDA)</h1>
          <p className="bible-verse">"Come now, let us reason together" - Isaiah 1:18</p>
          <p className="tagline">A faith that welcomes intellectual inquiry</p>
        </header>

        <section id="history" className="history-section">
          <div className="history-grid">
            <div className="history-image-container">
              <img src={logo1} alt="SDA Logo" />
            </div>
            <div className="history-text">
              <h2>HISTORY ABOUT SDA</h2>
              <p>
                The Seventh-day Adventist Church emerged from the Great Awakening movements of the 19th century, 
                when young Bible students began questioning mainstream interpretations of Scripture.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <h2>FREQUENT Q&A</h2>
          <div className="accordion">
            {faqData.map((item, index) => (
              <div key={index} className={`accordion-item ${activeFaq === index ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleFaq(index)}>
                  {item.question}
                  <span className="icon">{activeFaq === index ? '-' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="accordion-body">
                    <ul>
                      {item.content.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="video" className="video-section">
            <h3>The Adventist Story</h3>
            <div className="video-responsive">
                <iframe 
                    src="https://www.youtube.com/embed/Ezd2BdtkLX0" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
        </section>

        <section id="mission" className="mission-section">
            <h2>Mission & Church Structure</h2>
            <div className="mission-content">
                <p>The mission of the SDA Church is to proclaim the everlasting gospel of Jesus Christ to all people, teaching biblical principles and promoting a healthy, balanced lifestyle.</p>
                <ul>
                    <li>Global organizational structure</li>
                    <li>Emphasis on youth and community programs</li>
                    <li>Active missionary work worldwide</li>
                </ul>
            </div>
        </section>
      </main>

      <div className="right-branding">
        <img src={logo1} alt="SDA Logo" />
        <p>MMUSDA</p>
      </div>
    </div>
  );
};

export default AboutSDA;