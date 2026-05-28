import type { KpiStatus } from '../types/dashboard.types';
import styles from './kpi-progress-bar.module.css';

interface KpiProgressBarProps {
  percentage: number;
  status: KpiStatus;
}

export default function KpiProgressBar({ percentage, status }: KpiProgressBarProps) {
  const tone =
    status === 'On Track' ? styles.onTrack : status === 'Delayed' ? styles.delayed : styles.atRisk;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={`${styles.fill} ${tone}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.label}>{percentage}%</span>
    </div>
  );
}
