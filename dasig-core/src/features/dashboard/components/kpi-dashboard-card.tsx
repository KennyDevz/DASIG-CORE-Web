import type { UserRole, KpiItem } from '../types/dashboard.types';
import {
  formatDeadline,
  formatTargetValue,
  getAchievementRate,
  getDaysLeft,
} from '../data/mock-dashboard-data';
import KpiProgressBar from './kpi-progress-bar';
import KpiStatusBadge from './kpi-status-badge';
import KpiAdminActions from './kpi-admin-actions';
import SubmitProgressLink from './submit-progress-link';
import styles from './kpi-dashboard-card.module.css';

interface KpiDashboardCardProps {
  kpi: KpiItem;
  role: UserRole;
  onEdit?: (kpi: KpiItem) => void;
  onDelete?: (kpi: KpiItem) => void;
}

export default function KpiDashboardCard({ kpi, role, onEdit, onDelete }: KpiDashboardCardProps) {
  const percentage = getAchievementRate(kpi);
  const daysLeft = getDaysLeft(kpi.deadline);
  const isAdmin = role === 'DASIG_ADMIN';

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{kpi.name}</h3>
          <p className={styles.description}>{kpi.description}</p>
        </div>
        {isAdmin && <KpiAdminActions onEdit={() => onEdit?.(kpi)} onDelete={() => onDelete?.(kpi)} />}
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <svg className={styles.metricIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M12 20V10M18 20V4M6 20v-4" />
            </svg>
            Target Value
          </span>
          <span className={styles.metricValue}>{formatTargetValue(kpi.target, kpi.unit)}</span>
          <span className={styles.metricUnit}>{kpi.unit}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>
            <svg className={styles.metricIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Deadline
          </span>
          <span className={styles.metricValue}>{formatDeadline(kpi.deadline)}</span>
          <span className={styles.metricUnit}>{daysLeft} days left</span>
        </div>
      </div>

      <KpiProgressBar percentage={percentage} status={kpi.status} />

      <div className={styles.footer}>
        <div className={styles.org}>
          <svg className={styles.orgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
          </svg>
          <span>{kpi.organization}</span>
        </div>
        <div className={styles.footerActions}>
          {!isAdmin && <SubmitProgressLink role={role} kpiId={kpi.id} />}
          <KpiStatusBadge status={kpi.status} />
        </div>
      </div>
    </article>
  );
}
