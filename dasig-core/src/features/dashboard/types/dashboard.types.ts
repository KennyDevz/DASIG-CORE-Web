export type UserRole = 'DASIG_ADMIN' | 'TBI_MANAGER' | 'STAFF';

export type KpiStatus = 'On Track' | 'Delayed' | 'At Risk';

export type ViewMode = 'grid' | 'list';

export interface MockUser {
  role: UserRole;
  name: string;
  organizationName: string | null;
}

export interface KpiItem {
  id: string;
  name: string;
  description: string;
  organization: string;
  target: number;
  submitted: number;
  unit: string;
  deadline: string;
  status: KpiStatus;
}

export interface DashboardFilters {
  search: string;
  organization: string;
  status: string;
}
