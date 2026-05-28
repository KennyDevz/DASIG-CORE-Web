import type { UserRole } from '../types/dashboard.types';
import styles from './welcome-banner.module.css';

interface WelcomeBannerProps {
  role: UserRole;
  userName: string;
}

function getWelcomeLabel(role: UserRole, userName: string): string {
  if (role === 'STAFF') return 'Welcome, Staff';
  if (role === 'TBI_MANAGER') return `Welcome, ${userName}`;
  return `Welcome, ${userName}`;
}

export default function WelcomeBanner({ role, userName }: WelcomeBannerProps) {
  return <p className={styles.banner}>{getWelcomeLabel(role, userName)}</p>;
}
