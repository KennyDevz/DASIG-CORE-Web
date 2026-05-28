import type { KpiItem } from '../../dashboard/types/dashboard.types';
import { reportingPeriods, formatUnitLabel } from '../types/submission.types';
import KpiTargetOverviewCard from './kpi-target-overview-card';
import styles from './kpi-details-entry-form.module.css';

interface KpiDetailsEntryFormProps {
  kpis: KpiItem[];
  kpiId: string;
  period: string;
  submittedValue: string;
  submissionDate: string;
  onKpiChange: (kpiId: string) => void;
  onPeriodChange: (period: string) => void;
  onSubmittedValueChange: (value: string) => void;
  onSubmissionDateChange: (date: string) => void;
}

export default function KpiDetailsEntryForm({
  kpis,
  kpiId,
  period,
  submittedValue,
  submissionDate,
  onKpiChange,
  onPeriodChange,
  onSubmittedValueChange,
  onSubmissionDateChange,
}: KpiDetailsEntryFormProps) {
  const selectedKpi = kpis.find((k) => k.id === kpiId) ?? null;
  const unitSuffix = selectedKpi ? formatUnitLabel(selectedKpi.unit) : '';

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="assigned-kpi" className={styles.label}>
            Assigned KPI
          </label>
          <select
            id="assigned-kpi"
            className={styles.select}
            value={kpiId}
            onChange={(e) => onKpiChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a KPI
            </option>
            {kpis.map((kpi) => (
              <option key={kpi.id} value={kpi.id}>
                {kpi.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="reporting-period" className={styles.label}>
            Period
          </label>
          <select
            id="reporting-period"
            className={styles.select}
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            required
          >
            {reportingPeriods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <KpiTargetOverviewCard kpi={selectedKpi} />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="submitted-value" className={styles.label}>
            Submitted Value
          </label>
          <div className={styles.inputWithSuffix}>
            <input
              id="submitted-value"
              type="number"
              min="0"
              step="any"
              className={styles.input}
              placeholder="Enter value"
              value={submittedValue}
              onChange={(e) => onSubmittedValueChange(e.target.value)}
              required
            />
            {unitSuffix && <span className={styles.suffix}>{unitSuffix}</span>}
          </div>
          <span className={styles.helper}>Enter the exact numeric value achieved.</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="submission-date" className={styles.label}>
            Submission Date
          </label>
          <input
            id="submission-date"
            type="date"
            className={styles.input}
            value={submissionDate}
            onChange={(e) => onSubmissionDateChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}
