/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  GripVertical,
  Type,
  Image,
  Video,
  BarChart3,
  Layout,
  MousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/api/adminClient";
import {
  listAcademicPrograms,
  createAcademicProgram,
  updateAcademicProgram,
  deleteAcademicProgram,
} from "@/api/adminClient";
import {
  listStats,
  createStat,
  updateStat,
  deleteStat,
} from "@/api/adminClient";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState("stats");
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [statForm, setStatForm] = useState({
    label: "",
    value: 0,
    suffix: "+",
    icon: "Users",
    order: 0,
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "Parent",
    content: "",
    rating: 5,
    image_url: "",
    is_featured: false,
    order: 0,
  });

  const [programForm, setProgramForm] = useState({
    title: "",
    description: "",
    icon: "BookOpen",
    grades: "",
    features: [],
    order: 0,
  });
  // ===================statistics=======================
  const queryClient = useQueryClient();
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: listStats,
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => listTestimonials(),
  });

  //Academics Programe.......
  const { data: programs = [] } = useQuery({
    queryKey: ["academicPrograms"],
    queryFn: () => listAcademicPrograms(),
  });
  const createMutation = useMutation({
    mutationFn: createAcademicProgram,
    onSuccess: () => {
      queryClient.invalidateQueries(["academicPrograms"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAcademicProgram,
    onSuccess: () => {
      queryClient.invalidateQueries(["academicPrograms"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAcademicProgram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["academicPrograms"]);
    },
  });

  // Statistics mutations (no backend - keep local only)
  const createStatMutation = useMutation({
    mutationFn: createStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsStatModalOpen(false);
    },
  });
  const updateStatMutation = useMutation({
  mutationFn: ({ id, data }) => updateStat(id, data), // ✅ IMPORTANT FIX
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["stats"] });
    setIsStatModalOpen(false);
  },
});

  const deleteStatMutation = useMutation({
    mutationFn: deleteStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  // Testimonials mutations
  const createTestimonialMutation = useMutation({
    mutationFn: (data) => createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsTestimonialModalOpen(false);
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: ({ id, data }) => updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsTestimonialModalOpen(false);
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: (id) => deleteTestimonial(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }),
  });

  // Programs mutations (no backend)
  const createProgramMutation = useMutation({
    mutationFn: createAcademicProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
      setIsProgramModalOpen(false);
    },
  });

  const updateProgramMutation = useMutation({
    mutationFn: ({ id, data }) => updateAcademicProgram(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
      setIsProgramModalOpen(false);
    },
  });

  const deleteProgramMutation = useMutation({
    mutationFn: deleteAcademicProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicPrograms"] });
    },
  });

  const openStatModal = (item = null) => {
    if (item) {
      setEditingItem(item); // ✅ set editing item
      setStatForm({
        label: item.label || "",
        value: item.value || 0,
        suffix: item.suffix || "+",
      });
    } else {
      setEditingItem(null); // ✅ reset
      setStatForm({
        label: "",
        value: 0,
        suffix: "+",
      });
    }

    setIsStatModalOpen(true); // ✅ open modal only
  };

  const openTestimonialModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setTestimonialForm(item);
    } else {
      setEditingItem(null);
      setTestimonialForm({
        name: "",
        role: "Parent",
        content: "",
        rating: 5,
        image_url: "",
        is_featured: false,
        order: testimonials.length,
      });
    }
    setIsTestimonialModalOpen(true);
  };

  const openProgramModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setProgramForm(item);
    } else {
      setEditingItem(null);
      setProgramForm({
        title: "",
        description: "",
        icon: "BookOpen",
        grades: "",
        features: [],
        order: programs.length,
      });
    }
    setIsProgramModalOpen(true);
  };

  const icons = [
    "Users",
    "GraduationCap",
    "Trophy",
    "Award",
    "Calendar",
    "BookOpen",
    "Star",
    "Building",
  ];

  return (
    <div title="Home Page Manager">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white shadow-sm border p-1 mb-6">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="programs">Academic Programs</TabsTrigger>
        </TabsList>

        {/* Statistics */}
        <TabsContent value="stats">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Manage the animated statistics counter
            </p>
            <Button
              onClick={() => openStatModal()}
              className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm border relative group"
              >
                <div className="text-4xl font-bold text-[#1E3A8A]">
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => openStatModal(stat)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteStatMutation.mutate(stat.id)}
                    className="p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {stats.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No statistics added yet</p>
            </div>
          )}
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Manage parent and student testimonials
            </p>
            <Button
              onClick={() => openTestimonialModal()}
              className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border relative group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      t.image_url ||
                      `https://ui-avatars.com/api/?name=${t.name}&background=1E3A8A&color=fff`
                    }
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">
                  "{t.content}"
                </p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => openTestimonialModal(t)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteTestimonialMutation.mutate(t.id)}
                    className="p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <Type className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No testimonials added yet</p>
            </div>
          )}
        </TabsContent>

        {/* Academic Programs */}
        <TabsContent value="programs">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Manage academic programs displayed on homepage
            </p>
            <Button
              onClick={() => openProgramModal()}
              className="bg-[#1E3A8A] hover:bg-[#1E40AF]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Program
            </Button>
          </div>

          <div className="space-y-4">
            {programs.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm border flex items-start gap-6 group"
              >
                <div className="w-16 h-16 bg-[#FACC15] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Layout className="w-8 h-8 text-[#1E3A8A]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{p.title}</h4>
                  <p className="text-sm text-[#1E3A8A]">{p.grades}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => openProgramModal(p)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => deleteProgramMutation.mutate(p.id)}
                    className="p-2 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {programs.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <Layout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No programs added yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Stat Modal */}
      <Dialog open={isStatModalOpen} onOpenChange={setIsStatModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Statistic" : "Add Statistic"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("EDIT ITEM 👉", JSON.stringify(editingItem, null, 2));
            if (editingItem) {
  console.log("EDIT ITEM 👉", editingItem);

  updateStatMutation.mutate({
    id: editingItem.id,   // ✅ FIXED
    data: statForm,
  });

} else {
  createStatMutation.mutate(statForm);
}
            }}
            className="space-y-4"
          >
            <div>
              <Label>Label</Label>
              <Input
                value={statForm.label}
                onChange={(e) =>
                  setStatForm((prev) => ({ ...prev, label: e.target.value }))
                }
                placeholder="e.g., Students Enrolled"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Value</Label>
                <Input
                  type="number"
                  value={statForm.value}
                  onChange={(e) =>
                    setStatForm((prev) => ({
                      ...prev,
                      value: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Suffix</Label>
                <Input
                  value={statForm.suffix}
                  onChange={(e) =>
                    setStatForm((prev) => ({ ...prev, suffix: e.target.value }))
                  }
                  placeholder="e.g., + or %"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsStatModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1E3A8A] hover:bg-[#1E40AF]">
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Testimonial Modal */}
      <Dialog
        open={isTestimonialModalOpen}
        onOpenChange={setIsTestimonialModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (editingItem) {
                updateTestimonialMutation.mutate({
                  id: editingItem.id,
                  data: testimonialForm,
                });
              } else {
                createTestimonialMutation.mutate(testimonialForm);
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label>Name</Label>
              <Input
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Parent/Student name"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={testimonialForm.role}
                onChange={(e) =>
                  setTestimonialForm((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                placeholder="e.g., Parent, Alumni"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Testimonial</Label>
              <Textarea
                value={testimonialForm.content}
                onChange={(e) =>
                  setTestimonialForm((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                placeholder="What they said..."
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsTestimonialModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#1E3A8A] hover:bg-[#1E40AF]">
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Program Modal */}
      <Dialog open={isProgramModalOpen} onOpenChange={setIsProgramModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Program" : "Add Program"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (editingItem) {
                updateMutation.mutate({
                  id: editingItem.id,
                  data: programForm,
                });
              } else {
                createMutation.mutate(programForm);
              }
            }}
            className="space-y-4"
          >
            <div>
              <Label>Title</Label>
              <Input
                value={programForm.title}
                onChange={(e) =>
                  setProgramForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="e.g., Primary School"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Grades</Label>
              <Input
                value={programForm.grades}
                onChange={(e) =>
                  setProgramForm((prev) => ({
                    ...prev,
                    grades: e.target.value,
                  }))
                }
                placeholder="e.g., Nursery - Class 5"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={programForm.description}
                onChange={(e) =>
                  setProgramForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Program description..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProgramModalOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-[#1E3A8A] hover:bg-[#1E40AF]">
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
