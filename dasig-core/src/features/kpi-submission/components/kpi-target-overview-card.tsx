import type { KpiItem } from '../../dashboard/types/dashboard.types';
import { formatDeadline } from '../../dashboard/data/mock-dashboard-data';
import { formatTargetDisplay } from '../types/submission.types';
import styles from './kpi-target-overview-card.module.css';

interface KpiTargetOverviewCardProps {
  kpi: KpiItem | null;
}

export default function KpiTargetOverviewCard({ kpi }: KpiTargetOverviewCardProps) {
  if (!kpi) {
    return (
      <div className={styles.card}>
        <p className={styles.placeholder}>Select a KPI to view target details.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <span className={styles.label}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 20V10M18 20V4M6 20v-4" />
          </svg>
          Target
        </span>
        <span className={styles.value}>{formatTargetDisplay(kpi.target, kpi.unit)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.item}>
        <span className={styles.label}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Deadline
        </span>
        <span className={styles.value}>{formatDeadline(kpi.deadline)}</span>
      </div>
    </div>
  );
}
