/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Smartphone, MapPin, Monitor, FileBarChart } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Check In",
    desc: "Employee checks in from the mobile app using GPS.",
    num: "01"
  },
  {
    icon: MapPin,
    title: "Track Activity",
    desc: "The system tracks employee location and work activity throughout the day.",
    num: "02"
  },
  {
    icon: Monitor,
    title: "Monitor Dashboard",
    desc: "Managers monitor attendance and travel distance from the admin dashboard.",
    num: "03"
  },
  {
    icon: FileBarChart,
    title: "Auto Reports",
    desc: "Payroll and reports are generated automatically at the end of each cycle.",
    num: "04"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#00C896] bg-[#00C896]/5 rounded-full px-4 py-1.5 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Simple 4-Step Process
          </h2>
          <p className="text-lg text-[#0F172A]/50 max-w-xl mx-auto">
            Get started in minutes. WorkTrack 360 automates the heavy lifting.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#007BFF]/20 via-[#00C896]/20 to-[#007BFF]/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-[#00C896]/5 rounded-full" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute inset-3 bg-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <step.icon className="w-8 h-8 text-[#007BFF]" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#007BFF] to-[#00C896] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{step.num}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
              <p className="text-sm text-[#0F172A]/50">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}