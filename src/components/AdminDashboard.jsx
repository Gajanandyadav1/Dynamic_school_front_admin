/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Image, Bell, FileText, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Eye, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { listAdmissions, listNotices, listGalleries, listPages } from '@/api/adminClient';

export default function AdminDashboard() {
  const { data: admissions = [] } = useQuery({
    queryKey: ['admissions'],
    queryFn: () => listAdmissions(),
  });

  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: () => listNotices(),
  });

  const { data: images = [] } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => listGalleries(),
  });

  const { data: pages = [] } = useQuery({
    queryKey: ['pages'],
    queryFn: () => listPages(),
  });

  const stats = [
    { 
      title: 'Total Applications', 
      value: admissions.length, 
      icon: Users, 
      change: '+12%',
      positive: true,
      color: 'bg-blue-500'
    },
    { 
      title: 'Gallery Images', 
      value: images.length, 
      icon: Image, 
      change: '+5%',
      positive: true,
      color: 'bg-green-500'
    },
    { 
      title: 'Active Notices', 
      value: notices.length, 
      icon: Bell, 
      change: '+2',
      positive: true,
      color: 'bg-yellow-500'
    },
    { 
      title: 'Total Pages', 
      value: pages.length, 
      icon: FileText, 
      change: '0',
      positive: true,
      color: 'bg-purple-500'
    },
  ];

  const recentApplications = admissions.slice(0, 5);
  const recentNotices = notices.slice(0, 5);

  const pendingCount = admissions.filter(a => a.status === 'pending').length;

  return (
    <div title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.positive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Applications Alert */}
        {pendingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-orange-100">Pending Review</p>
                <h3 className="text-3xl font-bold">{pendingCount} Applications</h3>
              </div>
            </div>
            <Link
              to={'/AdminAdmissions'}
              className="mt-4 inline-flex items-center gap-2 text-white hover:underline"
            >
              Review Now
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${pendingCount > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-xl p-6 shadow-sm border border-gray-100`}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Banner', page: 'AdminBanners', icon: Image },
              { label: 'Add Notice', page: 'AdminNotices', icon: Bell },
              { label: 'Upload Images', page: 'AdminGallery', icon: Image },
              { label: 'Edit Home', page: 'AdminHomePage', icon: FileText },
            ].map((action, index) => (
              <Link
                key={index}
                to={`/${action.page}`}
                className="p-4 bg-gray-50 rounded-xl hover:bg-[#1E3A8A] hover:text-white transition-all group text-center"
              >
                <action.icon className="w-6 h-6 mx-auto mb-2 text-[#1E3A8A] group-hover:text-white" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Data */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
            <Link
              to={'/AdminAdmissions'}
              className="text-sm text-[#1E3A8A] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {recentApplications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No applications yet</p>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold">
                        {app.student_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.student_name}</p>
                        <p className="text-sm text-gray-500">{app.class_applying}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.status || 'pending'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Notices</h3>
            <Link
              to={'/AdminNotices'}
              className="text-sm text-[#1E3A8A] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {recentNotices.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No notices yet</p>
            ) : (
              <div className="space-y-4">
                {recentNotices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#FACC15] rounded-lg flex flex-col items-center justify-center text-[#1E3A8A]">
                      <span className="text-lg font-bold leading-none">
                        {format(new Date(notice.date), 'd')}
                      </span>
                      <span className="text-xs">
                        {format(new Date(notice.date), 'MMM')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 line-clamp-1">{notice.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{notice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}