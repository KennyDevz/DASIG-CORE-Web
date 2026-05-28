import KpiStatusBadge from '../../dashboard/components/kpi-status-badge';
import type { StaffSubmissionHistoryRecord } from '../types/history.types';
import styles from './staff-submission-history-table.module.css';

interface StaffSubmissionHistoryTableProps {
  records: StaffSubmissionHistoryRecord[];
  selectedId: string | null;
  onSelect: (record: StaffSubmissionHistoryRecord) => void;
}

export default function StaffSubmissionHistoryTable({
  records,
  selectedId,
  onSelect,
}: StaffSubmissionHistoryTableProps) {
  if (records.length === 0) {
    return <p className={styles.empty}>No submissions match your search or filters.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sub ID</th>
            <th>KPI Name</th>
            <th>Period</th>
            <th>Value</th>
            <th>Target</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const isSelected = selectedId === record.id;

            return (
              <tr
                key={record.id}
                className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
                onClick={() => onSelect(record)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(record);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <td className={styles.idCell}>{record.id}</td>
                <td className={styles.kpiCell}>{record.kpiName}</td>
                <td>{record.period}</td>
                <td className={styles.valueCell}>{record.value}</td>
                <td className={styles.targetCell}>{record.target}</td>
                <td>
                  <KpiStatusBadge status={record.status} />
                </td>
                <td className={styles.dateCell}>{record.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
