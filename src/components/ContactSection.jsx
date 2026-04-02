/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    teamSize: "",
    message: "",
  });

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://api.malhotrait.in/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);

        setFormData({
          fullName: "",
          company: "",
          email: "",
          phone: "",
          teamSize: "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007BFF] bg-[#007BFF]/5 rounded-full px-4 py-1.5 mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-4">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-lg text-[#0F172A]/50 max-w-xl mx-auto">
            Book a free demo or contact our team to learn how WorkTrack 360 can help your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "gsmalhotra@malhotrait.in" },
              { icon: Phone, label: "Phone", value: "+91 7410946111" },
              { icon: MapPin, label: "Location", value: "India" }
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-[#007BFF]/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#007BFF]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#007BFF]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-[#0F172A]">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-black/5 space-y-5"
            >

              {/* Name + Company */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="rounded-xl h-12"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="rounded-xl h-12"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Team Size */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Team Size</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full rounded-xl h-12 px-3 border border-gray-200"
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1 – 10 employees</option>

                  <option value="11-20">11 – 20 employees</option>
                  <option value="21-50">21 – 50 employees</option>
                  <option value="50+">50+ employees</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  className="rounded-xl min-h-[100px]"
                />
              </div>

              {/* Success Message */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#00C896]/10 border border-[#00C896]/20 rounded-xl p-4 text-center"
                >
                  <p className="text-[#00C896] font-semibold">
                    Thank you! We'll be in touch shortly.
                  </p>
                </motion.div>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3] rounded-full font-semibold h-14 text-base shadow-lg shadow-blue-500/25"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Loading..." : "Book Free Demo"}
                </Button>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}