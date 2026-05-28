import { Link } from 'react-router-dom';
import type { UserRole } from '../../dashboard/types/dashboard.types';
import { sidebarNavPaths } from '../../dashboard/config/dashboard-routes';
import styles from './submission-history-link.module.css';

interface SubmissionHistoryLinkProps {
  role: UserRole;
}

export default function SubmissionHistoryLink({ role }: SubmissionHistoryLinkProps) {
  const historyPath = sidebarNavPaths[role].history;

  return (
    <p className={styles.wrapper}>
      Need to check past entries?{' '}
      <Link to={historyPath} className={styles.link}>
        View My Submission History
      </Link>
    </p>
  );
}
