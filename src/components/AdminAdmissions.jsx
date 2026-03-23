import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Search, Filter, Download, Eye, Phone, Mail, 
  CheckCircle, XCircle, Clock, User, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  listAdmissions,
  updateAdmissionContactStatus,
} from '@/api/adminClient';

export default function AdminAdmissions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['admissions'],
    queryFn: () => listAdmissions(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateAdmissionContactStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admissions'] });
    },
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone?.includes(searchQuery) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    contacted: applications.filter(a => a.status === 'contacted').length,
    enrolled: applications.filter(a => a.status === 'enrolled').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const updateStatus = (id, status) => {
    updateMutation.mutate({ id, status });
    setSelectedApplication(prev => prev?.id === id ? { ...prev, status } : prev);
  };

  const exportToCSV = () => {
    const headers = ['Student Name', 'Class', 'Father Name', 'Phone', 'Email', 'Status', 'Date'];
    const rows = applications.map(app => [
      app.student_name,
      app.class_applying,
      app.father_name,
      app.phone,
      app.email,
      app.status || 'pending',
      format(new Date(app.created_date), 'yyyy-MM-dd'),
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admissions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    enrolled: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    pending: Clock,
    contacted: Phone,
    enrolled: CheckCircle,
    rejected: XCircle,
  };

  return (
    <div title="Admission Applications">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'bg-gray-100 text-gray-700' },
          { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Contacted', value: stats.contacted, color: 'bg-blue-100 text-blue-700' },
          { label: 'Enrolled', value: stats.enrolled, color: 'bg-green-100 text-green-700' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-100 text-red-700' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color.replace('bg-', 'text-').replace('-100', '-600')}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-600">Student</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Class</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Contact</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredApplications.map((app) => {
                  const StatusIcon = statusIcons[app.status || 'pending'];
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold">
                            {app.student_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.student_name}</p>
                            <p className="text-sm text-gray-500">{app.father_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{app.class_applying}</td>
                      <td className="p-4">
                        <div className="text-sm">
                          <a href={`tel:${app.phone}`} className="text-gray-700 hover:text-[#1E3A8A] flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {app.phone}
                          </a>
                          {app.email && (
                            <a href={`mailto:${app.email}`} className="text-gray-500 hover:text-[#1E3A8A] flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3" /> {app.email}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={statusColors[app.status || 'pending']}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {app.status || 'pending'}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {format(new Date(app.created_date), 'MMM d, yyyy')}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedApplication(app)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Status Actions */}
              <div className="flex gap-2 flex-wrap">
                {['pending', 'contacted', 'enrolled', 'rejected'].map((status) => (
                  <Button
                    key={status}
                    variant={selectedApplication.status === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateStatus(selectedApplication.id, status)}
                    className={selectedApplication.status === status ? 'bg-[#1E3A8A]' : ''}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Student Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Student Name</p>
                    <p className="font-medium">{selectedApplication.student_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {selectedApplication.date_of_birth 
                        ? format(new Date(selectedApplication.date_of_birth), 'MMM d, yyyy')
                        : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{selectedApplication.gender || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class Applying For</p>
                    <p className="font-medium">{selectedApplication.class_applying}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Previous School</p>
                    <p className="font-medium">{selectedApplication.previous_school || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Father's Name</p>
                    <p className="font-medium">{selectedApplication.father_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother's Name</p>
                    <p className="font-medium">{selectedApplication.mother_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${selectedApplication.phone}`} className="font-medium text-[#1E3A8A] hover:underline">
                      {selectedApplication.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${selectedApplication.email}`} className="font-medium text-[#1E3A8A] hover:underline">
                      {selectedApplication.email || 'Not provided'}
                    </a>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedApplication.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedApplication.notes && (
                <div className="bg-yellow-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedApplication.notes}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button asChild className="flex-1 bg-[#1E3A8A] hover:bg-[#1E40AF]">
                  <a href={`tel:${selectedApplication.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                </Button>
                {selectedApplication.email && (
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`mailto:${selectedApplication.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}