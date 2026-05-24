import { useState } from 'react';
import styles from './Sidebar.module.css';

type NavKey = 'admin' | 'users' | 'alerts' | 'reports';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState<NavKey>('admin');

  const handleLogout = () => {
    console.log('Logging out client session...');
  };

  return (
    <aside className={styles.sidebar}>
      {/* Sidebar Header Section */}
      <div className={styles.header}>
        <div className={styles.logoIcon}>D</div>
        <span className={styles.brandName}>DASIG-CORE</span>
      </div>

      {/* Primary Links Navigation */}
      <nav className={styles.navSection}>
        <button
          onClick={() => setActiveItem('admin')}
          className={`${styles.navLink} ${activeItem === 'admin' ? styles.activeLink : ''}`}
        >
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M4 4h6v8H4V4zm10 0h6v5h-6V4zm-10 12h6v4H4v-4zm10-3h6v7h-6v-7z" />
          </svg>
          Admin Dashboard
        </button>

        <button
          onClick={() => setActiveItem('users')}
          className={`${styles.navLink} ${activeItem === 'users' ? styles.activeLink : ''}`}
        >
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          User Management
        </button>

        <button
          onClick={() => setActiveItem('alerts')}
          className={`${styles.navLink} ${activeItem === 'alerts' ? styles.activeLink : ''}`}
        >
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Alerts
        </button>

        <button
          onClick={() => setActiveItem('reports')}
          className={`${styles.navLink} ${activeItem === 'reports' ? styles.activeLink : ''}`}
        >
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
          Report Generation
        </button>
      </nav>

      {/* Footer Utility Section */}
      <div className={styles.footerSection}>
        <button onClick={handleLogout} className={styles.navLink}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}