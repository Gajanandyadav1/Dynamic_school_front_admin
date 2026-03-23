import React, { useState,useEffect } from "react";
import { Outlet,useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";


export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
 const navigate = useNavigate();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex min-h-screen bg-gray-100 relative">

      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1">

        {/* Topbar */}
        <header className="bg-white shadow px-4 py-3 flex items-center gap-4">

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold">Admin Panel</h1>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}