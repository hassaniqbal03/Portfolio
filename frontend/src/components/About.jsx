'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code, Layers, Zap, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Code: Code,
  Layers: Layers,
  Zap: Zap,
  Palette: Palette,
};

function AnimatedStat({ value, duration = 2000 }) {
  const [displayValue, setDisplayValue] = useState(1);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);

  // Extract digits and any prefix / suffix (e.g., "24+" -> num: 24, suffix: "+", "100%" -> num: 100, suffix: "%")
  const match = String(value).match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : '';

  useEffect(() => {
    if (!targetNumber) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const startTime = performance.now();
          const startNum = 1;

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic: 1 - pow(1 - progress, 3)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(startNum + (targetNumber - startNum) * easeOut);

            setDisplayValue(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, duration]);

  if (!targetNumber) {
    return <span>{value}</span>;
  }

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function About({ profile, stats, aboutFeatures }) {
  const bio = profile?.fullBio || "I am a dedicated Full Stack Developer specializing in constructing interactive, high-performance web applications and scalable software systems.";
  const journey = profile?.journey || "With hands-on experience developing both enterprise web architectures and consumer-facing applications, I focus on clean system design, component reusability, and secure REST APIs.";
  const philosophy = profile?.philosophy || "I believe in writing clean, maintainable, and self-documenting code paired with thoughtful design aesthetics.";

  const features = aboutFeatures || [
    { id: 1, title: 'Clean Architecture', description: 'Writing maintainable, decoupled code following modern design patterns and clean state management.', icon: 'Code' },
    { id: 2, title: 'Modular UI Systems', description: 'Designing responsive, accessible, and scalable component libraries with CSS design tokens.', icon: 'Layers' },
    { id: 3, title: 'High-Performance APIs', description: 'Architecting secure, optimized REST APIs with Express.js and robust database indexing.', icon: 'Zap' },
    { id: 4, title: 'Modern Full Stack UX', description: 'Fusing cutting-edge frontend interfaces with resilient backend services for fluid user experiences.', icon: 'Palette' },
  ];

  const metrics = stats || [
    { label: 'Projects Delivered', value: '24+' },
    { label: 'Years Experience', value: '3+' },
    { label: 'Modern Technologies', value: '18+' },
    { label: 'Client Satisfaction', value: '100%' },
  ];

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={13} color="var(--primary-indigo-light)" />
            <span>About Me</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Get To Know Me
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Passionate about transforming complex product requirements into intuitive, elegant digital software.
          </p>
        </div>

        {/* Content Grid: Bio on Left, 4 Feature Cards on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
          className="about-grid"
        >
          {/* Bio text block */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '1.25rem',
              }}
            >
              Architecting with <span className="gradient-text">Precision &amp; Passion</span>
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              {bio}
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              {journey}
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              {philosophy}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {['React.js', 'Next.js 14', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Clean Code'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: 'var(--badge-bg)',
                    color: 'var(--primary-indigo-light)',
                    border: '1px solid var(--badge-border)',
                  }}
                >
                  <CheckCircle2 size={12} color="#10b981" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {features.map((feature) => {
              const IconComponent = ICON_MAP[feature.icon] || Code;
              return (
                <div
                  key={feature.id}
                  className="glass-card glass-card-hover"
                  style={{
                    padding: '1.75rem',
                    borderRadius: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '0.75rem',
                        background: 'rgba(99, 102, 241, 0.12)',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-indigo-light)',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <h4
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Counter Stats Banner (devdanish style gradient border) */}
        <div className="gradient-border-wrap">
          <div
            className="glass-card"
            style={{
              borderRadius: '22px',
              padding: '2.5rem 1.5rem',
              background: 'var(--bg-card)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '2rem',
                textAlign: 'center',
              }}
            >
              {metrics.map((stat, idx) => (
                <div key={idx} style={{ transition: 'transform 0.3s ease' }}>
                  <div
                    className="gradient-text"
                    style={{
                      fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                      fontWeight: 900,
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <AnimatedStat value={stat.value} duration={2200} />
                  </div>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
