import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'Admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) => twMerge(
    clsx(
      'group flex items-center px-3 py-2 text-sm font-medium rounded-xl mb-1 transition-all duration-200',
      isActive
        ? 'sidebar-active text-indigo-600'
        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
    )
  );

  const iconClass = (isActive) => twMerge(
    clsx(
      'mr-3 flex-shrink-0 h-5 w-5',
      isActive ? 'text-indigo-600' : 'text-[var(--text-muted)] group-hover:text-indigo-500'
    )
  );

  return (
    <aside className="glass-panel hidden md:flex w-64 border-y-0 border-l-0 fixed top-16 bottom-0 overflow-y-auto pt-5 pb-4 flex-col">
      <nav className="flex-1 px-3 space-y-1">
        {isAdmin ? (
          <>
            <NavLink to="/admin" end className={navItemClass}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard className={iconClass(isActive)} />
                  Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/admin/interns" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <Users className={iconClass(isActive)} />
                  Interns
                </>
              )}
            </NavLink>
            <NavLink to="/admin/profile" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <User className={iconClass(isActive)} />
                  Profile
                </>
              )}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/intern" end className={navItemClass}>
              {({ isActive }) => (
                <>
                  <LayoutDashboard className={iconClass(isActive)} />
                  Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/intern/profile" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <User className={iconClass(isActive)} />
                  Profile
                </>
              )}
            </NavLink>
          </>
        )}
      </nav>
      <div className="flex-shrink-0 flex border-t border-[var(--border)] p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-3 py-2 text-sm font-medium rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
