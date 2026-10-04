import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
  secondary: 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] shadow-sm',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outline: 'bg-transparent text-indigo-500 border border-indigo-500 hover:bg-indigo-500/10',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
