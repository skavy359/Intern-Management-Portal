import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

import Login from './pages/Login';
import Layout from './components/layout/Layout';

import AdminDashboard from './pages/admin/Dashboard';
import InternsList from './pages/admin/InternsList';

import InternDashboard from './pages/intern/Dashboard';
import InternProfile from './pages/intern/Profile';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
       <ToastProvider>
       <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<Layout requireAdmin={true} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="interns" element={<InternsList />} />
            <Route path="profile" element={<InternDashboard />} />
            <Route path="settings" element={<Navigate to="/admin/profile" replace />} />
          </Route>
          
          <Route path="/intern" element={<Layout requireIntern={true} />}>
            <Route index element={<InternDashboard />} />
            <Route path="profile" element={<InternProfile />} />
          </Route>
        </Routes>
       </Router>
       </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
