'use client';

import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

export default function Education({ educationList }) {
  const educations = educationList || [];

  return (
    <section id="education" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <GraduationCap size={13} color="var(--primary-indigo-light)" />
            <span>Academic Background</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Education &amp; Credentials
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
            Strong theoretical computer science foundation augmented with continuous specialized full stack training.
          </p>
        </div>

        {/* Education Cards Grid */}
        {educations.length === 0 ? (
          <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', borderRadius: '1.5rem', maxWidth: '520px', margin: '0 auto' }}>
            <GraduationCap size={36} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Education Details Being Curated</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Academic degrees and certifications added through the Admin Portal will appear here automatically.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {educations.map((edu) => (
            <div
              key={edu.id}
              className="glass-card glass-card-hover"
              style={{
                padding: '2.25rem',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '0.75rem',
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-cyan)',
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
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
                    {edu.startYear} — {edu.endYear}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--primary-cyan)',
                    marginBottom: '1rem',
                  }}
                >
                  {edu.institution}
                </p>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {edu.description}
                </p>
              </div>

              {edu.highlights && (
                <div
                  style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {edu.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          background: 'rgba(6, 182, 212, 0.08)',
                          color: 'var(--primary-cyan)',
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
