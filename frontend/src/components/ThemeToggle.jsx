'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="glass-card"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
        }}
      >
        <div style={{ width: '18px', height: '18px' }} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="glass-card"
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        color: 'var(--text-main)',
        transition: 'all 0.25s ease',
      }}
    >
      {theme === 'dark' ? (
        <Sun size={18} color="#fbbf24" />
      ) : (
        <Moon size={18} color="#6366f1" />
      )}
    </button>
  );
}
