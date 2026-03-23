/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Calendar, CheckCircle2, ArrowRight, 
  Phone, Mail, MapPin, Clock, Download, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import { submitAdmissionApplication } from '@/api/adminClient';

export default function Admissions() {
  const [formData, setFormData] = useState({
    student_name: '',
    date_of_birth: '',
    gender: '',
    class_applying: '',
    previous_school: '',
    father_name: '',
    mother_name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => submitAdmissionApplication(data),
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const process = [
    { step: 1, title: 'Submit Application', description: 'Fill out the online application form with required details.' },
    { step: 2, title: 'Document Verification', description: 'Submit required documents for verification.' },
    { step: 3, title: 'Entrance Assessment', description: 'Students appear for age-appropriate assessment.' },
    { step: 4, title: 'Interview', description: 'Interaction with parents and student.' },
    { step: 5, title: 'Admission Confirmation', description: 'Fee payment and admission confirmation.' },
  ];

  const classes = [
    'Nursery', 'LKG', 'UKG', 
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'Class 11', 'Class 12'
  ];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in Malhotra Public School. Our admissions team will 
            contact you within 2-3 working days.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
          >
            Submit Another Application
          </Button>
        </div>
      </motion.div>
    );
  }

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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-[#FACC15] text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              Admissions 2026-27
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Poppins']">
              Join Our School
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Begin your child's journey to excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 -mt-24 relative z-10">
            {[
              { icon: Calendar, title: 'Admission Period', value: 'March 1 - April 30, 2026' },
              { icon: Users, title: 'Age Criteria', value: 'As per CBSE Guidelines' },
              { icon: FileText, title: 'Required Documents', value: 'Birth Certificate, Photos, etc.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#FACC15] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-['Poppins']">{item.title}</h3>
                <p className="text-gray-600">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              How to Apply
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']">
              Admission <span className="text-[#1E3A8A]">Process</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-[#1E3A8A]/10 hidden lg:block" />
            
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 font-['Poppins']">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-[#FACC15]/20 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              Apply Now
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Poppins']">
              Application <span className="text-[#1E3A8A]">Form</span>
            </h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-['Poppins'] pb-4 border-b">
              Student Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label>Student Name *</Label>
                <Input
                  required
                  value={formData.student_name}
                  onChange={(e) => handleChange('student_name', e.target.value)}
                  placeholder="Full name of student"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Date of Birth *</Label>
                <Input
                  required
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange('date_of_birth', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Class Applying For *</Label>
                <Select value={formData.class_applying} onValueChange={(v) => handleChange('class_applying', v)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Previous School (if any)</Label>
                <Input
                  value={formData.previous_school}
                  onChange={(e) => handleChange('previous_school', e.target.value)}
                  placeholder="Name of previous school"
                  className="mt-2"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-6 font-['Poppins'] pb-4 border-b">
              Parent/Guardian Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label>Father's Name *</Label>
                <Input
                  required
                  value={formData.father_name}
                  onChange={(e) => handleChange('father_name', e.target.value)}
                  placeholder="Father's full name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Mother's Name</Label>
                <Input
                  value={formData.mother_name}
                  onChange={(e) => handleChange('mother_name', e.target.value)}
                  placeholder="Mother's full name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                  className="mt-2"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Complete residential address"
                  className="mt-2"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] py-6 text-lg"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? 'Submitting...' : 'Submit Application'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Phone, title: 'Call Us', value: '+91 9876543210', link: 'tel:+919876543210' },
              { icon: Mail, title: 'Email Us', value: 'admissions@mps.edu', link: 'mailto:admissions@mps.edu' },
              { icon: Clock, title: 'Office Hours', value: 'Mon-Sat: 9AM - 4PM', link: null },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-[#FACC15] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#1E3A8A]" />
                </div>
                <h3 className="font-bold text-white mb-2 font-['Poppins']">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="text-gray-300 hover:text-[#FACC15] transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-300">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}