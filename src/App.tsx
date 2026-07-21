import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import ServicesStrip from './sections/ServicesStrip';
import WhoWeAre from './sections/WhoWeAre';
import WhyChoose from './sections/WhyChoose';
import TrustBar from './sections/TrustBar';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      <Hero />
      <ServicesStrip />
      <WhoWeAre />
      <WhyChoose />
      <TrustBar />
      <Footer />
    </div>
  );
}

