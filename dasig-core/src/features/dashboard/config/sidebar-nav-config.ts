import type { UserRole } from '../types/dashboard.types';

export interface SidebarNavItem {
  key: string;
  label: string;
  section?: string;
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
    { key: 'history', label: 'Submission History' },
    { key: 'submit', label: 'Submit KPI' },
  ],
  STAFF: [
    { key: 'dashboard', label: 'Staff Dashboard', section: 'Main Menu' },
    { key: 'assigned', label: 'Assigned KPIs', section: 'Main Menu' },
    { key: 'history', label: 'Submission History', section: 'My Workspace' },
    { key: 'submit', label: 'Submit KPI', section: 'My Workspace' },
  ],
};

export function getDefaultNavKey(_role: UserRole): string {
  return 'dashboard';
}
