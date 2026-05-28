import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { KpiItem } from '../types/dashboard.types';
import styles from './kpi-modal.module.css';

interface KpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (kpiData: {
    name: string;
    description: string;
    target: number;
    unit: string;
    deadline: string;
    threshold: number;
    organization: string;
  }) => void;
  kpi: KpiItem | null;
}

export default function KpiModal({ isOpen, onClose, onSave, kpi }: KpiModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState<number | ''>('');
  const [unit, setUnit] = useState('Count');
  const [deadline, setDeadline] = useState('');
  const [threshold, setThreshold] = useState<number | ''>(80);
  const [organization, setOrganization] = useState('Organization A');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (kpi) {
        setName(kpi.name);
        setDescription(kpi.description);
        setTarget(kpi.target);
        setUnit(kpi.unit);
        setDeadline(kpi.deadline);
        setThreshold(80); // Default threshold 80% as shown in UI mockups
        setOrganization(kpi.organization);
      } else {
        setName('');
        setDescription('');
        setTarget('');
        setUnit('Count');
        // Set default deadline to a future date or leave empty
        setDeadline('');
        setThreshold(80);
        setOrganization('Organization A');
      }
      setError('');
    }
  }, [kpi, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('KPI Name is required');
      return;
    }
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    if (target === '' || Number(target) <= 0) {
      setError('Target Value must be greater than 0');
      return;
    }
    if (!deadline) {
      setError('Deadline date is required');
      return;
    }
    if (threshold === '' || Number(threshold) < 0 || Number(threshold) > 100) {
      setError('Threshold must be a percentage between 0 and 100');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      target: Number(target),
      unit,
      deadline,
      threshold: Number(threshold),
      organization,
    });
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{kpi ? 'Edit KPI' : 'Create New KPI'}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.formGroup}>
            <label className={styles.label}>
              KPI Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g., Number of Startups Incubated"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description <span className={styles.required}>*</span>
            </label>
            <textarea
              className={styles.textarea}
              placeholder="Total number of new startups enrolled in the incubation program"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Target Value <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="100"
                min="1"
                value={target}
                onChange={(e) => setTarget(e.target.value !== '' ? Number(e.target.value) : '')}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Unit <span className={styles.required}>*</span>
              </label>
              <div className={styles.selectWrapper}>
                <span className={styles.iconPrefix}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <select
                  className={styles.select}
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="Count">Count</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Currency (PHP)">Currency (PHP)</option>
                  <option value="Hours">Hours</option>
                </select>
                <span className={styles.iconSuffix}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Deadline <span className={styles.required}>*</span>
              </label>
              <div className={styles.dateWrapper}>
                <span className={styles.iconPrefix}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Threshold (%) <span className={styles.required}>*</span>
              </label>
              <input
                type="number"
                className={styles.input}
                placeholder="80"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value !== '' ? Number(e.target.value) : '')}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Assigned Organization <span className={styles.required}>*</span>
            </label>
            <div className={styles.selectWrapper}>
              <span className={styles.iconPrefix}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
                </svg>
              </span>
              <select
                className={styles.select}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              >
                <option value="Organization A">Organization A</option>
                <option value="Organization B">Organization B</option>
              </select>
              <span className={styles.iconSuffix}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {kpi ? 'Update KPI' : 'Save KPI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
