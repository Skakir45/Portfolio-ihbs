import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';

import LuxuryServices from './components/LuxuryServices';
import WhoWeAre from './sections/WhoWeAre';
import WhyChoose from './sections/WhyChoose';
import TrustBar from './sections/TrustBar';
import Footer from './sections/Footer';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import WPSPopup from './components/WPSPopup';

function HomePage() {
  const [showWPS, setShowWPS] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWPS(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero />
      <LuxuryServices />
      <WhoWeAre />
      <WhyChoose />
      <TrustBar />
      <WPSPopup isOpen={showWPS} onClose={() => setShowWPS(false)} />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
