import { useMemo, useState } from 'react';
import DashboardShell from '../../dashboard/layouts/dashboard-shell';
import {
  mockHistoryTotalEntries,
  mockTbiSubmissionHistory,
} from '../data/mock-history-data';
import SubmissionDetailPanel from '../components/submission-detail-panel';
import SubmissionHistoryTable from '../components/submission-history-table';
import type { SubmissionHistoryRecord } from '../types/history.types';
import styles from './tbi-submission-history-page.module.css';

const periodOptions = ['All Periods', 'Q3 2023', 'Oct 2023', 'H2 2023'];
const statusOptions = ['All Status', 'On Track', 'At Risk', 'Delayed'];
const staffOptions = ['All Staff', ...mockTbiSubmissionHistory.map((r) => r.submitter.name)];

export default function TbiSubmissionHistoryPage() {
  const [search, setSearch] = useState('');
  const [staffFilter, setStaffFilter] = useState('All Staff');
  const [periodFilter, setPeriodFilter] = useState('All Periods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedRecord, setSelectedRecord] = useState<SubmissionHistoryRecord | null>(null);

  const filteredRecords = useMemo(() => {
    return mockTbiSubmissionHistory.filter((record) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        record.id.toLowerCase().includes(query) ||
        record.submitter.name.toLowerCase().includes(query) ||
        record.kpiName.toLowerCase().includes(query);

      const matchesStaff = staffFilter === 'All Staff' || record.submitter.name === staffFilter;
      const matchesPeriod = periodFilter === 'All Periods' || record.period === periodFilter;
      const matchesStatus = statusFilter === 'All Status' || record.status === statusFilter;

      return matchesSearch && matchesStaff && matchesPeriod && matchesStatus;
    });
  }, [search, staffFilter, periodFilter, statusFilter]);

  return (
    <DashboardShell role="TBI_MANAGER" navBadges={{ history: mockTbiSubmissionHistory.length }}>
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <h1 className={styles.title}>Submission History</h1>
            <p className={styles.subtitle}>
              Review and manage KPI data submissions from your organization&apos;s staff.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryBtn}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export CSV
            </button>
            <button type="button" className={styles.primaryBtn}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
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
              placeholder="Search by ID, Staff, or KPI..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              Filters
            </span>
            <select
              className={styles.select}
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              aria-label="Filter by staff"
            >
              {staffOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
          </div>
        </section>

        <SubmissionHistoryTable
          records={filteredRecords}
          selectedId={selectedRecord?.id ?? null}
          onSelect={setSelectedRecord}
        />

        <footer className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing 1 to {filteredRecords.length} of {mockHistoryTotalEntries} entries
          </span>
          <div className={styles.paginationControls}>
            <button type="button" className={styles.pageBtn} disabled>
              Previous
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
            <span className={styles.pageEllipsis}>...</span>
            <button type="button" className={styles.pageBtn}>
              7
            </button>
            <button type="button" className={styles.pageBtn}>
              Next
            </button>
          </div>
        </footer>

        <p className={styles.copyright}>© 2026 TBI Management System. All rights reserved.</p>
      </div>

      {selectedRecord && (
        <SubmissionDetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      )}
    </DashboardShell>
  );
}
