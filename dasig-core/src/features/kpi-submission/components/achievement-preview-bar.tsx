import type { AchievementPreview } from '../types/submission.types';
import styles from './achievement-preview-bar.module.css';

interface AchievementPreviewBarProps {
  preview: AchievementPreview | null;
  hasValue: boolean;
}

export default function AchievementPreviewBar({ preview, hasValue }: AchievementPreviewBarProps) {
  const toneClass =
    preview?.tone === 'success'
      ? styles.success
      : preview?.tone === 'danger'
        ? styles.danger
        : styles.warning;

  const messageClass =
    preview?.tone === 'success'
      ? styles.msgSuccess
      : preview?.tone === 'danger'
        ? styles.msgDanger
        : styles.msgWarning;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>Achievement Preview</span>
        <span className={styles.percent}>{hasValue && preview ? preview.displayPercent : '—'}</span>
      </div>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${hasValue ? toneClass : styles.empty}`}
          style={{
            width: hasValue && preview ? `${Math.min(preview.percentage, 100)}%` : '0%',
          }}
        />
      </div>
      <p className={`${styles.message} ${hasValue && preview ? messageClass : styles.msgMuted}`}>
        {hasValue && preview
          ? preview.message
          : 'Enter a submitted value to preview achievement rate.'}
      </p>
    </div>
  );
}
