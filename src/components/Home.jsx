import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import TrustSection from "./TrustSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import MobileAppPreview from "./MobileAppPreview";
import AdminDashboardSection from "./AdminDashboardSection";
import BenefitsSection from "./BenefitsSection";
import PricingSection from "./PricingSection";
import LicenseSection from "./LicenseSection";
import CTASection from "./CTASection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
 

export default function Home() {
  return (
    <div className="font-sans antialiased text-[#0F172A]" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MobileAppPreview />
      <AdminDashboardSection />
      <BenefitsSection />
      <PricingSection />
      <LicenseSection />
      <CTASection />
      <ContactSection />
      <Footer />


      <a
  href="https://wa.me/917410946111"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-15 right-10 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <path d="M20.52 3.48A11.82 11.82 0 0012.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.63a11.86 11.86 0 005.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.18-1.24-6.17-3.47-8.44zM12.06 21.5c-1.8 0-3.56-.48-5.1-1.39l-.36-.21-3.7.97.99-3.6-.23-.37a9.4 9.4 0 01-1.45-5.03c0-5.19 4.22-9.41 9.41-9.41 2.51 0 4.86.98 6.63 2.75a9.3 9.3 0 012.75 6.63c0 5.19-4.22 9.41-9.41 9.41zm5.17-7.02c-.28-.14-1.65-.82-1.9-.91-.26-.09-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.17-.43-2.23-1.36-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48-.17-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.83 1.18 3.03.14.19 2.02 3.09 4.89 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33z" />
  </svg>
</a>
    </div>
  );
}