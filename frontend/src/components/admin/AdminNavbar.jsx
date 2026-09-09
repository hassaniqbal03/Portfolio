'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import { logout } from '../../services/authService';
import { ExternalLink, LogOut, ShieldCheck, User } from 'lucide-react';

export default function AdminNavbar({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  return (
    <header
      style={{
        height: '64px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Brand & Admin Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link
          href="/admin"
          style={{
            fontSize: '1.2rem',
            fontWeight: 900,
            textDecoration: 'none',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span className="gradient-text">Hassan</span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'var(--primary-indigo-light)',
              textTransform: 'uppercase',
            }}
          >
            Admin Portal
          </span>
        </Link>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textDecoration: 'none',
            padding: '0.4rem 0.85rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            transition: 'all 0.2s ease',
          }}
        >
          <ExternalLink size={14} />
          <span>View Public Site</span>
        </Link>

        <ThemeToggle />

        {/* User badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-main)',
          }}
        >
          <User size={14} color="var(--primary-indigo-light)" />
          <span>{user?.name || user?.email || 'Admin'}</span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.08)',
            color: '#ef4444',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
