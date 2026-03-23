/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Target, Eye, Award, Users, BookOpen, 
  GraduationCap, Calendar, Star, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
// import { createPageUrl } from '@/utils';

export default function About() {
  const values = [
    { icon: Star, title: 'Excellence', description: 'Striving for the highest standards in education and character development.' },
    { icon: Users, title: 'Integrity', description: 'Building trust through honesty, transparency, and ethical conduct.' },
    { icon: BookOpen, title: 'Innovation', description: 'Embracing new ideas and methods to enhance learning experiences.' },
    { icon: Award, title: 'Respect', description: 'Fostering mutual respect among students, teachers, and parents.' },
  ];

  const milestones = [
    { year: '2008', title: 'School Founded', description: 'Malhotra Public School established with a vision for quality education.' },
    { year: '2012', title: 'CBSE Affiliation', description: 'Received official CBSE affiliation for academic programs.' },
    { year: '2015', title: 'New Campus', description: 'Expanded to a modern campus with state-of-the-art facilities.' },
    { year: '2018', title: 'Smart Classrooms', description: 'Introduced digital learning with smart classroom technology.' },
    { year: '2022', title: 'Excellence Award', description: 'Recognized as Best School in Kotputli region.' },
    { year: '2026', title: 'Continuing Growth', description: 'Expanding programs and facilities for future generations.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] bg-[#1E3A8A] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-[#FACC15] text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Poppins']">
              Our Story
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Nurturing minds and shaping futures since 2008
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Welcome to <span className="text-[#1E3A8A]">Malhotra Public School</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Malhotra Public School is committed to academic excellence and character 
                development since 2008. We provide modern education with traditional values,
                preparing students for the challenges of tomorrow while instilling strong 
                moral foundations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our holistic approach to education ensures that every child receives 
                personalized attention, enabling them to discover and nurture their unique 
                talents and abilities. With experienced faculty, modern infrastructure, and 
                a nurturing environment, we are dedicated to bringing out the best in every student.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Located in the heart of Kotputli, Rajasthan, our school serves as a beacon 
                of quality education in the region, combining the best of modern pedagogy 
                with time-tested values.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1E3A8A]">850+</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1E3A8A]">25+</p>
                    <p className="text-sm text-gray-500">Teachers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1E3A8A]">18</p>
                    <p className="text-sm text-gray-500">Years</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
                alt="Students Learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#FACC15]/20 rounded-2xl -z-10" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#1E3A8A]/10 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#1E3A8A]"
            >
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#FACC15]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To nurture responsible and innovative citizens who will contribute positively 
                to society. We aim to provide a comprehensive education that develops intellectual 
                curiosity, moral character, and social responsibility in our students.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#FACC15]"
            >
              <div className="w-16 h-16 bg-[#FACC15] rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Rajasthan's leading educational institution, recognized for academic 
                excellence, innovative teaching methods, and producing well-rounded individuals 
                who are prepared to meet the challenges of the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']">
              Core <span className="text-[#1E3A8A]">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-20 h-20 bg-[#FACC15]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins']">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#FACC15]/20 text-[#FACC15] text-sm font-semibold rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins']">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#FACC15]/30 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <span className="text-[#FACC15] font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-white mt-2 font-['Poppins']">{milestone.title}</h3>
                      <p className="text-gray-300 mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#FACC15] rounded-full flex-shrink-0 hidden lg:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FACC15]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6 font-['Poppins']">
            Ready to Join Our Family?
          </h2>
          <p className="text-[#1E3A8A]/80 text-lg mb-8">
            Take the first step towards a bright future for your child
          </p>
          <Link
            to={'/Admissions'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-semibold rounded-full hover:bg-[#1E40AF] transition-all hover:shadow-xl group"
          >
            Start Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}