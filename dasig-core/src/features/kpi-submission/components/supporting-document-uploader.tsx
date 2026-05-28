import { useRef } from 'react';
import type { UploadedDocument } from '../types/submission.types';
import UploadedDocumentItem from './uploaded-document-item';
import styles from './supporting-document-uploader.module.css';

interface SupportingDocumentUploaderProps {
  documents: UploadedDocument[];
  onAdd: (files: FileList | null) => void;
  onRemove: (id: string) => void;
}

export default function SupportingDocumentUploader({
  documents,
  onAdd,
  onRemove,
}: SupportingDocumentUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Supporting Documents</label>

      <div
        className={styles.dropzone}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onAdd(e.dataTransfer.files);
        }}
      >
        <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <p className={styles.dropTitle}>Drag and drop files here</p>
        <p className={styles.dropHint}>SVG, PNG, JPG, PDF up to 10MB</p>
        <button
          type="button"
          className={styles.browseBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className={styles.fileInput}
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.svg,.webp"
          onChange={(e) => {
            onAdd(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {documents.length > 0 && (
        <ul className={styles.list}>
          {documents.map((doc) => (
            <UploadedDocumentItem key={doc.id} document={doc} onRemove={() => onRemove(doc.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}
