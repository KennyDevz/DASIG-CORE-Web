import { useMemo, useState } from 'react';
import type { UserRole, ViewMode, KpiItem } from '../types/dashboard.types';
import { mockKpisByRole, mockUsersByRole } from '../data/mock-dashboard-data';
import DashboardShell from '../layouts/dashboard-shell';
import DashboardHeader from '../components/dashboard-header';
import WelcomeBanner from '../components/welcome-banner';
import KpiFilterBar from '../components/kpi-filter-bar';
import CreateKpiButton from '../components/create-kpi-button';
import DashboardViewToggle from '../components/dashboard-view-toggle';
import KpiGrid from '../components/kpi-grid';
import KpiModal from '../components/kpi-modal';
import KpiDeleteModal from '../components/kpi-delete-modal';
import styles from './role-based-dashboard-page.module.css';

interface RoleBasedDashboardPageProps {
  role: UserRole;
}

export default function RoleBasedDashboardPage({ role }: RoleBasedDashboardPageProps) {
  const user = mockUsersByRole[role];
  const [kpis, setKpis] = useState<KpiItem[]>(() => mockKpisByRole[role]);

  const [search, setSearch] = useState('');
  const [organization, setOrganization] = useState(
    role === 'DASIG_ADMIN' ? 'All Organizations' : user.organizationName ?? 'Organization B',
  );
  const [status, setStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Modals visibility and data context
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [kpiToEdit, setKpiToEdit] = useState<KpiItem | null>(null);
  const [kpiToDelete, setKpiToDelete] = useState<KpiItem | null>(null);

  const filteredKpis = useMemo(() => {
    return kpis.filter((kpi) => {
      const matchesSearch =
        search.trim() === '' ||
        kpi.name.toLowerCase().includes(search.toLowerCase()) ||
        kpi.description.toLowerCase().includes(search.toLowerCase());

      const matchesOrg =
        organization === 'All Organizations' || kpi.organization === organization;

      const matchesStatus = status === 'All Status' || kpi.status === status;

      return matchesSearch && matchesOrg && matchesStatus;
    });
  }, [kpis, search, organization, status]);

  const handleCreateKpi = (newKpiData: {
    name: string;
    description: string;
    target: number;
    unit: string;
    deadline: string;
    threshold: number;
    organization: string;
  }) => {
    const newKpi: KpiItem = {
      id: `kpi-${Date.now()}`,
      name: newKpiData.name,
      description: newKpiData.description,
      organization: newKpiData.organization,
      target: newKpiData.target,
      submitted: 0,
      unit: newKpiData.unit,
      deadline: newKpiData.deadline,
      status: 'On Track', // Default initial status
    };

    setKpis((prev) => [newKpi, ...prev]);
    setIsCreateOpen(false);
  };

  const handleUpdateKpi = (updatedKpiData: {
    name: string;
    description: string;
    target: number;
    unit: string;
    deadline: string;
    threshold: number;
    organization: string;
  }) => {
    if (!kpiToEdit) return;

    setKpis((prev) =>
      prev.map((item) => {
        if (item.id === kpiToEdit.id) {
          // Dynamically recalculate KPI status based on current submissions and new target
          const submitted = item.submitted;
          const target = updatedKpiData.target;
          const achievementRate = target > 0 ? (submitted / target) * 100 : 0;

          let newStatus = item.status;
          if (achievementRate >= updatedKpiData.threshold) {
            newStatus = 'On Track';
          } else if (achievementRate >= 50) {
            newStatus = 'Delayed';
          } else {
            newStatus = 'At Risk';
          }

          return {
            ...item,
            name: updatedKpiData.name,
            description: updatedKpiData.description,
            organization: updatedKpiData.organization,
            target: updatedKpiData.target,
            unit: updatedKpiData.unit,
            deadline: updatedKpiData.deadline,
            status: newStatus,
          };
        }
        return item;
      })
    );

    setKpiToEdit(null);
  };

  const handleDeleteKpi = () => {
    if (!kpiToDelete) return;
    setKpis((prev) => prev.filter((item) => item.id !== kpiToDelete.id));
    setKpiToDelete(null);
  };

  const isAdmin = role === 'DASIG_ADMIN';

  return (
    <DashboardShell role={role} kpiCount={kpis.length}>
      <div className={styles.topBar}>
        <DashboardHeader role={role} organizationName={user.organizationName} />
        <WelcomeBanner role={role} userName={user.name} />
      </div>

      {isAdmin && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <CreateKpiButton onClick={() => setIsCreateOpen(true)} />
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

      <KpiGrid
        kpis={filteredKpis}
        role={role}
        viewMode={viewMode}
        onEdit={setKpiToEdit}
        onDelete={setKpiToDelete}
      />

      {/* KPI Modals */}
      <KpiModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateKpi}
        kpi={null}
      />

      <KpiModal
        isOpen={kpiToEdit !== null}
        onClose={() => setKpiToEdit(null)}
        onSave={handleUpdateKpi}
        kpi={kpiToEdit}
      />

      <KpiDeleteModal
        isOpen={kpiToDelete !== null}
        onClose={() => setKpiToDelete(null)}
        onConfirm={handleDeleteKpi}
        kpi={kpiToDelete}
      />
    </DashboardShell>
  );
}
