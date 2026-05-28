import styles from './kpi-admin-actions.module.css';

interface KpiAdminActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function KpiAdminActions({ onEdit, onDelete }: KpiAdminActionsProps) {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.iconBtn} onClick={onEdit} aria-label="Edit KPI">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <button type="button" className={`${styles.iconBtn} ${styles.delete}`} onClick={onDelete} aria-label="Delete KPI">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
