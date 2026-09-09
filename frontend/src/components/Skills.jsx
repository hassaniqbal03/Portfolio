'use client';

import React from 'react';
import { Sparkles, Code2, Layers, Cpu, Server, Database, GitBranch, Layout, Network, HardDrive, Link as LinkIcon, Cloud } from 'lucide-react';

const ICON_MAP = {
  Atom: Layers,
  Layers: Layers,
  Code2: Code2,
  Layout: Layout,
  Sparkles: Sparkles,
  Server: Server,
  Cpu: Cpu,
  Network: Network,
  ShieldCheck: Cpu,
  Database: Database,
  Table: Database,
  HardDrive: HardDrive,
  GitBranch: GitBranch,
  Link: LinkIcon,
  Box: Layers,
  Cloud: Cloud,
};

export default function Skills({ skillsList }) {
  const skills = skillsList || [];

  // Group by category
  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={13} color="var(--primary-indigo-light)" />
            <span>Technical Stack</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Skills &amp; Capabilities
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '580px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Specialized toolkit refined through production project delivery, resilient backend engineering, and clean web architecture.
          </p>
        </div>

        {/* Categories Grid */}
        {Object.keys(categories).length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '1.5rem', maxWidth: '480px', margin: '0 auto' }}>
            <Layers size={36} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Skills Being Curated</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Skills added through the Admin Portal will appear here automatically.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {Object.entries(categories).map(([category, items]) => (
              <div
                key={category}
                className="glass-card glass-card-hover"
                style={{
                  padding: '2rem',
                  borderRadius: '1.5rem',
                }}
              >
              {/* Category Header Badge */}
              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    color: 'var(--primary-indigo-light)',
                  }}
                >
                  {category}
                </span>
              </div>

              {/* Skills Progress List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {items.map((skill) => {
                  const IconComp = ICON_MAP[skill.icon] || Code2;
                  const proficiency = skill.proficiency || 85;

                  return (
                    <div key={skill.id || skill.name}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <IconComp size={16} color="var(--primary-indigo-light)" />
                          <span
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'var(--text-main)',
                            }}
                          >
                            {skill.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: 'var(--text-muted)',
                          }}
                        >
                          {proficiency}%
                        </span>
                      </div>

                      {/* Progress bar container */}
                      <div
                        style={{
                          height: '8px',
                          width: '100%',
                          borderRadius: '9999px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          overflow: 'hidden',
                          padding: '1px',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${proficiency}%`,
                            borderRadius: '9999px',
                            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)',
                            boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
                            transition: 'width 1s ease-in-out',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
}
