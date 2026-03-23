import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  FileText,
  X
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listPages, createPage, updatePage, deletePage } from "@/api/adminClient";

export default function AdminPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    is_published: false,
  });

  const queryClient = useQueryClient();
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: () => listPages(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pages"] }),
  });

  const openModal = (page = null) => {
    if (page) {
      setEditingPage(page);
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content || "",
        is_published: page.is_published || false,
      });
    } else {
      setEditingPage(null);
      setFormData({
        title: "",
        slug: "",
        content: "",
        is_published: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const togglePublish = (page) => {
    updateMutation.mutate({
      id: page.id,
      data: { ...page, is_published: !page.is_published },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Create and manage custom pages
        </p>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#1E40AF]"
        >
          <Plus className="w-4 h-4" />
          Create Page
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full mx-auto" />
          </div>
        ) : pages.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No custom pages yet
            </p>
          </div>
        ) : (
          pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 border-b hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">
                  {page.title}
                </h3>
                <p className="text-sm text-gray-500">
                  /{page.slug || page.title.toLowerCase().replace(/\s+/g, "-")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublish(page)}
                  className="p-2 rounded bg-gray-100"
                >
                  {page.is_published ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => openModal(page)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteMutation.mutate(page.id)}
                  className="p-2 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-6">
              {editingPage ? "Edit Page" : "Create Page"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Page Title
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  rows="4"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span>Publish Page</span>
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_published: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingPage ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
