import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, GripVertical, ExternalLink, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listNavItems, createNavItem, updateNavItem, deleteNavItem } from '@/api/adminClient';

export default function AdminNavigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    link: '',
    parent_id: '',
    order: 0,
    is_active: true,
    open_in_new_tab: false,
  });

  const queryClient = useQueryClient();

  const { data: navItems = [], isLoading } = useQuery({
    queryKey: ['navItems'],
    queryFn: () => listNavItems(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => createNavItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navItems'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateNavItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navItems'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNavItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['navItems'] }),
  });

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        label: '',
        link: '',
        parent_id: '',
        order: navItems.length,
        is_active: true,
        open_in_new_tab: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (!data.parent_id) delete data.parent_id;
    
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const toggleActive = async (item) => {
    updateMutation.mutate({
      id: item.id,
      data: { ...item, is_active: !item.is_active },
    });
  };

  const parentItems = navItems.filter(item => !item.parent_id);

  const getChildItems = (parentId) => {
    return navItems.filter(item => item.parent_id === parentId);
  };

  return (
    <div title="Navigation Menu">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Manage website navigation menu</p>
        <Button onClick={() => openModal()} className="bg-[#1E3A8A] hover:bg-[#1E40AF]">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Navigation Preview */}
      <div className="bg-[#1E3A8A] rounded-xl p-4 mb-6">
        <p className="text-white/60 text-sm mb-3">Navigation Preview</p>
        <div className="flex items-center gap-6 overflow-x-auto">
          {parentItems.filter(i => i.is_active).map((item) => (
            <div key={item.id} className="text-white font-medium whitespace-nowrap flex items-center gap-1">
              {item.label}
              {getChildItems(item.id).length > 0 && (
                <ChevronRight className="w-4 h-4 rotate-90" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full mx-auto" />
          </div>
        ) : navItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No menu items yet</p>
            <Button onClick={() => openModal()} variant="outline">
              Add Your First Menu Item
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {parentItems.map((item) => (
              <div key={item.id}>
                {/* Parent Item */}
                <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{item.label}</span>
                      {!item.is_active && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">Hidden</span>
                      )}
                      {item.open_in_new_tab && (
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{item.link}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openModal(item)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Child Items */}
                {getChildItems(item.id).map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-4 p-4 pl-12 bg-gray-50 border-l-4 border-l-[#1E3A8A]/20 hover:bg-gray-100 transition-colors"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">{child.label}</span>
                        {!child.is_active && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-500 text-xs rounded">Hidden</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{child.link}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(child)}
                        className={`p-2 rounded-lg transition-colors ${
                          child.is_active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {child.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openModal(child)}
                        className="p-2 hover:bg-white rounded-lg text-gray-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(child.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Label *</Label>
              <Input
                required
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                placeholder="e.g., About Us"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Link *</Label>
              <Input
                required
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="e.g., /About or https://..."
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use /PageName for internal pages or full URL for external links
              </p>
            </div>

            <div>
              <Label>Parent Menu (optional)</Label>
              <Select
                value={formData.parent_id || 'none'}
                onValueChange={(v) => setFormData(prev => ({ ...prev, parent_id: v === 'none' ? '' : v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (Top Level)</SelectItem>
                  {parentItems.filter(i => i.id !== editingItem?.id).map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Label>Active</Label>
                <p className="text-xs text-gray-500">Show in navigation</p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Label>Open in New Tab</Label>
                <p className="text-xs text-gray-500">For external links</p>
              </div>
              <Switch
                checked={formData.open_in_new_tab}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, open_in_new_tab: checked }))}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {editingItem ? 'Update' : 'Add'} Item
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}