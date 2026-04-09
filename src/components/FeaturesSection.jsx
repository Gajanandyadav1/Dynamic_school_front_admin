/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {  MapPin, Navigation, Route, DollarSign, ClipboardList,
  Receipt, CalendarCheck, FileText, LayoutDashboard
} from "lucide-react";

const features = [
  {
    s
    icon: MapPin,
    title: "GPS Attendance Tracking",
    desc: "Employees check in and check out using GPS-enabled mobile attendance.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Navigation,
    title: "Live Employee Location Tracking",
    desc: "Monitor field employees in real time with a map-based tracking system.",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50"
  },
  {
    icon: Route,
    title: "Travel Distance Calculation",
    desc: "Automatically calculate kilometres travelled by employees during work hours.",
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50"
  },
  {
    icon: DollarSign,
    title: "Payroll Automation",
    desc: "Generate payroll automatically using attendance, travel allowance, claims, bonuses, and deductions.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50"
  },
  {
    icon: ClipboardList,
    title: "Visit and Payment Tracking",
    desc: "Employees can log dealer visits, orders, and payment collections from the mobile app.",
    color: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50"
  },
  {
    icon: Receipt,
    title: "Expense Claim Management",
    desc: "Employees can submit expenses with receipts and managers can approve or reject claims.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50"
  },
  {
    icon: CalendarCheck,
    title: "Leave Management",
    desc: "Employees can apply for leave and track approval status.",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50"
  },
  {
    icon: FileText,
    title: "Salary Slip Generation",
    desc: "Employees can view and download professional salary slips directly from the mobile app.",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50"
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    desc: "Administrators can monitor employee attendance, payroll, claims, and performance analytics from one dashboard.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007BFF] bg-[#007BFF]/5 rounded-full px-4 py-1.5 mb-4">
            Core Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Everything You Need to Manage{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00C896]">
              Your Workforce
            </span>
          </h2>
          <p className="text-lg text-[#0F172A]/50 max-w-2xl mx-auto">
            A comprehensive platform packed with powerful tools designed to streamline your HR operations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#007BFF]/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: feature.color.includes("blue") ? "#3b82f6" : feature.color.includes("green") ? "#10b981" : feature.color.includes("purple") ? "#8b5cf6" : feature.color.includes("amber") ? "#f59e0b" : feature.color.includes("cyan") ? "#06b6d4" : feature.color.includes("rose") ? "#f43f5e" : feature.color.includes("indigo") ? "#6366f1" : feature.color.includes("emerald") ? "#10b981" : "#7c3aed" }} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#007BFF] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-[#0F172A]/50 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}