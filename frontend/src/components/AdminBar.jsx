'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser, logout } from '../services/authService';
import { ShieldCheck, LayoutDashboard, User, Sparkles, FolderGit2, Mail, LogOut, ExternalLink } from 'lucide-react';

export default function AdminBar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const checkStatus = () => {
      const auth = isAuthenticated();
      setIsAuth(auth);
      if (auth) {
        getCurrentUser().then(setAdminUser);
      }
    };

    checkStatus();
    window.addEventListener('storage', checkStatus);
    window.addEventListener('portfolio_data_updated', checkStatus);
    return () => {
      window.removeEventListener('storage', checkStatus);
      window.removeEventListener('portfolio_data_updated', checkStatus);
    };
  }, []);

  if (!isAuth) return null;

  const handleLogout = async () => {
    await logout();
    setIsAuth(false);
    setAdminUser(null);
    window.location.reload();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '3px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99,
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 102, 241, 0.3)',
        borderRadius: '9999px',
        padding: '0.4rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '94vw',
        overflowX: 'auto',
        color: '#f8fafc',
        fontSize: '0.78rem',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
          <span style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: '9999px', background: '#10b981', opacity: 0.75, animation: 'ping 1.5s infinite' }} />
          <span style={{ position: 'relative', borderRadius: '9999px', height: '8px', width: '8px', background: '#10b981' }} />
        </span>
        <span style={{ fontWeight: 800, color: 'var(--primary-indigo-light)' }}>
          ADMIN MODE
        </span>
      </div>

      <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />

      {/* Quick Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <Link
          href="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: '#f8fafc',
            fontWeight: 700,
            textDecoration: 'none',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
          }}
        >
          <LayoutDashboard size={13} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/profile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <User size={13} />
          <span>Edit Bio</span>
        </Link>

        <Link
          href="/admin/skills"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <Sparkles size={13} />
          <span>Skills</span>
        </Link>

        <Link
          href="/admin/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <FolderGit2 size={13} />
          <span>Projects</span>
        </Link>

        <Link
          href="/admin/messages"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <Mail size={13} />
          <span>Inbox</span>
        </Link>
      </div>

      <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />

      <button
        type="button"
        onClick={handleLogout}
        style={{
          background: 'none',
          border: 'none',
          color: '#ef4444',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.75rem',
          padding: '0.15rem 0.4rem',
        }}
      >
        <LogOut size={13} />
        <span>Exit</span>
      </button>
    </div>
  );
}
