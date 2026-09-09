'use client';

import React, { useState, useEffect } from 'react';
import { getMessages, deleteMessage } from '../../../services/contactService';
import { useToast } from '../../../context/ToastContext';
import Loading from '../../../components/Loading';
import { Mail, Trash2, Calendar, Eye, X, User } from 'lucide-react';

export default function AdminMessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadData = async () => {
    try {
      const data = await getMessages();
      setMessages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
        showToast('Message deleted successfully!', 'info');
      } catch (err) {
        showToast('Error deleting message', 'error');
      }
    }
  };

  if (loading) return <Loading message="Loading incoming messages..." />;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Contact Inquiries
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Inspect messages sent through the public portfolio contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', borderRadius: '1.25rem', textAlign: 'center' }}>
          <Mail size={36} color="var(--text-subtle)" style={{ margin: '0 auto 0.75rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>Your inbox is currently empty.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="glass-card glass-card-hover"
              style={{
                padding: '1.5rem',
                borderRadius: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                    {msg.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontFamily: 'monospace' }}>
                    &lt;{msg.email}&gt;
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-indigo-light)', marginBottom: '0.35rem' }}>
                  {msg.subject}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '600px' }}>
                  {msg.message}
                </p>
              </div>

              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedMessage(msg)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary-indigo-light)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Eye size={15} />
                  <span>View</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(msg.id)}
                  style={{
                    padding: '0.45rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#ef4444',
                    cursor: 'pointer',
                  }}
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Inspection Modal */}
      {selectedMessage && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '580px', padding: '2rem', borderRadius: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {selectedMessage.subject}
                </h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  From {selectedMessage.name} ({selectedMessage.email}) on {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <button type="button" onClick={() => setSelectedMessage(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', maxHeight: '350px', overflowY: 'auto' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {selectedMessage.message}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Mail size={15} />
                <span>Reply via Email</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
