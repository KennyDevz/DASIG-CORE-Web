import type { UserRole } from '../../dashboard/types/dashboard.types';
import styles from './submission-role-badge.module.css';

interface SubmissionRoleBadgeProps {
  role: UserRole;
}

function getRoleLabel(role: UserRole): string {
  if (role === 'TBI_MANAGER') return 'TBI Manager';
  if (role === 'STAFF') return 'Staff';
  return 'Admin';
}

export default function SubmissionRoleBadge({ role }: SubmissionRoleBadgeProps) {
  return <span className={styles.badge}>{getRoleLabel(role)}</span>;
}
