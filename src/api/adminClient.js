import { Base_Url } from '../config';

const API_BASE = Base_Url.replace(/\/$/, '');

function getAuthToken() {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('admin_token');
  } catch {
    return null;
  }
}

function buildHeaders(isFormData = false) {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const errorBody = await res.json();
      if (errorBody && (errorBody.message || errorBody.error)) {
        message = errorBody.message || errorBody.error;
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  // Most backend endpoints return { success, data, ... }
  const json = await res.json().catch(() => null);
  if (json && Object.prototype.hasOwnProperty.call(json, 'data')) {
    return json.data;
  }
  return json;
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: buildHeaders(false),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function apiPost(path, body, { isFormData = false } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: buildHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function apiPut(path, body, { isFormData = false } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: buildHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: buildHeaders(false),
    credentials: 'include',
  });
  return handleResponse(res);
}

// ---- Domain-specific helpers ----

// Admissions (public create, admin list/update/delete)
export function submitAdmissionApplication(form) {
  // Map frontend form fields -> backend schema
  const payload = {
    studentName: form.student_name,
    parentName: form.father_name || form.parent_name || '',
    email: form.email,
    phone: form.phone,
    class: form.class_applying,
    dob: form.date_of_birth,
    address: form.address,
  };
  return apiPost('/admissions', payload);
}

export async function listAdmissions() {
  const data = await apiGet('/admissions');
  // Normalize to the shape used in admin UI
  return (data || []).map((a) => ({
    id: a._id,
    student_name: a.studentName,
    father_name: a.parentName,
    class_applying: a.class,
    email: a.email,
    phone: a.phone,
    address: a.address,
    date_of_birth: a.dob,
    created_date: a.createdAt,
    status: a.isContacted ? 'contacted' : 'pending',
  }));
}

export function updateAdmissionContactStatus(id, status) {
  // Backend only knows "isContacted" boolean; map from our status
  const isContacted = status !== 'pending';
  return apiPut(`/admissions/${id}/status`, { isContacted });
}

export function deleteAdmission(id) {
  return apiDelete(`/admissions/${id}`);
}

// Notices
export async function listNotices() {
  const data = await apiGet('/notices');
  return (data || []).map((n) => ({
    id: n._id,
    title: n.title,
    description: n.description,
    date: n.date,
    is_highlighted: n.isHighlighted,
  }));
}

export function createNotice(payload) {
  return apiPost('/notices', {
    title: payload.title,
    description: payload.description,
    date: payload.date,
    isHighlighted: payload.is_highlighted || false,
  });
}

export function updateNotice(id, payload) {
  return apiPut(`/notices/${id}`, {
    title: payload.title,
    description: payload.description,
    date: payload.date,
    isHighlighted: payload.is_highlighted || false,
  });
}

export function deleteNotice(id) {
  return apiDelete(`/notices/${id}`);
}

// Banners
export async function listBanners() {
  const data = await apiGet('/banners');
  return (data || []).map((b) => ({
    id: b._id,
    title: b.title,
    subtitle: b.subtitle,
    image_url: b.image,
    cta_primary_text: b.buttonText,
    cta_primary_link: b.buttonLink,
    order: b.order ?? 0,
    is_active: b.isActive,
  }));
}

export function createBanner(form) {
  const fd = new FormData();
  if (form.imageFile) {
    fd.append('image', form.imageFile);
  }
  fd.append('title', form.title || '');
  fd.append('subtitle', form.subtitle || '');
  fd.append('buttonText', form.cta_primary_text || '');
  fd.append('buttonLink', form.cta_primary_link || '');
  fd.append('order', String(form.order ?? 0));
  fd.append('isActive', String(form.is_active ?? true));
  return apiPost('/banners', fd, { isFormData: true });
}

export function updateBanner(id, form) {
  const fd = new FormData();
  if (form.imageFile) {
    fd.append('image', form.imageFile);
  }
  fd.append('title', form.title || '');
  fd.append('subtitle', form.subtitle || '');
  fd.append('buttonText', form.cta_primary_text || '');
  fd.append('buttonLink', form.cta_primary_link || '');
  fd.append('order', String(form.order ?? 0));
  fd.append('isActive', String(form.is_active ?? true));
  return apiPut(`/banners/${id}`, fd, { isFormData: true });
}

export function deleteBanner(id) {
  return apiDelete(`/banners/${id}`);
}

// Gallery
export async function listGalleries() {
  const data = await apiGet('/gallery');
  // Flatten images for admin UI as individual image items
  const images = [];
  (data || []).forEach((g) => {
    (g.images || []).forEach((img, idx) => {
      images.push({
        id: `${g._id}-${idx}`,
        galleryId: g._id,
        title: g.title,
        category: g.category,
        description: g.description,
        image_url: img.url,
      });
    });
  });
  return images;
}

export async function listGalleryCategories() {
  const data = await apiGet('/gallery/categories');
  return (data || []).map((name, index) => ({
    id: String(index),
    name,
    slug: name,
    cover_image: '',
  }));
}

export function createGalleryImage(form) {
  const fd = new FormData();
  if (form.imageFile) {
    fd.append('images', form.imageFile);
  }
  fd.append('category', form.category || 'general');
  fd.append('title', form.title || '');
  fd.append('description', form.description || '');
  return apiPost('/gallery', fd, { isFormData: true });
}

export function updateGallery(id, form) {
  const fd = new FormData();
  if (form.imageFile) {
    fd.append('images', form.imageFile);
  }
  fd.append('title', form.title || '');
  fd.append('description', form.description || '');
  fd.append('category', form.category || '');
  return apiPut(`/gallery/${id}`, fd, { isFormData: true });
}

export function deleteGallery(galleryId) {
  return apiDelete(`/gallery/${galleryId}`);
}

// Navigation
export async function listNavItems() {
  const data = await apiGet('/nav');
  return (data || []).map((n) => ({
    id: n._id,
    label: n.label,
    link: n.link,
    order: n.order ?? 0,
    is_active: true,
    open_in_new_tab: n.isExternal,
    parent_id: n.parentId ? String(n.parentId) : '',
  }));
}

export function createNavItem(form) {
  const payload = {
    label: form.label,
    link: form.link,
    order: form.order ?? 0,
    isExternal: form.open_in_new_tab ?? false,
  };
  if (form.parent_id) {
    payload.parentId = form.parent_id;
  }
  return apiPost('/nav', payload);
}

export function updateNavItem(id, form) {
  const payload = {
    label: form.label,
    link: form.link,
    order: form.order ?? 0,
    isExternal: form.open_in_new_tab ?? false,
  };
  if (form.parent_id) {
    payload.parentId = form.parent_id;
  } else {
    payload.parentId = null;
  }
  return apiPut(`/nav/${id}`, payload);
}

export function deleteNavItem(id) {
  return apiDelete(`/nav/${id}`);
}

// Settings
export async function getSettings() {
  const data = await apiGet('/settings');
  if (!data) return {};
  return {
    primary_color: data.themeColor,
    accent_color: data.accentColor,
    meta_title: data.seoTitle,
    meta_description: data.seoDescription,
    google_analytics: data.googleAnalytics,
    logo: data.logo,
    animations_enabled: data.animationsEnabled !== false,
    // optional fields the UI may use (not in backend yet)
    school_name: data.schoolName || '',
    tagline: data.tagline || '',
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    map_embed: data.mapEmbed || '',
  };
}

export function updateSettings(settings, logoFile) {
  const fd = new FormData();
  if (logoFile) {
    fd.append('logo', logoFile);
  }
  const map = {
    primary_color: 'themeColor',
    accent_color: 'accentColor',
    meta_title: 'seoTitle',
    meta_description: 'seoDescription',
    google_analytics: 'googleAnalytics',
    animations_enabled: 'animationsEnabled',
  };
  Object.entries(map).forEach(([frontKey, backKey]) => {
    if (settings[frontKey] !== undefined && settings[frontKey] !== null) {
      const v = settings[frontKey];
      fd.append(backKey, typeof v === 'boolean' ? String(v) : String(v));
    }
  });
  return apiPut('/settings', fd, { isFormData: true });
}

// Testimonials
export async function listTestimonials() {
  const data = await apiGet('/testimonials');
  return (data || []).map((t) => ({
    id: t._id,
    name: t.name,
    role: t.role,
    content: t.content,
    image_url: t.image,
    rating: t.rating,
    is_featured: t.isActive,
    order: 0,
  }));
}

export function createTestimonial(form) {
  const fd = new FormData();
  if (form.imageFile) fd.append('image', form.imageFile);
  fd.append('name', form.name || '');
  fd.append('role', form.role || 'Parent');
  fd.append('content', form.content || '');
  fd.append('rating', String(form.rating ?? 5));
  fd.append('isActive', String(form.is_featured ?? true));
  return apiPost('/testimonials', fd, { isFormData: true });
}

export function updateTestimonial(id, form) {
  const fd = new FormData();
  if (form.imageFile) fd.append('image', form.imageFile);
  fd.append('name', form.name || '');
  fd.append('role', form.role || 'Parent');
  fd.append('content', form.content || '');
  fd.append('rating', String(form.rating ?? 5));
  fd.append('isActive', String(form.is_featured ?? true));
  return apiPut(`/testimonials/${id}`, fd, { isFormData: true });
}

export function deleteTestimonial(id) {
  return apiDelete(`/testimonials/${id}`);
}

// Pages (for dashboard count and AdminPages)
export async function listPages() {
  const data = await apiGet('/pages');
  return (data || []).map((p) => ({
    id: p._id,
    title: p.title,
    slug: p.slug,
    content: p.metaDescription || '',
    is_published: p.status === 'published',
  }));
}

export function createPage(form) {
  return apiPost('/pages', {
    title: form.title,
    slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
    metaDescription: form.content,
    status: form.is_published ? 'published' : 'draft',
  });
}

export function updatePage(id, form) {
  return apiPut(`/pages/${id}`, {
    title: form.title,
    slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
    metaDescription: form.content,
    status: form.is_published ? 'published' : 'draft',
  });
}

export function deletePage(id) {
  return apiDelete(`/pages/${id}`);
}

// // Academic programs
// export async function listAcademicPrograms() {
//   const data = await apiGet('/AcademicProg');

//   return (data || []).map((p) => ({
//     id: p._id,
//     title: p.title,
//     grades: p.grades,
//     description: p.description,
//   }));
// }

// Academic Programs

export async function listAcademicPrograms() {
  const data = await apiGet('/AcademicProg');

  return (data || []).map((p) => ({
    id: p._id,
    title: p.title,
    grades: p.grades,
    description: p.description,
  }));
}

// CREATE
export function createAcademicProgram(form) {
  return apiPost('/AcademicProg/add', {
    title: form.title,
    grades: form.grades,
    description: form.description,
  });
}

// UPDATE
export function updateAcademicProgram(id, form) {
  return apiPut(`/AcademicProg/${id}`, {
    title: form.title,
    grades: form.grades,
    description: form.description,
  });
}

// DELETE
export function deleteAcademicProgram(id) {
  return apiDelete(`/AcademicProg/delete/${id}`);
}

// ================= STATISTICS =================

// GET
export async function listStats() {
  const data = await apiGet('/Statistic');
  return (data || []).map((s) => ({
    id: s._id,
    label: s.label,
    value: s.value,
    suffix: s.suffix || '+',
  }));
}

// CREATE
export function createStat(form) {
  return apiPost('/Statistic/add', form);
}

// UPDATE
export function updateStat(id, form) {
  return apiPut(`/Statistic/new/${id}`, form);
}

// DELETE
export function deleteStat(id) {
  return apiDelete(`/Statistic/del/${id}`);
}
