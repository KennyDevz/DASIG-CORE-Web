import type { UserRole } from '../types/dashboard.types';
import { mockOrganizations } from '../data/mock-dashboard-data';
import styles from './kpi-filter-bar.module.css';

interface KpiFilterBarProps {
  role: UserRole;
  lockedOrganization?: string | null;
  search: string;
  organization: string;
  status: string;
  onSearchChange: (value: string) => void;
  onOrganizationChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function KpiFilterBar({
  role,
  lockedOrganization,
  search,
  organization,
  status,
  onSearchChange,
  onOrganizationChange,
  onStatusChange,
}: KpiFilterBarProps) {
  const isOrgLocked = role !== 'DASIG_ADMIN';
  const orgOptions = isOrgLocked
    ? [lockedOrganization ?? 'Organization B']
    : mockOrganizations;

  return (
    <div className={styles.bar}>
      <input
        type="search"
        className={styles.input}
        placeholder="Search KPIs..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className={styles.select}
        value={organization}
        onChange={(e) => onOrganizationChange(e.target.value)}
        disabled={isOrgLocked}
      >
        {orgOptions.map((org) => (
          <option key={org} value={org}>
            {org}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All Status">All Status</option>
        <option value="On Track">On Track</option>
        <option value="Delayed">Delayed</option>
        <option value="At Risk">At Risk</option>
      </select>
      <input type="date" className={styles.dateInput} aria-label="From date" />
      <input type="date" className={styles.dateInput} aria-label="To date" />
    </div>
  );
}
