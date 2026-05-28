import type { KpiItem } from '../types/dashboard.types';
import styles from './kpi-delete-modal.module.css';

interface KpiDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  kpi: KpiItem | null;
}

export default function KpiDeleteModal({ isOpen, onClose, onConfirm, kpi }: KpiDeleteModalProps) {
  if (!isOpen || !kpi) return null;

  const hasSubmissions = kpi.submitted > 0;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.body}>
          <div className={styles.iconContainer}>
            <div className={styles.iconCircle}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Delete KPI</h2>
            <p className={styles.description}>
              Are you sure you want to delete &ldquo;{kpi.name}&rdquo;?
            </p>
            {hasSubmissions && (
              <p className={styles.warningAlert}>
                This KPI has existing submissions. Deleting it will remove all associated data.
              </p>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
