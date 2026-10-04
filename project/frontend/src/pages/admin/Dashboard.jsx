import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, UserCheck, UserX } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Operations overview</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Admin dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="glass-card overflow-hidden rounded-2xl">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Interns</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.stats?.total ?? 0}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Interns</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.stats?.active ?? 0}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0">
              <UserX className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Disabled Interns</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stats?.stats?.disabled ?? 0}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Role Distribution</h2>
          <div className="space-y-4">
            {stats?.roleDistribution?.map((role, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{role.role}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">{role.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Interns</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {stats?.recentInterns?.map((intern) => (
                <li key={intern.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 truncate">{intern.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{intern.email}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{intern.role}</p>
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className={`flex-none rounded-full p-1 ${intern.is_enabled ? 'bg-green-100/20 text-green-500' : 'bg-red-100/20 text-red-500'}`}>
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">{intern.is_enabled ? 'Active' : 'Disabled'}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
