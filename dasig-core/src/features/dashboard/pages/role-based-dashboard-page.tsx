import { useMemo, useState } from 'react';
import type { UserRole, ViewMode } from '../types/dashboard.types';
import { mockKpisByRole, mockUsersByRole } from '../data/mock-dashboard-data';
import DashboardShell from '../layouts/dashboard-shell';
import DashboardHeader from '../components/dashboard-header';
import WelcomeBanner from '../components/welcome-banner';
import KpiFilterBar from '../components/kpi-filter-bar';
import CreateKpiButton from '../components/create-kpi-button';
import DashboardViewToggle from '../components/dashboard-view-toggle';
import KpiGrid from '../components/kpi-grid';
import styles from './role-based-dashboard-page.module.css';

interface RoleBasedDashboardPageProps {
  role: UserRole;
}

export default function RoleBasedDashboardPage({ role }: RoleBasedDashboardPageProps) {
  const user = mockUsersByRole[role];
  const allKpis = mockKpisByRole[role];

  const [search, setSearch] = useState('');
  const [organization, setOrganization] = useState(
    role === 'DASIG_ADMIN' ? 'All Organizations' : user.organizationName ?? 'Organization B',
  );
  const [status, setStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredKpis = useMemo(() => {
    return allKpis.filter((kpi) => {
      const matchesSearch =
        search.trim() === '' ||
        kpi.name.toLowerCase().includes(search.toLowerCase()) ||
        kpi.description.toLowerCase().includes(search.toLowerCase());

      const matchesOrg =
        organization === 'All Organizations' || kpi.organization === organization;

      const matchesStatus = status === 'All Status' || kpi.status === status;

      return matchesSearch && matchesOrg && matchesStatus;
    });
  }, [allKpis, search, organization, status]);

  const isAdmin = role === 'DASIG_ADMIN';

  return (
    <DashboardShell role={role} kpiCount={allKpis.length}>
      <div className={styles.topBar}>
        <DashboardHeader role={role} organizationName={user.organizationName} />
        <WelcomeBanner role={role} userName={user.name} />
      </div>

      {isAdmin && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <CreateKpiButton />
            <DashboardViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      )}

      <KpiFilterBar
        role={role}
        lockedOrganization={user.organizationName}
        search={search}
        organization={organization}
        status={status}
        onSearchChange={setSearch}
        onOrganizationChange={setOrganization}
        onStatusChange={setStatus}
      />

      <KpiGrid kpis={filteredKpis} role={role} viewMode={viewMode} />
    </DashboardShell>
  );
}
