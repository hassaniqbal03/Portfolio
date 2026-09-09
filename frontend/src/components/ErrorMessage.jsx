import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({
  message = 'Unable to load content. Please try again.',
  onRetry,
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        maxWidth: '450px',
        margin: '2rem auto',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      }}
    >
      <AlertCircle
        size={36}
        style={{
          color: '#ef4444',
          margin: '0 auto 0.75rem',
        }}
      />
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        Something went wrong
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: onRetry ? '1.25rem' : 0 }}>
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-secondary"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem' }}
        >
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
