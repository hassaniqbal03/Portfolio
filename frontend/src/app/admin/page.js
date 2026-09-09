'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects } from '../../services/projectService';
import { getSkills } from '../../services/skillService';
import { getMessages } from '../../services/contactService';
import { API_BASE_URL } from '../../services/api';
import Loading from '../../components/Loading';
import {
  FolderGit2,
  Sparkles,
  Mail,
  Server,
  ArrowRight,
  Plus,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projects, skills, messages] = await Promise.all([
          getProjects(),
          getSkills(),
          getMessages(),
        ]);
        setStats({
          projectsCount: projects?.length || 0,
          skillsCount: skills?.length || 0,
          messagesCount: messages?.length || 0,
        });
        setRecentMessages((messages || []).slice(0, 3));
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (loading) {
    return <Loading message="Loading dashboard metrics..." />;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Real-time status of your portfolio data and Express REST API connection.
        </p>
      </div>

      {/* Backend API Connection Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          borderLeft: '4px solid var(--primary-indigo)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '0.75rem',
              background: 'rgba(99, 102, 241, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-indigo-light)',
            }}
          >
            <Server size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
              REST API Endpoint: <code className="font-mono" style={{ color: 'var(--primary-cyan)', fontSize: '0.85rem' }}>{API_BASE_URL}</code>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Configured via <code className="font-mono">process.env.NEXT_PUBLIC_API_URL</code> with automatic offline mock fallback.
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <CheckCircle2 size={13} />
          Ready to Connect
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Projects Card */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Projects
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-indigo-light)' }}>
              <FolderGit2 size={18} />
            </div>
          </div>
          <div className="gradient-text" style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.75rem' }}>
            {stats.projectsCount}
          </div>
          <Link href="/admin/projects" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-indigo-light)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Manage Projects <ArrowRight size={13} />
          </Link>
        </div>

        {/* Skills Card */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Skills &amp; Technologies
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-cyan)' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div className="gradient-text" style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.75rem' }}>
            {stats.skillsCount}
          </div>
          <Link href="/admin/skills" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Manage Skills <ArrowRight size={13} />
          </Link>
        </div>

        {/* Messages Card */}
        <div className="glass-card glass-card-hover" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              Inquiries
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-emerald)' }}>
              <Mail size={18} />
            </div>
          </div>
          <div className="gradient-text" style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.75rem' }}>
            {stats.messagesCount}
          </div>
          <Link href="/admin/messages" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-emerald)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View Inbox <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Quick Actions & Recent Messages */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Quick Management Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              href="/admin/profile"
              className="btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}
            >
              <span>Edit Profile &amp; Bio Information</span>
            </Link>
            <Link
              href="/admin/projects"
              className="btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}
            >
              <Plus size={16} />
              <span>Add New Project</span>
            </Link>
            <Link
              href="/admin/skills"
              className="btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}
            >
              <Plus size={16} />
              <span>Add New Skill or Capability</span>
            </Link>
            <Link
              href="/admin/experience"
              className="btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', borderRadius: '0.75rem' }}
            >
              <Plus size={16} />
              <span>Add Work Experience</span>
            </Link>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Recent Contact Inquiries
            </h2>
            <Link href="/admin/messages" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-indigo-light)', textDecoration: 'none' }}>
              View all
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No messages yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {msg.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-indigo-light)', marginBottom: '0.25rem' }}>
                    {msg.subject}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
