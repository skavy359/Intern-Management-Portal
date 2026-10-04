import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Moon, Sun, UserCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="glass-panel border-x-0 border-t-0 h-16 flex items-center justify-between px-4 sm:px-6 z-10 w-full fixed top-0">
      <div className="flex items-center">
        <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-xl font-bold text-transparent">Company Portal</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        {user && (
          <div className="flex items-center space-x-2 text-sm text-[var(--text-primary)]">
            <UserCircle className="w-6 h-6 text-[var(--text-muted)]" />
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-[var(--text-muted)]">{user.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
