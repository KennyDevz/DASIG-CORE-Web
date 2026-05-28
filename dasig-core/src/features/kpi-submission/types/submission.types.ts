export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface SubmissionFormState {
  kpiId: string;
  period: string;
  submittedValue: string;
  submissionDate: string;
  notes: string;
  documents: UploadedDocument[];
}

export const reportingPeriods = [
  'Q1 2026',
  'Q2 2026',
  'Q3 2026',
  'Q4 2026',
];

export interface AchievementPreview {
  percentage: number;
  displayPercent: string;
  message: string;
  tone: 'success' | 'warning' | 'danger';
}

export function formatUnitLabel(unit: string): string {
  if (unit === 'Count') return 'jobs';
  if (unit === 'Percentage') return '%';
  if (unit.includes('Currency')) return 'PHP';
  if (unit === 'Hours') return 'hours';
  if (unit === 'sessions') return 'sessions';
  return unit.toLowerCase();
}

export function formatTargetDisplay(value: number, unit: string): string {
  const label = formatUnitLabel(unit);
  if (unit.includes('Currency')) {
    return `${value.toLocaleString('en-PH')} ${label}`;
  }
  if (unit === 'Percentage') {
    return `${value}${label}`;
  }
  return `${value.toLocaleString('en-US')} ${label}`;
}

export function getAchievementPreview(submitted: number, target: number): AchievementPreview {
  if (target === 0) {
    return {
      percentage: 0,
      displayPercent: '0%',
      message: 'Enter a submitted value to preview achievement rate.',
      tone: 'warning',
    };
  }

  const raw = (submitted / target) * 100;
  const percentage = Math.min(raw, 100);
  const displayPercent = `${raw.toFixed(1)}%`;

  let message: string;
  let tone: AchievementPreview['tone'];

  if (raw >= 100) {
    message = 'On target. Great progress!';
    tone = 'success';
  } else if (raw >= 80) {
    message = 'Close to target. Keep up the momentum.';
    tone = 'success';
  } else {
    message = 'Below target. Consider adding context in comments.';
    tone = 'danger';
  }

  return { percentage, displayPercent, message, tone };
}
