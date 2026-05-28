import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { UserRole } from '../../dashboard/types/dashboard.types';
import { getDashboardPath } from '../../dashboard/config/dashboard-routes';
import DashboardShell from '../../dashboard/layouts/dashboard-shell';
import {
  findKpiById,
  getAssignableKpis,
  getTodayDateInputValue,
} from '../data/mock-submission-data';
import {
  getAchievementPreview,
  reportingPeriods,
  type UploadedDocument,
} from '../types/submission.types';
import KpiDetailsEntryForm from '../components/kpi-details-entry-form';
import AchievementPreviewBar from '../components/achievement-preview-bar';
import SupportingDocumentUploader from '../components/supporting-document-uploader';
import SubmissionNotesField from '../components/submission-notes-field';
import SubmissionActionButtons from '../components/submission-action-buttons';
import SubmissionInfoNotice from '../components/submission-info-notice';
import SubmissionRoleBadge from '../components/submission-role-badge';
import SubmissionHistoryLink from '../components/submission-history-link';
import styles from './kpi-submission-page.module.css';

interface KpiSubmissionPageProps {
  role: UserRole;
}

interface DraftPayload {
  kpiId: string;
  period: string;
  submittedValue: string;
  submissionDate: string;
  notes: string;
}

function draftKey(role: UserRole) {
  return `dasig-kpi-draft-${role}`;
}

export default function KpiSubmissionPage({ role }: KpiSubmissionPageProps) {
  const navigate = useNavigate();
  const { kpiId: kpiIdParam } = useParams<{ kpiId?: string }>();
  const assignableKpis = getAssignableKpis(role);

  const [kpiId, setKpiId] = useState('');
  const [period, setPeriod] = useState(reportingPeriods[0]);
  const [submittedValue, setSubmittedValue] = useState('');
  const [submissionDate, setSubmissionDate] = useState(getTodayDateInputValue());
  const [notes, setNotes] = useState('');
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    if (kpiIdParam && findKpiById(role, kpiIdParam)) {
      setKpiId(kpiIdParam);
      return;
    }
    if (assignableKpis.length > 0 && !kpiId) {
      setKpiId(assignableKpis[0].id);
    }
  }, [kpiIdParam, role, assignableKpis, kpiId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey(role));
      if (!raw || kpiIdParam) return;
      const draft = JSON.parse(raw) as DraftPayload;
      if (draft.kpiId) setKpiId(draft.kpiId);
      if (draft.period) setPeriod(draft.period);
      if (draft.submittedValue) setSubmittedValue(draft.submittedValue);
      if (draft.submissionDate) setSubmissionDate(draft.submissionDate);
      if (draft.notes) setNotes(draft.notes);
    } catch {
      /* ignore invalid draft */
    }
  }, [role, kpiIdParam]);

  const selectedKpi = useMemo(
    () => (kpiId ? findKpiById(role, kpiId) : null),
    [role, kpiId],
  );

  const numericSubmitted = parseFloat(submittedValue);
  const hasValue = submittedValue.trim() !== '' && !Number.isNaN(numericSubmitted);
  const achievementPreview = useMemo(() => {
    if (!selectedKpi || !hasValue) return null;
    return getAchievementPreview(numericSubmitted, selectedKpi.target);
  }, [selectedKpi, hasValue, numericSubmitted]);

  const handleAddDocuments = (files: FileList | null) => {
    if (!files) return;
    const newDocs: UploadedDocument[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type || 'Unknown',
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSaveDraft = () => {
    const payload: DraftPayload = {
      kpiId,
      period,
      submittedValue,
      submissionDate,
      notes,
    };
    localStorage.setItem(draftKey(role), JSON.stringify(payload));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedKpi || !hasValue) return;
    localStorage.removeItem(draftKey(role));
    setSubmitted(true);
    setTimeout(() => navigate(getDashboardPath(role)), 1200);
  };

  const handleCancel = () => {
    navigate(getDashboardPath(role));
  };

  if (assignableKpis.length === 0) {
    return (
      <DashboardShell role={role}>
        <p className={styles.empty}>No KPIs are assigned for submission.</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role={role} kpiCount={assignableKpis.length}>
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          <SubmissionRoleBadge role={role} />
          <h1 className={styles.pageTitle}>Submit KPI Entry</h1>
        </header>

        {submitted ? (
          <div className={styles.success}>
            Submission recorded successfully. Redirecting to dashboard...
          </div>
        ) : (
          <>
            <form className={styles.formCard} onSubmit={handleSubmit}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>KPI Details &amp; Entry</h2>
                <p className={styles.cardSubtitle}>
                  Provide the final values and supporting documents for your assigned metric.
                </p>
              </div>

              <div className={styles.cardBody}>
                <KpiDetailsEntryForm
                  kpis={assignableKpis}
                  kpiId={kpiId}
                  period={period}
                  submittedValue={submittedValue}
                  submissionDate={submissionDate}
                  onKpiChange={setKpiId}
                  onPeriodChange={setPeriod}
                  onSubmittedValueChange={setSubmittedValue}
                  onSubmissionDateChange={setSubmissionDate}
                />

                <AchievementPreviewBar preview={achievementPreview} hasValue={hasValue} />

                <SupportingDocumentUploader
                  documents={documents}
                  onAdd={handleAddDocuments}
                  onRemove={handleRemoveDocument}
                />

                <SubmissionNotesField value={notes} onChange={setNotes} />

                <SubmissionInfoNotice role={role} />

                <SubmissionActionButtons
                  role={role}
                  onCancel={handleCancel}
                  onSaveDraft={handleSaveDraft}
                  disabled={!selectedKpi || !hasValue}
                  draftSaved={draftSaved}
                />
              </div>
            </form>

            <SubmissionHistoryLink role={role} />
          </>
        )}
      </div>
    </DashboardShell>
  );
}
