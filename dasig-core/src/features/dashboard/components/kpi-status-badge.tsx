import type { KpiStatus } from '../types/dashboard.types';
import styles from './kpi-status-badge.module.css';

interface KpiStatusBadgeProps {
  status: KpiStatus;
}

export default function KpiStatusBadge({ status }: KpiStatusBadgeProps) {
  const tone =
    status === 'On Track'
      ? styles.onTrack
      : status === 'Delayed'
        ? styles.delayed
        : styles.atRisk;

  return <span className={`${styles.badge} ${tone}`}>{status}</span>;
}
