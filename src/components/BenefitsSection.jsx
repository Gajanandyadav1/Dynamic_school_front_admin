/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Zap, TrendingUp, Building2 } from "lucide-react";



const benefits = [
  { icon: ShieldCheck, title: "Reduce Fake Attendance", desc: "GPS verification ensures only genuine check-ins from actual work locations." },
  { icon: MapPin, title: "Track Field Employees Efficiently", desc: "Real-time location monitoring with route history and distance calculations." },
  { icon: Zap, title: "Automate Payroll Calculations", desc: "Zero manual work — salary generation with all components calculated automatically." },
  { icon: TrendingUp, title: "Increase Workforce Productivity", desc: "Data-driven insights to optimize team performance and resource allocation." },
  { icon: Building2, title: "Centralize HR & Payroll", desc: "One platform for attendance, payroll, claims, leave, and employee management." }
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#00C896] bg-[#00C896]/5 rounded-full px-4 py-1.5 mb-4">
            Business Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Why Businesses Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00C896]">
              WorkTrack 360
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#007BFF]/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all ${
                i === 4 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007BFF]/10 to-[#00C896]/10 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-[#007BFF]" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{b.title}</h3>
              <p className="text-sm text-[#0F172A]/50 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}