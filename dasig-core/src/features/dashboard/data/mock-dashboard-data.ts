import type { KpiItem, MockUser, UserRole } from '../types/dashboard.types';

export const mockUsersByRole: Record<UserRole, MockUser> = {
  DASIG_ADMIN: {
    role: 'DASIG_ADMIN',
    name: 'Admin User',
    organizationName: null,
  },
  TBI_MANAGER: {
    role: 'TBI_MANAGER',
    name: 'Organization B Manager',
    organizationName: 'Organization B',
  },
  STAFF: {
    role: 'STAFF',
    name: 'Staff',
    organizationName: 'Organization B',
  },
};

export const mockOrganizations = [
  'All Organizations',
  'Organization A',
  'Organization B',
];

/** TBI Manager — matches Organization B KPI Dashboard design */
const tbiManagerKpis: KpiItem[] = [
  {
    id: 'tbi-1',
    name: 'Number of Startups Incubated (Org B)',
    description: 'Total startups enrolled and actively incubated under Organization B.',
    organization: 'Organization B',
    target: 51,
    submitted: 43,
    unit: 'Count',
    deadline: '2026-12-31',
    status: 'On Track',
  },
  {
    id: 'tbi-2',
    name: 'Job Creation Rate (Org B)',
    description: 'Jobs created by incubated startups within the reporting period.',
    organization: 'Organization B',
    target: 200,
    submitted: 80,
    unit: 'Count',
    deadline: '2026-09-30',
    status: 'Delayed',
  },
  {
    id: 'tbi-3',
    name: 'Startup Survival Rate (Org B)',
    description: 'Percentage of incubated startups still operating after 12 months.',
    organization: 'Organization B',
    target: 80,
    submitted: 64,
    unit: 'Percentage',
    deadline: '2026-10-15',
    status: 'On Track',
  },
  {
    id: 'tbi-4',
    name: 'Startup Funding Raised (Org B)',
    description: 'Total external funding secured by incubated startups.',
    organization: 'Organization B',
    target: 5000000,
    submitted: 1250000,
    unit: 'Currency (PHP)',
    deadline: '2026-12-31',
    status: 'At Risk',
  },
];

/** DASIG Admin — consortium-wide KPI overview */
const adminKpis: KpiItem[] = [
  {
    id: 'admin-1',
    name: 'Consortium Startup Pipeline',
    description: 'Combined startups across all member TBIs in the active pipeline.',
    organization: 'Organization A',
    target: 120,
    submitted: 98,
    unit: 'Count',
    deadline: '2026-12-31',
    status: 'On Track',
  },
  {
    id: 'admin-2',
    name: 'Cross-TBI Mentorship Hours',
    description: 'Total mentorship hours delivered consortium-wide.',
    organization: 'Organization B',
    target: 500,
    submitted: 310,
    unit: 'Hours',
    deadline: '2026-08-31',
    status: 'Delayed',
  },
  {
    id: 'admin-3',
    name: 'Average Survival Rate (All TBIs)',
    description: 'Weighted average 12-month startup survival across member organizations.',
    organization: 'Organization A',
    target: 75,
    submitted: 71,
    unit: 'Percentage',
    deadline: '2026-11-30',
    status: 'On Track',
  },
  {
    id: 'admin-4',
    name: 'Total Funding Mobilized',
    description: 'Aggregate funding raised by startups across the DASIG consortium.',
    organization: 'Organization B',
    target: 15000000,
    submitted: 9200000,
    unit: 'Currency (PHP)',
    deadline: '2026-12-31',
    status: 'On Track',
  },
];

/** Staff — organization-level operational KPIs */
const staffKpis: KpiItem[] = [
  {
    id: 'staff-1',
    name: 'Weekly Client Intake (Org B)',
    description: 'New startup applications processed per week.',
    organization: 'Organization B',
    target: 10,
    submitted: 8,
    unit: 'Count',
    deadline: '2026-06-30',
    status: 'On Track',
  },
  {
    id: 'staff-2',
    name: 'Workshop Attendance (Org B)',
    description: 'Average attendance rate for scheduled TBI workshops.',
    organization: 'Organization B',
    target: 90,
    submitted: 72,
    unit: 'Percentage',
    deadline: '2026-07-15',
    status: 'Delayed',
  },
  {
    id: 'staff-3',
    name: 'Document Compliance Rate (Org B)',
    description: 'Percentage of startup files completed on time.',
    organization: 'Organization B',
    target: 100,
    submitted: 88,
    unit: 'Percentage',
    deadline: '2026-08-01',
    status: 'On Track',
  },
];

export const mockKpisByRole: Record<UserRole, KpiItem[]> = {
  DASIG_ADMIN: adminKpis,
  TBI_MANAGER: tbiManagerKpis,
  STAFF: staffKpis,
};

export function getAchievementRate(kpi: KpiItem): number {
  if (kpi.target === 0) return 0;
  return Math.min(Math.round((kpi.submitted / kpi.target) * 100), 100);
}

export function formatDeadline(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDaysLeft(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(dateStr);
  deadline.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}

export function formatTargetValue(value: number, unit: string): string {
  if (unit.includes('Currency')) {
    return value.toLocaleString('en-PH');
  }
  return value.toLocaleString('en-US');
}

export interface MockLoginAccount {
  username: string;
  password: string;
  role: UserRole;
  dashboardPath: string;
}

/** Mock credentials for role-based dashboard preview (replace with real auth later) */
export const mockLoginAccounts: MockLoginAccount[] = [
  { username: 'admin', password: 'admin123', role: 'DASIG_ADMIN', dashboardPath: '/dashboard/admin' },
  { username: 'tbi', password: 'tbi123', role: 'TBI_MANAGER', dashboardPath: '/dashboard/tbi' },
  { username: 'staff', password: 'staff123', role: 'STAFF', dashboardPath: '/dashboard/staff' },
];

export function resolveMockLogin(username: string, password: string): MockLoginAccount | null {
  const normalized = username.trim().toLowerCase();
  return (
    mockLoginAccounts.find(
      (account) =>
        account.username.toLowerCase() === normalized && account.password === password,
    ) ?? null
  );
}

export const roleToDashboardPath: Record<UserRole, string> = {
  DASIG_ADMIN: '/dashboard/admin',
  TBI_MANAGER: '/dashboard/tbi',
  STAFF: '/dashboard/staff',
};
