/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const logos = [
  "TechCorp", "BuildRight", "FastTrack", "GreenLeaf", "DataFlow",
  "CloudSync", "InnoVate", "ProServe"
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-[#0F172A]/40 uppercase tracking-widest mb-10"
        >
          Trusted by growing businesses and field teams
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500">{name[0]}</span>
                </div>
                <span className="text-base font-semibold text-gray-400 hidden sm:block">{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}