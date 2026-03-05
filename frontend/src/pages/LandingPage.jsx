//import React from "react";
import Navbar from "../../../frontend/src/components/navbar/Navbar";
import Home from "../../../frontend/src/components/home/Home";
import Main from "../../../frontend/src/components/main/Main";
import Sermons from "../../../frontend/src/components/sermons/Sermons";
import Footer from "../../src/components/footer/Footer";
import Contact from "../../src/components/contact/Contact";
import PrayerRequest from "../../src/components/prayerRequest/PrayerRequest";
import Hero1 from "../components/hero1/Hero1";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Home />
      <Main />
      <Hero1 />
      <PrayerRequest />
      <Contact />
      <Sermons />
      <Footer />
    </div>
  );
}

export default LandingPage;
