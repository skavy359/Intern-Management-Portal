import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ requireAdmin = false, requireIntern = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="theme-spinner h-8 w-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'Admin') {
    return <Navigate to="/intern" replace />;
  }

  if (requireIntern && user.role === 'Admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-4 md:ml-64 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
