import type { UploadedDocument } from '../types/submission.types';
import { formatFileSize } from '../data/mock-submission-data';
import styles from './uploaded-document-item.module.css';

interface UploadedDocumentItemProps {
  document: UploadedDocument;
  onRemove: () => void;
}

export default function UploadedDocumentItem({ document, onRemove }: UploadedDocumentItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.fileIcon}>
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />
        </svg>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{document.name}</span>
        <span className={styles.meta}>{formatFileSize(document.size)}</span>
      </div>
      <button type="button" className={styles.removeBtn} onClick={onRemove} aria-label="Remove file">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
