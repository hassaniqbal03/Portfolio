'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../../services/authService';
import { useToast } from '../../../context/ToastContext';
import { Shield, Lock, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import ThemeToggle from '../../../components/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(credentials);
      showToast('Logged in successfully!', 'success');
      router.push('/admin');
    } catch (err) {
      const msg = typeof err === 'string' ? err : 'Invalid login credentials.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div
        className="animate-blob"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '380px',
          height: '380px',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.15)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="animate-blob animation-delay-2000"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '340px',
          height: '340px',
          borderRadius: '9999px',
          background: 'rgba(6, 182, 212, 0.12)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Controls */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          position: 'relative',
          zIndex: 1,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.35)',
            }}
          >
            <Shield size={26} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Admin Portal
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Authenticate to manage portfolio data via Express REST APIs
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="input-custom"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="admin@yourdomain.com"
              />
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-subtle)',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="input-custom"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-subtle)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              opacity: loading ? 0.8 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin-slow" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
