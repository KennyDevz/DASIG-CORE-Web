import type { KpiStatus } from '../../dashboard/types/dashboard.types';

export type SubmissionStatus = KpiStatus;

export type StaffReviewStatus = 'Under Review' | 'Approved' | 'Returned';

export interface SupportingFile {
  id: string;
  name: string;
  size: string;
  type?: string;
}

export interface HistorySubmitter {
  name: string;
  title: string;
  location: string;
  initials: string;
  avatarColor: string;
}

export interface SubmissionHistoryRecord {
  id: string;
  submitter: HistorySubmitter;
  kpiName: string;
  period: string;
  submittedDisplay: string;
  targetDisplay: string;
  achievementPercent: number;
  achievementDisplay: string;
  status: SubmissionStatus;
  kpiTitle: string;
  reportingPeriod: string;
  targetValue: string;
  submittedValue: string;
  achievementRateLabel: string;
  files: SupportingFile[];
}

export interface StaffSubmissionHistoryRecord {
  id: string;
  kpiName: string;
  period: string;
  value: string;
  target: string;
  status: SubmissionStatus;
  date: string;
  reviewStatus: StaffReviewStatus;
  submittedValue: string;
  targetValue: string;
  achievementPercent: number;
  achievementDisplay: string;
  files: SupportingFile[];
  notes: string;
}
