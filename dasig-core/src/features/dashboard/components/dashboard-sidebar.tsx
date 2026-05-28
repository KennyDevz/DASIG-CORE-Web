import { NavLink } from 'react-router-dom';
import type { UserRole } from '../types/dashboard.types';
import { sidebarNavByRole } from '../config/sidebar-nav-config';
import { sidebarNavPaths } from '../config/dashboard-routes';
import styles from './dashboard-sidebar.module.css';

interface DashboardSidebarProps {
  role: UserRole;
  kpiCount?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

function isNavRoutable(role: UserRole, key: string): boolean {
  if (role === 'DASIG_ADMIN') return key === 'dashboard';
  return key in sidebarNavPaths[role];
}

export default function DashboardSidebar({
  role,
  kpiCount = 0,
  isOpen = false,
  onClose,
  onLogout,
}: DashboardSidebarProps) {
  const navItems = sidebarNavByRole[role];
  const sidebarClass = [styles.sidebar, isOpen ? styles.open : ''].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClass}>
      <div className={styles.header}>
        <div className={styles.logoIcon}>D</div>
        <span className={styles.brandName}>DASIG-CORE</span>
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Close navigation menu"
          onClick={onClose}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className={styles.navSection}>
        {navItems.map((item) => {
          const path = sidebarNavPaths[role][item.key];
          const content = (
            <>
              <NavIcon navKey={item.key} />
              <span className={styles.navLabel}>{item.label}</span>
              {item.key === 'dashboard' && kpiCount > 0 && (
                <span className={styles.badge}>{kpiCount}</span>
              )}
            </>
          );

          if (isNavRoutable(role, item.key) && path) {
            return (
              <NavLink
                key={item.key}
                to={path}
                end={item.key === 'dashboard'}
                onClick={() => onClose?.()}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
              >
                {content}
              </NavLink>
            );
          }

          return (
            <button
              key={item.key}
              type="button"
              disabled
              className={`${styles.navLink} ${styles.disabledLink}`}
              title="Coming soon"
            >
              {content}
            </button>
          );
        })}
      </nav>

      <div className={styles.footerSection}>
        <button type="button" onClick={onLogout} className={styles.navLink}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavIcon({ navKey }: { navKey: string }) {
  const iconClass = styles.icon;

  switch (navKey) {
    case 'dashboard':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M4 4h6v8H4V4zm10 0h6v5h-6V4zm-10 12h6v4H4v-4zm10-3h6v7h-6v-7z" />
        </svg>
      );
    case 'users':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'alerts':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'reports':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case 'assigned':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case 'history':
    case 'submit':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
