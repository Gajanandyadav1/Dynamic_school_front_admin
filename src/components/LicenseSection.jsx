/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const includes = [
  "Software Deployment",
  "Mobile App Setup (Android + iOS)",
  "Admin Training & Onboarding",
  "24/7 Technical Support",
  "All Core Features Included",
  "Source Code Access"
];

const additional = [
  "Google Maps API usage charges",
  "Server or cloud hosting charges",
  "Annual maintenance: 10% of license fee"
];

export default function LicenseSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#0F172A] to-[#1e293b] rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#007BFF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00C896]/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
                <Shield className="w-4 h-4 text-[#00C896]" />
                <span className="text-sm font-medium text-white/80">Lifetime License</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                One-Time License Option
              </h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-emerald-300">
                  ₹59,999
                </span>
                <span className="text-white/50 text-lg">one-time</span>
              </div>
              <p className="text-white/50 mb-8 leading-relaxed">
                Own the platform forever. Deploy on your own servers with complete control over your data and infrastructure.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00C896] to-emerald-400 text-white rounded-full px-8 font-semibold shadow-xl shadow-green-500/20 hover:shadow-green-500/30"
                onClick={() => scrollTo("contact")}
              >
                Get Lifetime License
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#00C896]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#00C896]" />
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Additional Charges</h4>
                <ul className="space-y-2">
                  {additional.map((item) => (
                    <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}