import { Link } from 'react-router-dom';
import type { UserRole } from '../types/dashboard.types';
import { getSubmitPath } from '../config/dashboard-routes';
import styles from './submit-progress-link.module.css';

interface SubmitProgressLinkProps {
  role: UserRole;
  kpiId: string;
}

export default function SubmitProgressLink({ role, kpiId }: SubmitProgressLinkProps) {
  return (
    <Link to={getSubmitPath(role, kpiId)} className={styles.link}>
      [ Submit Progress Value ]
    </Link>
  );
}
