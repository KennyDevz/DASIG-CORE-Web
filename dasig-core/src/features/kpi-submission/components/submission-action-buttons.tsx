import type { UserRole } from '../../dashboard/types/dashboard.types';
import styles from './submission-action-buttons.module.css';

interface SubmissionActionButtonsProps {
  role: UserRole;
  onCancel: () => void;
  onSaveDraft: () => void;
  disabled?: boolean;
  draftSaved?: boolean;
}

export default function SubmissionActionButtons({
  role,
  onCancel,
  onSaveDraft,
  disabled = false,
  draftSaved = false,
}: SubmissionActionButtonsProps) {
  const submitLabel = role === 'TBI_MANAGER' ? 'Submit Final KPI' : 'Submit KPI';

  return (
    <div className={styles.footer}>
      {draftSaved && <span className={styles.draftHint}>Draft saved</span>}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <div className={styles.rightGroup}>
          <button type="button" className={styles.draftBtn} onClick={onSaveDraft}>
            Save Draft
          </button>
          <button type="submit" className={styles.submitBtn} disabled={disabled}>
            <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" />
            </svg>
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
