import type { SubmissionHistoryRecord } from '../types/history.types';
import styles from './submission-detail-panel.module.css';

interface SubmissionDetailPanelProps {
  record: SubmissionHistoryRecord;
  onClose: () => void;
}

export default function SubmissionDetailPanel({ record, onClose }: SubmissionDetailPanelProps) {
  const progressWidth = Math.min(record.achievementPercent, 100);

  return (
    <>
      <button type="button" className={styles.backdrop} aria-label="Close submission details" onClick={onClose} />
      <aside className={styles.panel} aria-label="Submission details">
        <header className={styles.header}>
          <div>
            <h2 className={styles.title}>Submission Details</h2>
            <p className={styles.subtitle}>
              ID: {record.id} • {record.status}
            </p>
          </div>
          <button type="button" className={styles.closeBtn} aria-label="Close panel" onClick={onClose}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Submitter Information</h3>
            <div className={styles.submitterCard}>
              <div
                className={styles.avatar}
                style={{ backgroundColor: record.submitter.avatarColor }}
                aria-hidden="true"
              >
                {record.submitter.initials}
              </div>
              <div>
                <p className={styles.submitterName}>{record.submitter.name}</p>
                <p className={styles.submitterMeta}>{record.submitter.title}</p>
                <p className={styles.submitterMeta}>{record.submitter.location}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>KPI Metrics</h3>
            <div className={styles.metricsCard}>
              <p className={styles.kpiTitle}>{record.kpiTitle}</p>
              <p className={styles.reportingPeriod}>{record.reportingPeriod}</p>

              <div className={styles.metricGrid}>
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>Target Value</span>
                  <span className={styles.metricValue}>{record.targetValue}</span>
                </div>
                <div className={styles.metricBlock}>
                  <span className={styles.metricLabel}>Submitted Value</span>
                  <span className={`${styles.metricValue} ${styles.submittedValue}`}>{record.submittedValue}</span>
                </div>
              </div>

              <div className={styles.achievementBlock}>
                <div className={styles.achievementHeader}>
                  <span className={styles.metricLabel}>Achievement Rate</span>
                  <span className={styles.achievementPercent}>{record.achievementDisplay}</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${progressWidth}%` }} />
                </div>
                <p className={styles.achievementLabel}>{record.achievementRateLabel}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Supporting Evidence</h3>
            <ul className={styles.fileList}>
              {record.files.map((file) => (
                <li key={file.id} className={styles.fileItem}>
                  <svg className={styles.fileIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
                  </svg>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>{file.size}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.exportBtn}>Export</button>
          <button type="button" className={styles.returnBtn}>Return with Comment</button>
        </footer>
      </aside>
    </>
  );
}
