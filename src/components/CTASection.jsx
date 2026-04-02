/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF] via-[#0056b3] to-[#003d80]" />
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00C896]/10 rounded-full blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-48 h-48 border border-white/10 rounded-full"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Start Managing Your Workforce{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-emerald-300">
              Smarter
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Try WorkTrack 360 and simplify employee tracking, payroll management, and workforce operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-[#007BFF] hover:bg-white/90 rounded-full px-8 text-base font-semibold shadow-xl h-14"
              onClick={() => scrollTo("contact")}
            >
              Book Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 text-base font-semibold h-14 bg-transparent"
              onClick={() => scrollTo("contact")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}