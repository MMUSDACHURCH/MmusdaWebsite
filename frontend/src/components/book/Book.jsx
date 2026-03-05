import React from 'react';
import './Books.css';

const Books = () => {
  return (
    <div className="books-page">

      <header className="books-header">
        <div className="books-hero">
          <h1>Literature Ministry Department</h1>
          <p className="subtitle">"Fulfilling the great commission through the printed page"</p>
        </div>
      </header>

      <div className="books-content">

        <section className="vision-mission-grid">
          <div className="info-card animate-slide-up">
            <h3>Vision</h3>
            <p>Reach every home and heart with the message of hope and salvation through SDA literature.</p>
          </div>
          <div className="info-card animate-slide-up">
            <h3>Mission</h3>
            <p>Mobilize and equip members to share truth-filled literature that transforms lives.</p>
          </div>
        </section>

        <section className="text-section">
          <h2>Who Are We?</h2>
          <p>The Literature Ministry Department of Masinde Muliro University SDA Church is part of a global network committed to evangelism through printed and digital materials. Inspired by the three angels' message, we provide gospel-centered resources to church members and the community.</p>

          <div className="historical-box animate-slide-up">
            <h2>Historical Foundation</h2>
            <p>The literature ministry dates back to the 1840s. Elder James White published <i>The Present Truth</i> in 1849, laying the foundation for Adventist publishing.</p>
            <p>MMUSDA's literature ministry began in 2012, spreading the gospel one page at a time under divine guidance.</p>
            <p className="scripture-quote">"There is no better witness of Christ than the inspired text of scripture."</p>
          </div>
        </section>

        <section className="list-grid">
          <div className="list-card animate-slide-up">
            <h3>What We Do</h3>
            <ul>
              <li>📖 Literature Distribution: Books, tracts, and Bible studies sharing hope and healing.</li>
              <li>🛠️ Training: Equip members to become literature evangelists.</li>
              <li>🤝 Outreach Support: Partner with departments for evangelism events.</li>
              <li>💻 Digital Access: Promote online materials and social media outreach.</li>
            </ul>
          </div>

          <div className="list-card animate-slide-up">
            <h3>Goals & Objectives</h3>
            <ul>
              <li>Revive literature evangelism in the church.</li>
              <li>Encourage members to be literature missionaries.</li>
              <li>Nurture spiritual growth through inspired writings.</li>
              <li>Reach unreached communities with Christ-centered messages.</li>
              <li>Support youth through summer literature programs.</li>
            </ul>
          </div>
        </section>

        <section className="involvement-section animate-slide-up">
          <h2>How You Can Get Involved</h2>
          <div className="involvement-chips">
            <span>Share a tract daily</span>
            <span>Volunteer for workshops</span>
            <span>Support through prayer</span>
            <span>Donate materials</span>
            <span>Pray for open hearts</span>
          </div>
        </section>

        <section className="cta-section">
          <div className="importance-box animate-slide-up">
            <h3>Why It Still Matters</h3>
            <p>A printed book or tract can speak to a soul when words cannot. This ministry remains one of the most effective outreach channels today.</p>
            <blockquote>
              "If there is one work more important than another, it is that of getting our publications before the people."
              <cite>— Ellen G. White, The Publishing Ministry</cite>
            </blockquote>
          </div>

          <div className="online-library animate-slide-up">
            <h2>Ellen G. White Books – Full Online Library</h2>
            <p>Access the complete collection online through the official EGW Writings website.</p>
            <a href="https://egwwritings.org/titles/books" target="_blank" rel="noopener noreferrer" className="browse-button">
              📚 Browse All EGW Books
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Books;