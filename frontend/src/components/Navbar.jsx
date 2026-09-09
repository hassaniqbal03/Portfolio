'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Menu, X, FileText, Shield, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { isAuthenticated } from '../services/authService';

const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };

    checkAuth();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('storage', checkAuth);
    window.addEventListener('portfolio_data_updated', checkAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('portfolio_data_updated', checkAuth);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div
        className="container-custom"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/#home"
          style={{
            fontSize: '1.4rem',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            textDecoration: 'none',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span className="gradient-text">H</span>assan
          <span
            style={{
              color: 'var(--primary-indigo)',
              animation: 'spinSlow 3s linear infinite',
              display: 'inline-block',
            }}
          >
            .
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-indigo-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />

          {/* Admin link */}
          <Link
            href={isAuth ? '/admin' : '/admin/login'}
            className="admin-link-badge"
            title={isAuth ? 'Go to Admin Dashboard' : 'Admin Login'}
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textDecoration: 'none',
              color: isAuth ? 'var(--primary-indigo-light)' : 'var(--text-muted)',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: isAuth ? '1px solid var(--badge-border)' : '1px solid var(--border-color)',
              background: isAuth ? 'var(--badge-bg)' : 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            {isAuth ? (
              <>
                <ShieldCheck size={14} color="#10b981" />
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <Shield size={13} />
                <span>Admin</span>
              </>
            )}
          </Link>

          {/* Resume CTA */}
          <Link
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary desktop-cta"
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.8125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <FileText size={14} />
            <span>Resume</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="mobile-menu-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="glass-nav"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Link
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="btn-primary"
              style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <FileText size={14} /> View CV
            </Link>
            <Link
              href={isAuth ? '/admin' : '/admin/login'}
              onClick={closeMenu}
              className="btn-secondary"
              style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              <Shield size={14} /> {isAuth ? 'Dashboard' : 'Admin'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
