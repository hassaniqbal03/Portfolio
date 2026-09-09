'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { getCurrentUser, isAuthenticated } from '../../services/authService';
import Loading from '../../components/Loading';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    // Verify authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      getCurrentUser().then((u) => {
        setUser(u);
        setCheckingAuth(false);
      });
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <Loading message="Authenticating administrator session..." />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      <AdminNavbar user={user} />
      <div style={{ display: 'flex', flex: 1 }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
