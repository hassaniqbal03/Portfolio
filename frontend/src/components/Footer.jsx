'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ profile }) {
  const currentYear = new Date().getFullYear();
  const name = profile?.name || 'Muhammad Hassan Iqbal';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-main)',
        padding: '4rem 0 2rem',
        position: 'relative',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="#home"
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textDecoration: 'none',
                color: 'var(--text-main)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                marginBottom: '0.5rem',
              }}
            >
              <span className="gradient-text">H</span>assan
              <span style={{ color: 'var(--primary-indigo)' }}>.</span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '340px' }}>
              Crafting high-concurrency, scalable web platforms with modern React, Next.js, and Node architectures.
            </p>
          </div>

          {/* Socials & Scroll to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={profile?.socialLinks?.github || 'https://github.com/hassaniqbalo3'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass-card glass-card-hover"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              <Github size={18} />
            </a>

            <a
              href={profile?.socialLinks?.linkedin || 'https://linkedin.com/in/muhammad-hassan-iqbal'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass-card glass-card-hover"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:mhassaniqbal18@gmail.com"
              aria-label="Email"
              className="glass-card glass-card-hover"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              <Mail size={18} />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="glass-card glass-card-hover"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-indigo-light)',
                cursor: 'pointer',
                border: '1px solid var(--border-card-hover)',
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Copyright & Sub-bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
          }}
        >
          <p>
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with Next.js App Router &bull; REST API Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
