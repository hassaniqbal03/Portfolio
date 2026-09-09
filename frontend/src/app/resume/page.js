import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, Download, ExternalLink, FileText, CheckCircle2, Shield, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Resume / Curriculum Vitae | Muhammad Hassan Iqbal',
  description: 'View and download the official Curriculum Vitae (CV) of Muhammad Hassan Iqbal, Full Stack Developer specializing in React, Next.js, Node.js, Express, and MySQL.',
};

export default function ResumePage() {
  const cvPath = '/resume.pdf';
  const cvFileName = 'M_HASSAN_IQBAL_ATS_CV.pdf';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: '6.5rem', paddingBottom: '4rem' }}>
        <div className="container-custom" style={{ maxWidth: '1100px' }}>

          {/* Top Control Bar: Back to Portfolio & Download Actions */}
          <div
            className="glass-card"
            style={{
              padding: '1.25rem 1.75rem',
              borderRadius: '1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Back to Portfolio Option */}
            <Link
              href="/"
              className="btn-secondary"
              id="back-to-portfolio-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </Link>

            {/* Middle Title / Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '0.6rem',
                  background: 'var(--badge-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-indigo)',
                }}
              >
                <FileText size={18} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, lineHeight: 1.2 }}>
                  Curriculum Vitae (CV)
                </h1>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                  Muhammad Hassan Iqbal • ATS-Optimized
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                id="open-pdf-tab-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <ExternalLink size={15} />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Quick Highlight Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div className="glass-card" style={{ padding: '1rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ color: '#10b981' }}><CheckCircle2 size={22} /></div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Available for Roles</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ color: 'var(--primary-indigo)' }}><Mail size={22} /></div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Direct Email</div>
                <a href="mailto:mhassaniqbal18@gmail.com" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                  mhassaniqbal18@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ color: 'var(--primary-indigo)' }}><MapPin size={22} /></div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Lahore, Pakistan</div>
              </div>
            </div>
          </div>

          {/* PDF Viewer Canvas Frame */}
          <div
            className="glass-card"
            style={{
              padding: '0.75rem',
              borderRadius: '1.25rem',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '820px',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                background: '#525659',
                position: 'relative',
              }}
            >
              <iframe
                src={`${cvPath}#toolbar=1&navpanes=0&scrollbar=1`}
                title="Muhammad Hassan Iqbal CV Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>

            {/* Bottom Download Banner inside Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1.25rem 1rem 0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Sparkles size={16} color="var(--primary-indigo)" />
                <span>Looking for a custom version or detailed technical references? Contact Hassan directly.</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link href="/#contact" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                  Contact Hassan
                </Link>
                <a
                  href={cvPath}
                  download={cvFileName}
                  className="btn-primary"
                  id="bottom-download-cv-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)',
                  }}
                >
                  <Download size={16} />
                  <span>Download CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
