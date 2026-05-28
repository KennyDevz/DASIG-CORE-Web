import type { UserRole } from '../types/dashboard.types';
import styles from './dashboard-header.module.css';

interface DashboardHeaderProps {
  role: UserRole;
  organizationName?: string | null;
}

function getTitle(role: UserRole, organizationName?: string | null): string {
  if (role === 'DASIG_ADMIN') return 'KPI Management Hub';
  return `${organizationName ?? 'Organization'} KPI Dashboard`;
}

function getDescription(role: UserRole): string {
  if (role === 'DASIG_ADMIN') {
    return 'Monitor and manage KPI assignments across all consortium organizations.';
  }
  if (role === 'TBI_MANAGER') {
    return "Focus on your TBI's assigned goals. Submit progress updates.";
  }
  return 'View assigned KPIs and record progress for your organization.';
}

export default function DashboardHeader({ role, organizationName }: DashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{getTitle(role, organizationName)}</h1>
      <p className={styles.description}>{getDescription(role)}</p>
    </div>
  );
}
