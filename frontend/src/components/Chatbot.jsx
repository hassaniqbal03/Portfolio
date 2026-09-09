'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { sendChatMessage } from '../services/chatService';

const SUGGESTED_QUESTIONS = [
  'What are your top skills?',
  'Tell me about your experience',
  'Which full-stack projects did you build?',
  'How can I get in touch?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! 👋 I'm Hassan's Portfolio AI Assistant. Ask me anything about Hassan's full stack engineering background, skills, projects, or how to collaborate!",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText) => {
    const query = (userText || input).trim();
    if (!query || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(query);
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response?.reply || "I'm currently unable to answer. Please reach out via email to Hassan!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Oops! Could not connect to the chat API right now. Feel free to use the contact form on this page.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant Chat"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90,
            width: '58px',
            height: '58px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Sparkles
            size={14}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: '#fbbf24',
              animation: 'spinSlow 6s linear infinite',
            }}
          />
          <Bot size={26} />
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className="glass-card"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            width: 'clamp(320px, 92vw, 400px)',
            height: '560px',
            maxHeight: 'calc(100vh - 48px)',
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--border-card-hover)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1.2 }}>
                  Portfolio Assistant
                </h3>
                <span style={{ fontSize: '0.7rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '9999px',
                      background: '#10b981',
                      display: 'inline-block',
                    }}
                  />
                  AI Powered &bull; REST API Ready
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: 'var(--bg-card)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    borderBottomRightRadius: msg.sender === 'user' ? '0.25rem' : '1rem',
                    borderBottomLeftRadius: msg.sender === 'ai' ? '0.25rem' : '1rem',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    background:
                      msg.sender === 'user'
                        ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                        : 'var(--bg-secondary)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  }}
                >
                  {msg.text}
                </div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--text-subtle)',
                    marginTop: '0.25rem',
                    padding: '0 0.25rem',
                  }}
                >
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <div
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '1rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                  }}
                >
                  <Loader2 size={13} className="animate-spin-slow" color="var(--primary-indigo-light)" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div
            style={{
              padding: '0.5rem 0.75rem',
              background: 'var(--bg-main)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-indigo)';
                  e.currentTarget.style.color = 'var(--primary-indigo-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--bg-main)',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects..."
              className="input-custom"
              style={{
                padding: '0.6rem 0.85rem',
                fontSize: '0.85rem',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.75rem',
                background: input.trim() ? 'var(--primary-indigo)' : 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: input.trim() ? '#ffffff' : 'var(--text-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                flexShrink: 0,
                transition: 'all 0.2s ease',
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
