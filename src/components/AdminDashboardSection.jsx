/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, DollarSign, Receipt, CalendarCheck, MapPin } from "lucide-react";


const modules = [
  { icon: Users, title: "Employee Management", color: "bg-blue-500" },
  { icon: Clock, title: "Attendance Monitoring", color: "bg-green-500" },
  { icon: DollarSign, title: "Payroll Management", color: "bg-purple-500" },
  { icon: Receipt, title: "Expense Claims", color: "bg-amber-500" },
  { icon: CalendarCheck, title: "Leave Management", color: "bg-rose-500" },
  { icon: MapPin, title: "Location Tracking", color: "bg-cyan-500" }
];

export default function AdminDashboardSection() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007BFF] bg-[#007BFF]/5 rounded-full px-4 py-1.5 mb-4">
            Admin Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Complete Control at Your Fingertips
          </h2>
          <p className="text-lg text-[#0F172A]/50 max-w-2xl mx-auto">
            A powerful admin panel to manage every aspect of your workforce operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/8 p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs text-gray-400 ml-3">admin.worktrack360.com</span>
              </div>

              <div className="flex gap-4 mb-5">
                <div className="w-48 bg-gray-50 rounded-xl p-4 space-y-3 hidden sm:block">
                  {["Dashboard", "Employees", "Attendance", "Payroll", "Reports"].map((item, i) => (
                    <div key={item} className={`text-xs font-medium px-3 py-2 rounded-lg ${i === 0 ? "bg-[#007BFF] text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Total Employees", value: "247", change: "+12" },
                      { label: "Present Today", value: "231", change: "+5" },
                      { label: "On Leave", value: "16", change: "-3" },
                      { label: "On Field", value: "89", change: "+8" }
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 rounded-xl p-3"
                      >
                        <p className="text-[10px] text-gray-400">{stat.label}</p>
                        <div className="flex items-end gap-1">
                          <span className="text-lg font-bold text-[#0F172A]">{stat.value}</span>
                          <span className="text-[10px] text-[#00C896] font-medium mb-0.5">{stat.change}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-400 mb-2">Weekly Attendance Overview</p>
                    <div className="flex items-end gap-1 h-16">
                      {[85, 92, 88, 95, 90, 78, 45].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className={`flex-1 rounded-t ${i < 5 ? "bg-[#007BFF]" : "bg-[#007BFF]/30"}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span key={i} className="text-[8px] text-gray-400 flex-1 text-center">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{ y: { duration: 3, repeat: Infinity } }}
              className="absolute -right-4 top-8 bg-white rounded-xl shadow-xl p-3 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Payroll Processed</p>
                  <p className="text-xs font-bold text-[#0F172A]">₹24.5 Lakh</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Module Cards */}
          <div className="grid grid-cols-2 gap-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg hover:border-[#007BFF]/10 transition-all cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${mod.color} flex items-center justify-center mb-3`}>
                  <mod.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">{mod.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}