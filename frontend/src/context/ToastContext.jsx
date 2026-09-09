'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Floating Toast Notification Container */}
      <div
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '420px',
          width: 'calc(100vw - 2.5rem)',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';

          const accentColor = isSuccess
            ? '#10b981'
            : isError
            ? '#ef4444'
            : isWarning
            ? '#f59e0b'
            : '#6366f1';

          const bgGlow = isSuccess
            ? 'rgba(16, 185, 129, 0.16)'
            : isError
            ? 'rgba(239, 68, 68, 0.16)'
            : isWarning
            ? 'rgba(245, 158, 11, 0.16)'
            : 'rgba(99, 102, 241, 0.16)';

          const borderColor = isSuccess
            ? 'rgba(16, 185, 129, 0.35)'
            : isError
            ? 'rgba(239, 68, 68, 0.35)'
            : isWarning
            ? 'rgba(245, 158, 11, 0.35)'
            : 'rgba(99, 102, 241, 0.35)';

          return (
            <div
              key={toast.id}
              role="alert"
              style={{
                pointerEvents: 'auto',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0.85rem',
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${borderColor}`,
                boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 20px ${bgGlow}`,
                padding: '0.9rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#f8fafc',
                animation: 'slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Type Icon */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: bgGlow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: accentColor,
                }}
              >
                {isSuccess && <CheckCircle2 size={18} />}
                {isError && <AlertCircle size={18} />}
                {isWarning && <AlertTriangle size={18} />}
                {!isSuccess && !isError && !isWarning && <Info size={18} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: accentColor,
                    marginBottom: '0.15rem',
                  }}
                >
                  {isSuccess ? 'Success' : isError ? 'Error' : isWarning ? 'Notice' : 'Notification'}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 500, lineHeight: 1.4, color: '#f1f5f9' }}>
                  {toast.message}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '0.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                <X size={15} />
              </button>

              {/* Soft Animated Bottom Progress Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  width: '100%',
                  background: accentColor,
                  opacity: 0.85,
                  animation: `toastCountdown ${toast.duration || 4000}ms linear forwards`,
                }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
