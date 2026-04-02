/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["Features", "How It Works", "Pricing", "Screenshots", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
             
            <img src="../../src/assets/sss.png" alt="Vkm Logo"   style={{width:"150px"}}/>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/ /g, "-"))}
                className="text-sm font-medium text-[#0F172A]/70 hover:text-[#007BFF] transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#007BFF] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Button
              variant="ghost"
              className="text-sm font-medium text-[#0F172A]/70 hover:text-[#007BFF]"
              onClick={() => scrollTo("contact")}
            >
              Login
            </Button> */}
            <Button
              className="bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-full px-6 text-sm font-semibold shadow-lg shadow-blue-500/25"
              onClick={() => scrollTo("contact")}
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase().replace(/ /g, "-"))}
                  className="block w-full text-left text-base font-medium text-[#0F172A]/80 hover:text-[#007BFF] py-2"
                >
                  {link}
                </button>
              ))}
              <div className="pt-4 border-t space-y-3">
                <Button variant="outline" className="w-full rounded-full" onClick={() => scrollTo("contact")}>
                  Login
                </Button>
                <Button className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-full" onClick={() => scrollTo("contact")}>
                  Book Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}