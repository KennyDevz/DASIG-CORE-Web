import type { UserRole } from '../../dashboard/types/dashboard.types';
import { mockKpisByRole } from '../../dashboard/data/mock-dashboard-data';

export function getAssignableKpis(role: UserRole) {
  if (role === 'DASIG_ADMIN') return [];
  return mockKpisByRole[role];
}

export function findKpiById(role: UserRole, kpiId: string) {
  return getAssignableKpis(role).find((kpi) => kpi.id === kpiId) ?? null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getTodayDateInputValue(): string {
  return new Date().toISOString().slice(0, 10);
}
