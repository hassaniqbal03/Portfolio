import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ message = 'Loading content...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        color: 'var(--text-muted)',
      }}
    >
      <Loader2
        size={32}
        style={{
          color: 'var(--primary-indigo)',
          animation: 'spinSlow 1.5s linear infinite',
          marginBottom: '0.75rem',
        }}
      />
      <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
}
