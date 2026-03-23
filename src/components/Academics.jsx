import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  Palette,
  Dumbbell,
  FlaskConical,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Music,
} from "lucide-react";
import { listAcademicPrograms } from "@/api/adminClient"; // adjust path

export default function Academics() {
  const [programs, setPrograms] = useState([]);

  const icons = [BookOpen, Lightbulb, GraduationCap];

  // ✅ API CALL
  useEffect(() => {
  const fetchPrograms = async () => {
    try {
      const data = await listAcademicPrograms();
      console.log("PROGRAM API 👉", data);
      setPrograms(data);
    } catch (err) {
      console.log("ERROR 👉", err);
    }
  };

  fetchPrograms();
}, []);

  const facilities = [
    {
      icon: FlaskConical,
      title: "Science Labs",
      description: "Well-equipped Physics, Chemistry, and Biology labs",
    },
    {
      icon: Monitor,
      title: "Computer Lab",
      description: "Modern computers with internet connectivity",
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Extensive collection of books and periodicals",
    },
    {
      icon: Dumbbell,
      title: "Sports Complex",
      description: "Indoor and outdoor sports facilities",
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Dedicated space for music education",
    },
    {
      icon: Palette,
      title: "Art Studio",
      description: "Creative space for visual arts",
    },
  ];

  const curriculum = [
    { subject: "Languages", details: "English, Hindi, Sanskrit" },
    {
      subject: "Mathematics",
      details: "NCERT curriculum with additional practice",
    },
    {
      subject: "Science",
      details: "Physics, Chemistry, Biology with practical sessions",
    },
    {
      subject: "Social Studies",
      details: "History, Geography, Civics, Economics",
    },
    { subject: "Computer Science", details: "Programming, Digital literacy" },
    {
      subject: "Physical Education",
      details: "Sports, Yoga, Health education",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Academic Programs
          </h2>

          {programs.length === 0 && (
            <p className="text-center">No programs found</p>
          )}

          {programs.map((program, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div key={program._id} className="mb-10 flex gap-6 items-center">
                <Icon className="w-10 h-10 text-blue-800" />

                <div>
                  <h3 className="text-xl font-bold">{program.title}</h3>

                  <p className="text-sm text-gray-600 mb-1">{program.grades}</p>

                  <p>{program.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
