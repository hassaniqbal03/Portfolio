'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, Sparkles, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero({ profile }) {
  const data = profile || {
    name: 'Muhammad Hassan Iqbal',
    title: 'Full Stack Software Engineer',
    status: 'Available for projects & full-time roles',
    shortBio: 'Detail-oriented Full Stack Developer building scalable, secure web applications using Node.js, React.js, Next.js, and modern MySQL architectures.',
    avatar: '/profile.jpg',
    socialLinks: {
      github: 'https://github.com/hassaniqbalo3',
      linkedin: 'https://linkedin.com/in/muhammad-hassan-iqbal',
      email: 'mailto:mhassaniqbal18@gmail.com',
    },
  };

  const rawAvatar = data.avatar;
  const isDummyAvatar = !rawAvatar || rawAvatar.includes('1534528741775-53994a69daeb');
  const avatarSrc = isDummyAvatar ? '/profile.jpg' : rawAvatar;

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background blur blobs */}
      <div
        className="animate-blob"
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '420px',
          height: '420px',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.18)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="animate-blob animation-delay-2000"
        style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '380px',
          height: '380px',
          borderRadius: '9999px',
          background: 'rgba(6, 182, 212, 0.16)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left: Text Details */}
          <div>
            {/* Availability Pill */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                className="badge-pill animate-shimmer"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.8rem',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'flex',
                    height: '8px',
                    width: '8px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      borderRadius: '9999px',
                      background: '#10b981',
                      opacity: 0.75,
                      animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      borderRadius: '9999px',
                      height: '8px',
                      width: '8px',
                      background: '#10b981',
                    }}
                  />
                </span>
                <span>{data.status || 'Available for projects & full-time roles'}</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: 'var(--text-main)',
              }}
            >
              Hi, I&apos;m <span className="gradient-text">{data.name}</span>
            </h1>

            {/* Sub-heading role */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--primary-indigo-light)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={22} className="animate-spin-slow" color="#06b6d4" />
              <span>{data.title}</span>
            </div>

            {/* Intro paragraph */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '2rem',
              }}
            >
              {data.shortBio}
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              <a href="#projects" className="btn-primary">
                <span>View Selected Work</span>
                <ArrowDown size={16} />
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <a
                href={data.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="glass-card glass-card-hover"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                <Github size={20} />
              </a>

              <a
                href={data.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="glass-card glass-card-hover"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                <Linkedin size={20} />
              </a>

              <a
                href={data.socialLinks?.email || 'mailto:mhassaniqbal18@gmail.com'}
                aria-label="Send Email"
                className="glass-card glass-card-hover"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right: Avatar with Animated Spinning Halo */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'clamp(260px, 32vw, 380px)',
                aspectRatio: '1/1',
              }}
            >
              {/* Outer Blur Glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-18px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)',
                  filter: 'blur(30px)',
                  opacity: 0.55,
                  pointerEvents: 'none',
                }}
              />

              {/* Dashed Spinning Outer Ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '9999px',
                  border: '2px dashed rgba(6, 182, 212, 0.45)',
                  pointerEvents: 'none',
                }}
              />

              {/* Gradient Border Frame */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '9999px',
                  padding: '4px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    background: 'var(--bg-main)',
                  }}
                >
                  <Image
                    src={avatarSrc}
                    alt={data.name || 'Muhammad Hassan Iqbal'}
                    fill
                    sizes="(max-width: 768px) 280px, 380px"
                    priority
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="hero-avatar-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-subtle)',
          }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary-indigo-light)' }}>
            Scroll Down
          </span>
          <div
            style={{
              width: '20px',
              height: '32px',
              borderRadius: '9999px',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              justifyContent: 'center',
              padding: '4px 0',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '9999px',
                background: 'var(--primary-indigo-light)',
                animation: 'pulse 1.5s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
