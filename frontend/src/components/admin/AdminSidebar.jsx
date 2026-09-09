'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Mail,
  ChevronRight,
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Profile Bio', href: '/admin/profile', icon: User },
  { name: 'Skills & Tech', href: '/admin/skills', icon: Sparkles },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Contact Messages', href: '/admin/messages', icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: '240px',
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <div style={{ padding: '0 0.5rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>
          Portfolio Management
        </p>
      </div>

      {ADMIN_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              background: isActive
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)'
                : 'transparent',
              color: isActive ? 'var(--primary-indigo-light)' : 'var(--text-muted)',
              border: isActive ? '1px solid var(--badge-border)' : '1px solid transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon size={18} color={isActive ? 'var(--primary-indigo-light)' : 'inherit'} />
              <span>{item.name}</span>
            </div>
            {isActive && <ChevronRight size={14} color="var(--primary-indigo-light)" />}
          </Link>
        );
      })}
    </aside>
  );
}
