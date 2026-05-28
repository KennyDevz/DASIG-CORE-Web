import KpiStatusBadge from '../../dashboard/components/kpi-status-badge';
import type { SubmissionHistoryRecord } from '../types/history.types';
import styles from './submission-history-table.module.css';

interface SubmissionHistoryTableProps {
  records: SubmissionHistoryRecord[];
  selectedId: string | null;
  onSelect: (record: SubmissionHistoryRecord) => void;
}

export default function SubmissionHistoryTable({
  records,
  selectedId,
  onSelect,
}: SubmissionHistoryTableProps) {
  if (records.length === 0) {
    return <p className={styles.empty}>No submissions match your search or filters.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Submission ID</th>
            <th>Staff Member</th>
            <th>KPI Name</th>
            <th>Period</th>
            <th>Submitted / Target</th>
            <th>Achiev. %</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const isSelected = selectedId === record.id;
            const achievementTone =
              record.status === 'On Track'
                ? styles.achievementGood
                : record.status === 'At Risk'
                  ? styles.achievementWarn
                  : styles.achievementBad;

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
                <td>
                  <div className={styles.staffCell}>
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: record.submitter.avatarColor }}
                      aria-hidden="true"
                    >
                      {record.submitter.initials}
                    </div>
                    <div className={styles.staffInfo}>
                      <span className={styles.staffName}>{record.submitter.name}</span>
                      <span className={styles.staffTitle}>{record.submitter.title}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.kpiCell}>{record.kpiName}</td>
                <td>{record.period}</td>
                <td>
                  <span className={styles.submittedValue}>{record.submittedDisplay}</span>
                  <span className={styles.targetValue}> ({record.targetDisplay})</span>
                </td>
                <td>
                  <span className={achievementTone}>{record.achievementDisplay}</span>
                </td>
                <td>
                  <KpiStatusBadge status={record.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
