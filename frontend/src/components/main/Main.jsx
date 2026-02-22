import React from "react";
import "./Main.css";
import logo1 from "../../assets/images/logo1.jpeg";

const Main = () => {
  return (
    <section className="main-home">
      {/* TEXT CONTENT */}
      <div className="main-info">
        <h1>Welcome to MMUSDA Church</h1>

        <h2 className="animated-lines">
          <span style={{ "--i": 4 }} data-text="Empowering Faith">
            Empowering Faith
          </span>
          <span style={{ "--i": 3 }} data-text="Inspiring Hope">
            Inspiring Hope
          </span>
          <span style={{ "--i": 2 }} data-text="Serving Community">
            Serving Community
          </span>
          <span style={{ "--i": 1 }} data-text="Growing Together in Spirit">
            Growing Together in Spirit
          </span>
        </h2>

        <p>
          We are committed to nurturing spiritual growth, fostering strong
          connections, and serving the community with love and purpose.
        </p>

        <p>
          Join us every Sabbath for worship, fellowship, music, and meaningful
          spiritual enrichment that strengthens faith and builds lasting
          relationships.
        </p>

        <div className="main-buttons">
          <a href="/learn-more" className="main-btn">
            Learn More
          </a>
          <a href="/become-member" className="main-btn outline">
            Become a Member
          </a>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="main-image">
        <div className="image-box">
          <div className="image-inner">
            <img src={logo1} alt="Opened Bible" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
