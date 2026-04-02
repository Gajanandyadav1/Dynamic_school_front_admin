/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Route, ClipboardList, Receipt, FileText, CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

const screens = [
  {
    icon: MapPin,
    title: "GPS Check-In",
    color: "from-blue-500 to-blue-600",
    items: ["Live GPS Location", "Check-In / Check-Out", "Geo-Fencing Support", "Photo Verification"]
  },
  {
    icon: Route,
    title: "Daily Safar",
    color: "from-green-500 to-emerald-600",
    items: ["Distance Tracking", "Route Visualization", "Travel Allowance", "Auto KM Calculation"]
  },
  {
    icon: ClipboardList,
    title: "Visit Entry",
    color: "from-purple-500 to-violet-600",
    items: ["Dealer Visit Log", "Order Recording", "Payment Collection", "Visit Photos"]
  },
  {
    icon: Receipt,
    title: "Claims",
    color: "from-amber-500 to-orange-600",
    items: ["Submit Expenses", "Upload Receipts", "Approval Status", "Reimbursement Tracking"]
  },
  {
    icon: FileText,
    title: "Salary Slip",
    color: "from-cyan-500 to-teal-600",
    items: ["Monthly Breakdown", "Download PDF", "Tax Details", "Bonus & Deductions"]
  },
  {
    icon: CalendarCheck,
    title: "Leave Apply",
    color: "from-rose-500 to-pink-600",
    items: ["Apply Leave", "Leave Balance", "Approval Status", "Leave History"]
  }
];

export default function MobileAppPreview() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % screens.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const screen = screens[current];

  return (
    <section id="screenshots" className="py-24 bg-gradient-to-br from-[#0F172A] to-[#1e293b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#00C896] bg-[#00C896]/10 rounded-full px-4 py-1.5 mb-4">
            Mobile App
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Powerful Mobile Experience
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Your workforce management toolkit, right in your pocket.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Phone Mockup */}
          <div className="relative flex-shrink-0">
            <div className="relative w-[280px] h-[560px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50 border border-gray-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-2xl z-10" />
              <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-8 pb-2">
                      <span className="text-xs text-gray-400">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                        <div className="w-3 h-2 bg-gray-300 rounded-sm" />
                      </div>
                    </div>
                    {/* Screen header */}
                    <div className={`mx-4 p-4 rounded-2xl bg-gradient-to-r ${screen.color} mt-2`}>
                      <div className="flex items-center gap-3 text-white">
                        <screen.icon className="w-8 h-8" />
                        <div>
                          <p className="text-xs opacity-80">WorkTrack 360</p>
                          <p className="text-lg font-bold">{screen.title}</p>
                        </div>
                      </div>
                    </div>
                    {/* Items */}
                    <div className="flex-1 p-4 space-y-3">
                      {screen.items.map((item, idx) => (
                        <motion.div
                          key={item}
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + idx * 0.08 }}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${screen.color} bg-opacity-10 flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    {/* Bottom nav mockup */}
                    <div className="flex items-center justify-around py-3 border-t border-gray-100 px-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className={`w-6 h-1 rounded-full ${n === 1 ? "bg-blue-500" : "bg-gray-200"}`} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Screen selector */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {screens.map((s, i) => (
                <motion.button
                  key={s.title}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrent(i)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                    i === current
                      ? "bg-white/10 border border-white/20 shadow-lg"
                      : "bg-white/5 border border-transparent hover:bg-white/10"
                  }`}
                >
                  <s.icon className={`w-6 h-6 mb-2 ${i === current ? "text-[#00C896]" : "text-white/40"}`} />
                  <p className={`text-sm font-semibold ${i === current ? "text-white" : "text-white/50"}`}>
                    {s.title}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setCurrent((c) => (c - 1 + screens.length) % screens.length)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex gap-2">
                {screens.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[#00C896]" : "w-2 bg-white/20"}`} />
                ))}
              </div>
              <button
                onClick={() => setCurrent((c) => (c + 1) % screens.length)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}