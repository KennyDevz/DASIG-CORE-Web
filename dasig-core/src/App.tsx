import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginForm from './authentication/login-form';
import RoleBasedDashboardPage from './features/dashboard/pages/role-based-dashboard-page';
import PlaceholderPage from './features/dashboard/pages/placeholder-page';
import KpiSubmissionPage from './features/kpi-submission/pages/kpi-submission-page';
import TbiSubmissionHistoryPage from './features/submission-history/pages/tbi-submission-history-page';
import type { UserRole } from './features/dashboard/types/dashboard.types';

function AssignedKpisPage({ role }: { role: UserRole }) {
  return (
    <PlaceholderPage
      role={role}
      title="Assigned KPIs"
      description="Table view of all KPIs assigned to your organization."
    />
  );
}

function SubmissionHistoryPage({ role }: { role: UserRole }) {
  if (role === 'TBI_MANAGER') {
    return <TbiSubmissionHistoryPage />;
  }

  return (
    <PlaceholderPage
      role={role}
      title="Submission History"
      description="Past KPI submissions for your organization."
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

        <Route path="/dashboard/admin" element={<RoleBasedDashboardPage role="DASIG_ADMIN" />} />

        <Route path="/dashboard/tbi/submit/:kpiId?" element={<KpiSubmissionPage role="TBI_MANAGER" />} />
        <Route path="/dashboard/tbi/assigned" element={<AssignedKpisPage role="TBI_MANAGER" />} />
        <Route path="/dashboard/tbi/history" element={<SubmissionHistoryPage role="TBI_MANAGER" />} />
        <Route path="/dashboard/tbi" element={<RoleBasedDashboardPage role="TBI_MANAGER" />} />

        <Route path="/dashboard/staff/submit/:kpiId?" element={<KpiSubmissionPage role="STAFF" />} />
        <Route path="/dashboard/staff/assigned" element={<AssignedKpisPage role="STAFF" />} />
        <Route path="/dashboard/staff/history" element={<SubmissionHistoryPage role="STAFF" />} />
        <Route path="/dashboard/staff" element={<RoleBasedDashboardPage role="STAFF" />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
