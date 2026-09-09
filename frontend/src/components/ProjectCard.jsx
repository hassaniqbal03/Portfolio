'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div
      className="glass-card glass-card-hover"
      style={{
        borderRadius: '1.5rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Thumbnail Banner */}
      <div
        style={{
          position: 'relative',
          height: '210px',
          width: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
        }}
      >
        <Image
          src={project.image || project.image_url || '/images/cws-headless-cms.jpg'}
          alt={project.title || 'Project Preview'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="project-img"
        />

        {/* Featured Badge */}
        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderRadius: '9999px',
              padding: '0.3rem 0.75rem',
              fontSize: '0.7rem',
              fontWeight: 800,
              background: 'rgba(2, 6, 23, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              zIndex: 2,
            }}
          >
            <Sparkles size={11} color="#fbbf24" />
            <span>Featured Project</span>
          </div>
        )}

        {/* Category Pill */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            borderRadius: '9999px',
            padding: '0.25rem 0.65rem',
            fontSize: '0.6875rem',
            fontWeight: 700,
            background: 'rgba(2, 6, 23, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#f8fafc',
            zIndex: 2,
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '0.75rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                color: 'var(--text-main)',
                lineHeight: 1.3,
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'color 0.2s ease',
                }}
                className="project-title-link"
              >
                {project.title}
              </Link>
            </h3>

            <Link
              href={`/projects/${project.slug}`}
              aria-label={`View details of ${project.title}`}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
              className="view-details-arrow"
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            {project.shortDescription}
          </p>
        </div>

        <div>
          {/* Tech stack chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              marginBottom: '1.5rem',
            }}
          >
            {project.technologies?.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  background: 'var(--badge-bg)',
                  color: 'var(--primary-indigo-light)',
                  border: '1px solid var(--badge-border)',
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 4 && (
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-subtle)',
                }}
              >
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {(project.liveUrl || project.live_url) && (
                <a
                  href={project.liveUrl || project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--primary-cyan)',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--primary-indigo-light)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
