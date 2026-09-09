'use client';

import React, { useState } from 'react';
import { sendContactMessage } from '../services/contactService';
import { Mail, PhoneCall, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const statusTimerRef = React.useRef(null);

  const clearStatusTimer = () => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => clearStatusTimer();
  }, []);

  const showStatusWithTimeout = (statusObj, duration = 4500) => {
    clearStatusTimer();
    setStatus(statusObj);
    statusTimerRef.current = setTimeout(() => {
      setStatus({ type: '', message: '' });
    }, duration);
  };

  const email = profile?.email || 'mhassaniqbal18@gmail.com';
  const phone = profile?.phone && !profile.phone.includes('1234567') ? profile.phone : '+92 3222765632';
  const location = profile?.location && !profile.location.includes('Remote & Hybrid Worldwide') ? profile.location : 'Lahore, Pakistan';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) {
      clearStatusTimer();
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showStatusWithTimeout({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showStatusWithTimeout({ type: 'error', message: 'Please provide a valid email address.' });
      return;
    }

    setLoading(true);
    clearStatusTimer();
    setStatus({ type: '', message: '' });

    try {
      const res = await sendContactMessage(formData);
      showStatusWithTimeout({
        type: 'success',
        message: res?.message || 'Thank you! Your message has been sent successfully.',
      }, 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const errorData = err?.response?.data;
      const details = Array.isArray(errorData?.data) && errorData.data.length > 0
        ? errorData.data.map(d => d.message).join(' ')
        : errorData?.message || 'Unable to deliver your message. Please try again or email directly.';
      showStatusWithTimeout({
        type: 'error',
        message: details,
      }, 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge-pill" style={{ marginBottom: '0.75rem' }}>
            <Mail size={13} color="var(--primary-indigo-light)" />
            <span>Get In Touch</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}
          >
            Let&apos;s Build Together
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Have a project in mind, an engineering role, or a technical inquiry? Send a message and I&apos;ll get back to you promptly.
          </p>
        </div>

        {/* 2 Column Layout: Info Cards on Left, Form on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            maxWidth: '1060px',
            margin: '0 auto',
          }}
          className="contact-grid"
        >
          {/* Left Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Card */}
            <div className="glass-card glass-card-hover" style={{ padding: '1.5rem', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  flexShrink: 0,
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email</h4>
                <a href={`mailto:${email}`} style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                  {email}
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="glass-card glass-card-hover" style={{ padding: '1.5rem', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  flexShrink: 0,
                }}
              >
                <PhoneCall size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Phone</h4>
                <a href={`tel:${phone}`} style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                  {phone}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card glass-card-hover" style={{ padding: '1.5rem', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-emerald)',
                  flexShrink: 0,
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Location</h4>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {location}
                </p>
              </div>
            </div>

            {/* Fast Response Card */}
            <div
              style={{
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
                padding: '1.75rem',
                color: '#ffffff',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                Fast Response Guarantee
              </h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.6 }}>
                Typically responds within 24 hours. For urgent inquiries, mark your subject as &ldquo;Urgent&rdquo; for prioritized handling.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
            <form onSubmit={handleSubmit} noValidate>
              {status.message && (
                <div
                  onClick={() => {
                    clearStatusTimer();
                    setStatus({ type: '', message: '' });
                  }}
                  title="Click to dismiss"
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    animation: 'fadeIn 0.3s ease-in-out',
                    background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
                    color: status.type === 'success' ? '#10b981' : '#ef4444',
                  }}
                >
                  {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span style={{ flex: 1 }}>{status.message}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.6, fontWeight: 700 }}>✕</span>
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className="input-custom"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="input-custom"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  htmlFor="contact-subject"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Job Opportunity"
                  className="input-custom"
                />
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project goals or role..."
                  required
                  className="input-custom"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '0.95rem',
                  borderRadius: '0.85rem',
                  opacity: loading ? 0.75 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin-slow" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
