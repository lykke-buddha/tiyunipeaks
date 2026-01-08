import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Amenities } from './components/sections/Amenities';
import { PlotSection } from './components/sections/PlotSection';
import { Footer } from './components/sections/Footer';
import { Inquiries } from './components/sections/Inquiries';
import { Testimonial } from './components/sections/Testimonial';
import { CTA } from './components/sections/CTA';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Amenities />
        <PlotSection />
        <Inquiries />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#9CA3AF] topographic-bg antialiased selection:bg-orange-500 selection:text-white font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
