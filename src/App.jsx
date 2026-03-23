import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminHomePage from "./components/AdminHomePage";
import AdminBanners from "./components/AdminBanners";
import AdminGallery from "./components/AdminGallery";
import AdminNotices from "./components/AdminNotices";
import AdminAdmissions from "./components/AdminAdmissions";
import AdminPages from "./components/AdminPages";
import AdminNavigation from "./components/AdminNavigation";
import AdminSettings from "./components/AdminSettings"; 
import Login from "./components/Login";
import Academics from "./components/Academics";

const App = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<AdminLayout/>}>
        <Route index element={<Navigate to="AdminDashboard" />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="AdminHomePage" element={<AdminHomePage />} />
        <Route path="AdminBanners" element={<AdminBanners />} />
        <Route path="AdminGallery" element={<AdminGallery />} />
        <Route path="AdminNotices" element={<AdminNotices />} />
        <Route path="AdminAdmissions" element={<AdminAdmissions />} />
        <Route path="AdminPages" element={<AdminPages />} />
        <Route path="AdminNavigation" element={<AdminNavigation />} />
        <Route path="AdminSettings" element={<AdminSettings />} />
        <Route path="/Academics" element={<Academics />} />
      </Route>
    </Routes>
  );
};

export default App;