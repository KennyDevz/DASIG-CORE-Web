import { useMemo, useState } from 'react';
import DashboardShell from '../../dashboard/layouts/dashboard-shell';
import {
  mockStaffHistoryTotalEntries,
  mockStaffSubmissionHistory,
} from '../data/mock-staff-history-data';
import StaffSubmissionDetailPanel from '../components/staff-submission-detail-panel';
import StaffSubmissionHistoryTable from '../components/staff-submission-history-table';
import type { StaffSubmissionHistoryRecord } from '../types/history.types';
import styles from './staff-submission-history-page.module.css';

const periodOptions = ['All Periods', 'Q1 2026', 'Q4 2025'];
const statusOptions = ['All Status', 'On Track', 'At Risk', 'Delayed'];

export default function StaffSubmissionHistoryPage() {
  const [search, setSearch] = useState('');
  const [periodFilter, setPeriodFilter] = useState('All Periods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedRecord, setSelectedRecord] = useState<StaffSubmissionHistoryRecord | null>(null);

  const filteredRecords = useMemo(() => {
    return mockStaffSubmissionHistory.filter((record) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        record.id.toLowerCase().includes(query) ||
        record.kpiName.toLowerCase().includes(query);

      const matchesPeriod = periodFilter === 'All Periods' || record.period === periodFilter;
      const matchesStatus = statusFilter === 'All Status' || record.status === statusFilter;

      return matchesSearch && matchesPeriod && matchesStatus;
    });
  }, [search, periodFilter, statusFilter]);

  return (
    <DashboardShell role="STAFF" navBadges={{ assigned: 4 }}>
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <span className={styles.contextBadge}>Staff Context</span>
            <h1 className={styles.title}>My Submission History</h1>
            <p className={styles.subtitle}>
              View and track the status of your past KPI submissions.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryBtn}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
            </button>
            <button type="button" className={styles.primaryBtn}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export CSV
            </button>
          </div>
        </header>

        <section className={styles.filtersCard}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search by ID or KPI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className={styles.select}
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            aria-label="Filter by period"
          >
            {periodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </section>

        <StaffSubmissionHistoryTable
          records={filteredRecords}
          selectedId={selectedRecord?.id ?? null}
          onSelect={setSelectedRecord}
        />

        <footer className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing 1 to {filteredRecords.length} of {mockStaffHistoryTotalEntries} entries
          </span>
          <div className={styles.paginationControls}>
            <button type="button" className={styles.pageBtn} disabled>
              Prev
            </button>
            <button type="button" className={`${styles.pageBtn} ${styles.pageBtnActive}`}>
              1
            </button>
            <button type="button" className={styles.pageBtn}>
              2
            </button>
            <button type="button" className={styles.pageBtn}>
              3
            </button>
            <button type="button" className={styles.pageBtn}>
              Next
            </button>
          </div>
        </footer>

        <p className={styles.copyright}>© 2026 TBI Management System. All rights reserved.</p>
      </div>

      {selectedRecord && (
        <StaffSubmissionDetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </DashboardShell>
  );
}
