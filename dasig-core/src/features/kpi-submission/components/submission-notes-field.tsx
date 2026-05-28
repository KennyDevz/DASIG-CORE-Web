import styles from './submission-notes-field.module.css';

interface SubmissionNotesFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SubmissionNotesField({ value, onChange }: SubmissionNotesFieldProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="submission-notes" className={styles.label}>
        Submission Notes <span className={styles.optional}>(Optional)</span>
      </label>
      <textarea
        id="submission-notes"
        className={styles.textarea}
        rows={4}
        placeholder="Provide additional context or reasons for missing targets..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
