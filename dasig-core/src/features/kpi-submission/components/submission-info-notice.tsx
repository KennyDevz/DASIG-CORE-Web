import type { UserRole } from '../../dashboard/types/dashboard.types';
import styles from './submission-info-notice.module.css';

interface SubmissionInfoNoticeProps {
  role: UserRole;
}

export default function SubmissionInfoNotice({ role }: SubmissionInfoNoticeProps) {
  const message =
    role === 'TBI_MANAGER'
      ? 'Final submissions are visible to the DASIG Admin. Once submitted, values immediately reflect in the consortium dashboard.'
      : 'Submissions are auto-applied. This KPI is configured for automatic approval. Once submitted, the values will immediately reflect in the organization\'s dashboard without requiring managerial review.';

  return (
    <div className={styles.notice} role="status">
      <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <p className={styles.text}>{message}</p>
    </div>
  );
}
