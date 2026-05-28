import type { UserRole } from '../types/dashboard.types';

export interface SidebarNavItem {
  key: string;
  label: string;
}

export const sidebarNavByRole: Record<UserRole, SidebarNavItem[]> = {
  DASIG_ADMIN: [
    { key: 'dashboard', label: 'Admin Dashboard' },
    { key: 'users', label: 'User Management' },
    { key: 'alerts', label: 'Alerts' },
    { key: 'reports', label: 'Report Generation' },
  ],
  TBI_MANAGER: [
    { key: 'dashboard', label: 'TBI Dashboard' },
    { key: 'assigned', label: 'Assigned KPIs' },
    { key: 'submit', label: 'Submit KPI' },
    { key: 'history', label: 'Submissions' },
  ],
  STAFF: [
    { key: 'dashboard', label: 'Staff Dashboard' },
    { key: 'assigned', label: 'Assigned KPIs' },
    { key: 'submit', label: 'Submit KPI' },
    { key: 'history', label: 'Submission History' },
  ],
};

export function getDefaultNavKey(_role: UserRole): string {
  return 'dashboard';
}
