import type { ViewMode } from '../types/dashboard.types';
import styles from './dashboard-view-toggle.module.css';

interface DashboardViewToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function DashboardViewToggle({ viewMode, onChange }: DashboardViewToggleProps) {
  return (
    <div className={styles.toggle}>
      <button
        type="button"
        className={`${styles.btn} ${viewMode === 'grid' ? styles.active : ''}`}
        onClick={() => onChange('grid')}
        aria-pressed={viewMode === 'grid'}
      >
        Grid
      </button>
      <button
        type="button"
        className={`${styles.btn} ${viewMode === 'list' ? styles.active : ''}`}
        onClick={() => onChange('list')}
        aria-pressed={viewMode === 'list'}
      >
        List
      </button>
    </div>
  );
}
