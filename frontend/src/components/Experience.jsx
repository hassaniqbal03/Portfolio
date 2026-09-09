'use client';

import React from 'react';
import { Briefcase, Calendar, Sparkles } from 'lucide-react';

export default function Experience({ experienceList }) {
  const experiences = experienceList || [];

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <Briefcase size={13} color="var(--primary-indigo-light)" />
            <span>Career Journey</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Work Experience
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '550px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Proven track record delivering scalable software, modern responsive web applications, and robust APIs.
          </p>
        </div>

        {/* Timeline Container */}
        {experiences.length === 0 ? (
          <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', borderRadius: '1.5rem', maxWidth: '520px', margin: '0 auto' }}>
            <Briefcase size={36} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Experience Journey Being Curated</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Work history and milestones added through the Admin Portal will appear here automatically.</p>
          </div>
        ) : (
          <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
            {/* Vertical gradient bar */}
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '10px',
                bottom: '10px',
                width: '2px',
                background: 'linear-gradient(180deg, #6366f1 0%, #06b6d4 50%, rgba(99, 102, 241, 0.1) 100%)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((item) => (
              <div
                key={item.id}
                style={{
                  position: 'relative',
                  paddingLeft: '3.5rem',
                }}
              >
                {/* Timeline node */}
                <div
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '18px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '9999px',
                    background: 'var(--bg-main)',
                    border: '3px solid var(--primary-indigo)',
                    boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  {item.current && (
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '9999px',
                        background: '#10b981',
                      }}
                    />
                  )}
                </div>

                {/* Experience Card */}
                <div
                  className="glass-card glass-card-hover"
                  style={{
                    padding: '2rem',
                    borderRadius: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                        }}
                      >
                        {item.jobTitle}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.925rem',
                          fontWeight: 700,
                          color: 'var(--primary-indigo-light)',
                          marginTop: '0.2rem',
                        }}
                      >
                        {item.company} &bull;{' '}
                        <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                          {item.employmentType}
                        </span>
                      </p>
                    </div>

                    {/* Date badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <Calendar size={12} />
                        {item.startDate} — {item.current ? 'Present' : item.endDate}
                      </span>
                      {item.current && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '0.25rem 0.6rem',
                            borderRadius: '9999px',
                            background: 'rgba(16, 185, 129, 0.12)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                          }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {item.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          background: 'var(--badge-bg)',
                          color: 'var(--primary-indigo-light)',
                          border: '1px solid var(--badge-border)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
