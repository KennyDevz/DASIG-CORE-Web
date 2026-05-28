import type { UserRole } from '../../dashboard/types/dashboard.types';
import DashboardShell from '../../dashboard/layouts/dashboard-shell';
import styles from './placeholder-page.module.css';

interface PlaceholderPageProps {
  role: UserRole;
  title: string;
  description: string;
}

export default function PlaceholderPage({ role, title, description }: PlaceholderPageProps) {
  return (
    <DashboardShell role={role}>
      <div className={styles.page}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.note}>This screen will be built in the next UI phase.</p>
      </div>
    </DashboardShell>
  );
}
