'use client';

import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Sparkles, Layers } from 'lucide-react';

const FILTERS = ['All', 'Full Stack', 'Frontend', 'Backend'];

export default function Projects({ projectsList }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const projects = projectsList || [];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <Layers size={13} color="var(--primary-indigo-light)" />
            <span>Portfolio Showcase</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Featured Engineering Projects
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
            Showcasing full stack web applications, REST microservices, responsive UI design systems, and database architectures.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid var(--border-color)',
                  background: isActive
                    ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)'
                    : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 4px 16px rgba(99, 102, 241, 0.35)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '3.5rem 2rem',
              borderRadius: '1.5rem',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            <Layers size={36} color="var(--primary-indigo-light)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              {projects.length === 0 ? 'Projects Being Curated' : `No Projects in "${activeFilter}"`}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {projects.length === 0
                ? 'Portfolio projects added through the Admin Portal will appear here automatically.'
                : `Try selecting "All" or adding projects under "${activeFilter}" in the Admin Portal.`}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
