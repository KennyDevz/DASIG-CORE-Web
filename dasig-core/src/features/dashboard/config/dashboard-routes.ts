import type { UserRole } from '../types/dashboard.types';

export const roleRoutePrefix: Record<UserRole, string> = {
  DASIG_ADMIN: '/dashboard/admin',
  TBI_MANAGER: '/dashboard/tbi',
  STAFF: '/dashboard/staff',
};

export const sidebarNavPaths: Record<UserRole, Record<string, string>> = {
  DASIG_ADMIN: {
    dashboard: '/dashboard/admin',
    users: '/dashboard/admin',
    alerts: '/dashboard/admin',
    reports: '/dashboard/admin',
  },
  TBI_MANAGER: {
    dashboard: '/dashboard/tbi',
    assigned: '/dashboard/tbi/assigned',
    history: '/dashboard/tbi/history',
    submit: '/dashboard/tbi/submit',
  },
  STAFF: {
    dashboard: '/dashboard/staff',
    assigned: '/dashboard/staff/assigned',
    submit: '/dashboard/staff/submit',
    history: '/dashboard/staff/history',
  },
};

export function getSubmitPath(role: UserRole, kpiId?: string): string {
  const base = `${roleRoutePrefix[role]}/submit`;
  return kpiId ? `${base}/${kpiId}` : base;
}

export function getDashboardPath(role: UserRole): string {
  return roleRoutePrefix[role];
}
