import { useState, useEffect } from "react";
import "./Home.css";
import YouTubeLive from "../youtube/YoutubeLive";

import image1 from "../../assets/images/image1.jpeg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpeg";
import image7 from "../../assets/images/image7.jpeg";
import image8 from "../../assets/images/image8.jpeg";
import image8 from "../../assets/images/image9.jpeg";
import image8 from "../../assets/images/image10.jpeg";

const images = [
  image8, image7, image9, image10, image2, image3, image4, image6,
  image1, image2, image3, image4, image5,
  image1, image2, image8, image7, image10,
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-wrapper">
      <div className="live-container">
        <YouTubeLive />
      </div>

      <div className="home-container">
        <button className="arrow left-arrow" onClick={prevImage}>❮</button>

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="slider"
            className={`slider-image ${index === current ? "active" : ""}`}
          />
        ))}

        <div className="overlay"></div>

        <button className="arrow right-arrow" onClick={nextImage}>❯</button>

        <div className="dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active-dot" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;