/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "Demo", id: "contact" },
  { label: "Contact", id: "contact" }
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
            <img src="../../Logo.jpeg" alt="Vkm Logo"   style={{width:"150px", borderRadius:'15px'}}/>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Smart Employee Tracking and Payroll Automation Platform
            </p>
            <p className="text-white/30 text-xs">
              By <span className="text-white/50 font-medium">Malhotra IT Innovations</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/40 hover:text-[#007BFF] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              {["X", "in", "f", "ig"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#007BFF]/20 hover:text-[#007BFF] text-white/40 transition-all cursor-pointer"
                >
                  <span className="text-xs font-bold">{icon}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/30">
              info@malhotraitinnovations.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            ©️ {new Date().getFullYear()} WorkTrack 360. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}