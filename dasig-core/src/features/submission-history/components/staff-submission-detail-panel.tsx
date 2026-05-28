import type { StaffSubmissionHistoryRecord } from '../types/history.types';
import styles from './staff-submission-detail-panel.module.css';

interface StaffSubmissionDetailPanelProps {
  record: StaffSubmissionHistoryRecord;
  onClose: () => void;
}

function reviewStatusClass(status: StaffSubmissionHistoryRecord['reviewStatus']) {
  switch (status) {
    case 'Approved':
      return styles.reviewApproved;
    case 'Returned':
      return styles.reviewReturned;
    default:
      return styles.reviewPending;
  }
}

function fileTypeIcon(type?: string) {
  if (type === 'Spreadsheet') {
    return (
      <svg className={styles.fileIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </svg>
    );
  }

  return (
    <svg className={styles.fileIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
    </svg>
  );
}

export default function StaffSubmissionDetailPanel({ record, onClose }: StaffSubmissionDetailPanelProps) {
  const progressWidth = Math.min(record.achievementPercent, 100);

  return (
    <>
      <button type="button" className={styles.backdrop} aria-label="Close submission details" onClick={onClose} />
      <aside className={styles.panel} aria-label="Submission details">
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <h2 className={styles.title}>Submission Details</h2>
              <p className={styles.subtitle}>ID: {record.id}</p>
            </div>
            <div className={styles.headerActions}>
              <span className={`${styles.reviewBadge} ${reviewStatusClass(record.reviewStatus)}`}>
                {record.reviewStatus}
              </span>
              <button type="button" className={styles.closeBtn} aria-label="Close panel" onClick={onClose}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>KPI Name</span>
              <span className={styles.detailValue}>{record.kpiName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Period</span>
              <span className={styles.detailValue}>{record.period}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Submitted Value</span>
              <span className={`${styles.detailValue} ${styles.submittedValue}`}>{record.submittedValue}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Target Value</span>
              <span className={styles.detailValue}>{record.targetValue}</span>
            </div>
          </div>

          <section className={styles.section}>
            <div className={styles.achievementHeader}>
              <span className={styles.sectionTitle}>Achievement</span>
              <span className={styles.achievementPercent}>{record.achievementDisplay}</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressWidth}%` }} />
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>
              <svg className={styles.sectionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
              </svg>
              Supporting Documents
            </h3>
            <ul className={styles.fileList}>
              {record.files.map((file) => (
                <li key={file.id} className={styles.fileItem}>
                  {fileTypeIcon(file.type)}
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileMeta}>
                      {file.size}
                      {file.type ? ` • ${file.type}` : ''}
                    </span>
                  </div>
                  <button type="button" className={styles.downloadBtn} aria-label={`Download ${file.name}`}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>
              <svg className={styles.sectionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              My Submission Notes
            </h3>
            <div className={styles.notesBox}>
              <p className={styles.notesText}>{record.notes}</p>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
