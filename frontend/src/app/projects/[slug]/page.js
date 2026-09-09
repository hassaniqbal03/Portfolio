import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Chatbot from '../../../components/Chatbot';
import { getProjectBySlug, getProjects } from '../../../services/projectService';
import { ArrowLeft, Github, ExternalLink, Sparkles, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const project = await getProjectBySlug(params.slug);
    return {
      title: `${project.title} | Muhammad Hassan Iqbal`,
      description: project.shortDescription || project.fullDescription,
      openGraph: {
        title: project.title,
        description: project.shortDescription,
        images: [{ url: project.image }],
      },
    };
  } catch (error) {
    return {
      title: 'Project Details | Muhammad Hassan Iqbal',
    };
  }
}

export default async function ProjectDetailPage({ params }) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div className="container-custom">
          {/* Back Navigation */}
          <div style={{ marginBottom: '2rem' }}>
            <Link
              href="/#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Title & Meta Banner */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: 'var(--primary-indigo-light)',
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    background: 'rgba(245, 158, 11, 0.12)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    color: '#fbbf24',
                  }}
                >
                  <Sparkles size={12} />
                  Featured Project
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--text-main)',
                marginBottom: '1rem',
              }}
            >
              {project.title}
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '750px',
                marginBottom: '2rem',
              }}
            >
              {project.shortDescription}
            </p>

            {/* Action Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github size={16} />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Featured Image */}
          <div
            className="gradient-border-wrap"
            style={{ marginBottom: '3.5rem', overflow: 'hidden' }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 45vw, 520px)',
                borderRadius: '22px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1160px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Detailed Content Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }}
            className="detail-grid"
          >
            {/* Left Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Overview */}
              <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                <h2
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Project Overview
                </h2>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                  }}
                >
                  {project.fullDescription}
                </p>
              </div>

              {/* Challenges & Solution */}
              {(project.challenges || project.solution) && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {project.challenges && (
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#f59e0b' }}>
                        <ShieldAlert size={20} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>The Challenge</h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.7 }}>
                        {project.challenges}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#10b981' }}>
                        <Cpu size={20} />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Engineering Solution</h3>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.7 }}>
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
                  <h2
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      marginBottom: '1.25rem',
                      color: 'var(--text-main)',
                    }}
                  >
                    Architectural &amp; Functional Highlights
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Tech Stack & Inquiries */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    marginBottom: '1.25rem',
                    color: 'var(--text-main)',
                  }}
                >
                  Technologies Used
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
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

              {/* Next steps CTA */}
              <div
                style={{
                  borderRadius: '1.5rem',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
                  padding: '2rem',
                  color: '#ffffff',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Interested in a similar build?
                </h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Let&apos;s discuss architecture, performance benchmarks, and delivery roadmaps for your project.
                </p>
                <Link
                  href="/#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  Start a Conversation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
