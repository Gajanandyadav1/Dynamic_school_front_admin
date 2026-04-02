/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, MapPin, Users, DollarSign, BarChart3, Clock, TrendingUp } from "lucide-react";

function FloatingCard({ icon: Icon, label, value, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`absolute bg-white rounded-2xl shadow-2xl shadow-black/10 p-4 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007BFF]/10 to-[#00C896]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#007BFF]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-bold text-[#0F172A]">{value}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50/50 pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#007BFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00C896]/5 rounded-full blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-20 w-64 h-64 border border-[#007BFF]/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-20 w-48 h-48 border border-[#00C896]/10 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#007BFF]/5 border border-[#007BFF]/10 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
              <span className="text-sm font-medium text-[#007BFF]">Workforce Management Reimagined</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight"
            >
              Track Employees.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00C896]">
                Automate Payroll.
              </span>{" "}
              Grow Your Business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-[#0F172A]/60 max-w-xl leading-relaxed"
            >
              WorkTrack 360 helps businesses manage employee attendance, track field staff locations, automate payroll, and improve workforce productivity — all from one powerful platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-full px-8 text-base font-semibold shadow-xl shadow-blue-500/30 h-14"
                onClick={() => scrollTo("contact")}
              >
                Book Live Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base font-semibold border-2 border-[#0F172A]/15 hover:border-[#007BFF] hover:text-[#007BFF] h-14"
                onClick={() => scrollTo("pricing")}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Free Trial
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${
                    ["bg-blue-400", "bg-green-400", "bg-purple-400", "bg-orange-400"][i - 1]
                  } flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">500+ Businesses Trust Us</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-400 ml-2">WorkTrack 360 Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Active Staff", val: "247", color: "from-blue-500 to-blue-600" },
                    { label: "On Field", val: "89", color: "from-green-500 to-emerald-600" },
                    { label: "Attendance", val: "96%", color: "from-purple-500 to-violet-600" },
                  ].map((item) => (
                    <div key={item.label} className={`bg-gradient-to-br ${item.color} rounded-xl p-3 text-white`}>
                      <p className="text-xs opacity-80">{item.label}</p>
                      <p className="text-xl font-bold">{item.val}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Payroll Summary</span>
                    <span className="text-xs text-[#00C896] font-medium">+12% ↑</span>
                  </div>
                  <div className="flex gap-1 items-end h-20">
                    {[40, 65, 45, 80, 60, 90, 70, 85, 55, 75, 95, 60].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-[#007BFF] to-[#007BFF]/40 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <FloatingCard icon={MapPin} label="GPS Tracking" value="Live" className="-left-12 top-8 z-10" delay={0.8} />
              <FloatingCard icon={DollarSign} label="Payroll" value="₹2.4L" className="-right-8 top-20 z-10" delay={1.0} />
              <FloatingCard icon={Clock} label="Check-Ins" value="189 today" className="-left-8 bottom-12 z-10" delay={1.2} />
              <FloatingCard icon={TrendingUp} label="Productivity" value="+23%" className="-right-12 bottom-24 z-10" delay={1.4} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}