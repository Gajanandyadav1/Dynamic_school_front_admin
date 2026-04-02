/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₹3,000",
    period: "/ month",
    employees: "Up to 10 employees",
    features: [
      "GPS Attendance Tracking",
      "Live Location Monitoring",
      "Payroll Automation",
      "Expense Claims",
      "Leave Management System",
      "Email Support"
    ],
    highlight: false
  },
  {
    name: "Growth",
    price: "₹5,000",
    period: "/ month",
    employees: "11 – 20 employees",
    features: [
      "Everything in Starter",
      "Advanced Attendance Analytics",
      "Travel Distance Tracking",
      "Visit & Payment Tracking",
      "Salary Slip Generation",
      "Priority Support"
    ],
    highlight: false
  },
  {
    name: "Business",
    price: "₹10,000",
    period: "/ month",
    employees: "21 – 50 employees",
    features: [
      "Everything in Growth",
      "Full HRMS Features",
      "Advanced Payroll Automation",
      "Custom Reports & Analytics",
      "Admin Dashboard",
      "Dedicated Account Manager"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "₹10,000",
    period: "/ month (first 50)",
    employees: "+ ₹149/employee/month after 50",
    features: [
      "Everything in Business",
      "Unlimited Employees",
      "Custom Integrations",
      "API Access",
      "On-Premise Deployment Option",
      "24/7 Priority Support"
    ],
    highlight: false
  }
];

export default function PricingSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007BFF] bg-[#007BFF]/5 rounded-full px-4 py-1.5 mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[#0F172A]/50 max-w-xl mx-auto">
            Choose the plan that fits your team size and requirements.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-br from-[#007BFF] to-[#0056b3] text-white shadow-2xl shadow-blue-500/30 scale-[1.02] lg:scale-105"
                  : "bg-white border border-gray-100 hover:shadow-xl hover:border-[#007BFF]/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#00C896] to-emerald-400 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? "text-white" : "text-[#0F172A]"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-extrabold ${plan.highlight ? "text-white" : "text-[#0F172A]"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-white/70" : "text-gray-400"}`}>
                  {plan.employees}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[#00C896]" : "text-[#00C896]"}`} />
                    <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-gray-600"}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-semibold ${
                  plan.highlight
                    ? "bg-white text-[#007BFF] hover:bg-white/90"
                    : "bg-[#007BFF]/5 text-[#007BFF] hover:bg-[#007BFF] hover:text-white border border-[#007BFF]/20"
                }`}
                onClick={() => scrollTo("contact")}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}