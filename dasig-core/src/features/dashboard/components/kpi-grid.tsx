import type { UserRole, KpiItem, ViewMode } from '../types/dashboard.types';
import KpiDashboardCard from './kpi-dashboard-card';
import styles from './kpi-grid.module.css';

interface KpiGridProps {
  kpis: KpiItem[];
  role: UserRole;
  viewMode: ViewMode;
  onEdit?: (kpi: KpiItem) => void;
  onDelete?: (kpi: KpiItem) => void;
}

function getGridTitle(role: UserRole, count: number): string {
  if (role === 'DASIG_ADMIN') return `All KPIs (${count} items)`;
  return `KPI Grid (${count} items)`;
}

export default function KpiGrid({ kpis, role, viewMode, onEdit, onDelete }: KpiGridProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{getGridTitle(role, kpis.length)}</h2>
      <div className={viewMode === 'grid' ? styles.grid : styles.list}>
        {kpis.map((kpi) => (
          <KpiDashboardCard key={kpi.id} kpi={kpi} role={role} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      {kpis.length === 0 && (
        <p className={styles.empty}>No KPIs match your current filters.</p>
      )}
    </section>
  );
}
