import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PricingSection from "./components/PricingSection";
import ContactSection from "./components/ContactSection";
import BenefitsSection from "./components/BenefitsSection";
import CTASection from "./components/CTASection";
import TrustSection from "./components/TrustSection";
import LicenseSection from "./components/LicenseSection";
import HowItWorksSection from "./components/HowItWorksSection"; 
import MobileAppPreview from "./components/MobileAppPreview";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
// Import all components
 

function App() {
  return (
    <Router> 
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/features" element={<FeaturesSection />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/pricing" element={<PricingSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/benefits" element={<BenefitsSection />} />
        <Route path="/cta" element={<CTASection />} />
        <Route path="/trust" element={<TrustSection/>} />
        <Route path="/license" element={<LicenseSection />} />
        <Route path="/how-it-works" element={<HowItWorksSection />} />
        <Route path="/mobile-preview" element={<MobileAppPreview/>} />
      </Routes>
 
    </Router>
  );
}

export default App;