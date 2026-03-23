/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listBanners, createBanner, updateBanner, deleteBanner } from '@/api/adminClient';

export default function AdminBanners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    cta_primary_text: 'Apply Now',
    cta_primary_link: 'Admissions',
    cta_secondary_text: 'Learn More',
    cta_secondary_link: 'About',
    order: 0,
    is_active: true,
  });

  const queryClient = useQueryClient();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: () => listBanners(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBanner(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['banners'] }),
  });

  const openModal = (banner = null) => {
    setImageFile(null);
    if (banner) {
      setEditingBanner(banner);
      setFormData(banner);
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        image_url: '',
        cta_primary_text: 'Apply Now',
        cta_primary_link: 'Admissions',
        cta_secondary_text: 'Learn More',
        cta_secondary_link: 'About',
        order: banners.length,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, imageFile: imageFile || undefined };
    if (editingBanner) {
      updateMutation.mutate({ id: editingBanner.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const toggleActive = async (banner) => {
    updateMutation.mutate({ 
      id: banner.id, 
      data: { ...banner, is_active: !banner.is_active } 
    });
  };

  return (
    <div title="Banner Management">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Manage homepage hero banners</p>
        <Button onClick={() => openModal()} className="bg-[#1E3A8A] hover:bg-[#1E40AF]">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Banners List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full mx-auto" />
          </div>
        ) : banners.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No banners yet</p>
            <Button onClick={() => openModal()} variant="outline">
              Add Your First Banner
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                
                <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {banner.image_url ? (
                    <img 
                      src={banner.image_url} 
                      alt={banner.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{banner.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-500 truncate">{banner.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`p-2 rounded-lg transition-colors ${
                      banner.is_active 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {banner.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => openModal(banner)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(banner.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <Label>Banner Image</Label>
              <div className="mt-2">
                {formData.image_url ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      src={formData.image_url} 
                      alt="Banner preview" 
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1E3A8A] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                    <span className="text-xs text-gray-400 mt-1">Recommended: 1920x1080</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Welcome to Our School"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Nurturing minds, shaping futures"
                  className="mt-1"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Primary Button Text</Label>
                <Input
                  value={formData.cta_primary_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_primary_text: e.target.value }))}
                  placeholder="Apply Now"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Primary Button Link (Page Name)</Label>
                <Input
                  value={formData.cta_primary_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_primary_link: e.target.value }))}
                  placeholder="Admissions"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Secondary Button Text</Label>
                <Input
                  value={formData.cta_secondary_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary_text: e.target.value }))}
                  placeholder="Learn More"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Secondary Button Link (Page Name)</Label>
                <Input
                  value={formData.cta_secondary_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta_secondary_link: e.target.value }))}
                  placeholder="About"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>Active</Label>
                <p className="text-sm text-gray-500">Show this banner on the website</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Banner'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}