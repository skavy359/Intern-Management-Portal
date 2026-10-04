import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, ShieldCheck, UserRound } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg">
        <p className="text-sm font-medium text-indigo-100">Intern Management & Training Portal</p>
        <h1 className="mt-2 text-3xl font-semibold">Welcome back, {user?.name || 'Intern'}</h1>
        <p className="mt-2 max-w-xl text-sm text-indigo-100">Keep your account information current and continue building your professional profile.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <UserRound className="h-6 w-6 text-indigo-600" />
          <p className="mt-4 text-sm text-gray-500">Account</p>
          <p className="font-semibold text-gray-900">{user?.email}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <p className="mt-4 text-sm text-gray-500">Role</p>
          <p className="font-semibold text-gray-900">{user?.role}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <CheckCircle2 className="h-6 w-6 text-blue-600" />
          <p className="mt-4 text-sm text-gray-500">Account status</p>
          <p className="font-semibold text-emerald-700">{user?.is_enabled ? 'Active' : 'Disabled'}</p>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
        <h2 className="font-semibold text-indigo-950">Training progress</h2>
        <p className="mt-1 text-sm text-indigo-800">Your training progress area is ready for course modules and completion data when those records are added to the existing database.</p>
        <div className="mt-4 h-2 rounded-full bg-indigo-200"><div className="h-2 w-1/3 rounded-full bg-indigo-600" /></div>
        <p className="mt-2 text-xs text-indigo-700">Profile setup in progress</p>
      </div>
    </div>
  );
};

export default Dashboard;
