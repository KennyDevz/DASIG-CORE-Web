import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../types/dashboard.types';
import DashboardSidebar from '../components/dashboard-sidebar';
import styles from './dashboard-shell.module.css';

interface DashboardShellProps {
  role: UserRole;
  kpiCount?: number;
  navBadges?: Partial<Record<string, number>>;
  children: ReactNode;
}

export default function DashboardShell({
  role,
  kpiCount = 0,
  navBadges,
  children,
}: DashboardShellProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.page}>
      {sidebarOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <DashboardSidebar
        role={role}
        kpiCount={kpiCount}
        navBadges={navBadges}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => navigate('/')}
      />

      <main className={styles.main}>
        <div className={styles.mobileBar}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open navigation menu"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className={styles.mobileBrand}>DASIG-CORE</span>
        </div>
        {children}
      </main>
    </div>
  );
}
