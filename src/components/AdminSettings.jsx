/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, Upload, Globe, Phone, Mail, MapPin, 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  Palette, Type, Sparkles, Search, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '@/api/adminClient';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const queryClient = useQueryClient();

  const { data: savedSettings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => getSettings(),
  });

  useEffect(() => {
    if (savedSettings && typeof savedSettings === 'object') {
      setSettings(savedSettings);
    }
  }, [savedSettings]);

  const saveMutation = useMutation({
    mutationFn: (data) => updateSettings(data, logoFile),
    onSuccess: () => {
      setLogoFile(null);
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      setSaving(false);
    },
    onError: () => setSaving(false),
  });

  const handleSave = async () => {
    setSaving(true);
    saveMutation.mutate(settings);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (key, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (key === 'logo') {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      handleChange('logo', url);
    }
  };

  return (
    <div title="Site Settings">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white shadow-sm border p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold">General Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>School Name</Label>
                <Input
                  value={settings.school_name || ''}
                  onChange={(e) => handleChange('school_name', e.target.value)}
                  placeholder="Malhotra Public School"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Tagline</Label>
                <Input
                  value={settings.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Learning Today, Leading Tomorrow"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>School Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                {settings.logo ? (
                  <div className="relative">
                    <img src={settings.logo} alt="Logo" className="h-20 object-contain" />
                    <button
                      onClick={() => handleChange('logo', '')}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-[#1E3A8A]">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Logo</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logo', e)} />
                  </label>
                )}
              </div>
            </div>

            <div>
              <Label>Favicon</Label>
              <div className="mt-2 flex items-center gap-4">
                {settings.favicon ? (
                  <div className="relative">
                    <img src={settings.favicon} alt="Favicon" className="h-10 w-10 object-contain" />
                    <button
                      onClick={() => handleChange('favicon', '')}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-[#1E3A8A]">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Favicon</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('favicon', e)} />
                  </label>
                )}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </Label>
                <Input
                  value={settings.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </Label>
                <Input
                  value={settings.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="info@school.edu"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Address
              </Label>
              <Textarea
                value={settings.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="School address..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" /> Google Maps Embed URL
              </Label>
              <Input
                value={settings.map_embed || ''}
                onChange={(e) => handleChange('map_embed', e.target.value)}
                placeholder="https://www.google.com/maps/embed?..."
                className="mt-1"
              />
            </div>
          </motion.div>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold">Social Media Links</h3>
            
            <div className="space-y-4">
              {[
                { key: 'facebook', icon: Facebook, label: 'Facebook', placeholder: 'https://facebook.com/...' },
                { key: 'twitter', icon: Twitter, label: 'Twitter/X', placeholder: 'https://twitter.com/...' },
                { key: 'instagram', icon: Instagram, label: 'Instagram', placeholder: 'https://instagram.com/...' },
                { key: 'youtube', icon: Youtube, label: 'YouTube', placeholder: 'https://youtube.com/...' },
                { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
              ].map((social) => (
                <div key={social.key} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <social.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <Label>{social.label}</Label>
                    <Input
                      value={settings[social.key] || ''}
                      onChange={(e) => handleChange(social.key, e.target.value)}
                      placeholder={social.placeholder}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold">SEO Settings</h3>
            
            <div>
              <Label className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Meta Title
              </Label>
              <Input
                value={settings.meta_title || ''}
                onChange={(e) => handleChange('meta_title', e.target.value)}
                placeholder="Malhotra Public School - Best School in Kotputli"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
            </div>

            <div>
              <Label>Meta Description</Label>
              <Textarea
                value={settings.meta_description || ''}
                onChange={(e) => handleChange('meta_description', e.target.value)}
                placeholder="Description of your school for search engines..."
                className="mt-1"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
            </div>

            <div>
              <Label>Meta Keywords</Label>
              <Input
                value={settings.meta_keywords || ''}
                onChange={(e) => handleChange('meta_keywords', e.target.value)}
                placeholder="school, education, kotputli, rajasthan, cbse"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Google Analytics ID</Label>
              <Input
                value={settings.google_analytics || ''}
                onChange={(e) => handleChange('google_analytics', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="mt-1"
              />
            </div>
          </motion.div>
        </TabsContent>

        {/* Theme Settings */}
        <TabsContent value="theme">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6 space-y-6"
          >
            <h3 className="text-lg font-semibold">Theme Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Primary Color
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={settings.primary_color || '#1E3A8A'}
                    onChange={(e) => handleChange('primary_color', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={settings.primary_color || '#1E3A8A'}
                    onChange={(e) => handleChange('primary_color', e.target.value)}
                    placeholder="#1E3A8A"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Accent Color
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={settings.accent_color || '#FACC15'}
                    onChange={(e) => handleChange('accent_color', e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <Input
                    value={settings.accent_color || '#FACC15'}
                    onChange={(e) => handleChange('accent_color', e.target.value)}
                    placeholder="#FACC15"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#1E3A8A]" />
                <div>
                  <Label>Enable Animations</Label>
                  <p className="text-sm text-gray-500">Page transitions and scroll animations</p>
                </div>
              </div>
              <Switch
                checked={settings.animations_enabled !== 'false'}
                onCheckedChange={(checked) => handleChange('animations_enabled', checked ? 'true' : 'false')}
              />
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] shadow-lg"
          size="lg"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}