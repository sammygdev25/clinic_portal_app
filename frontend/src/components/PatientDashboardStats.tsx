import { Grid, Stat } from '../components/ui';
import type { Appointment, Bill, Document } from '../types';

interface PatientDashboardStatsProps {
  appointments: Appointment[];
  bills: Bill[];
  documents: Document[];
}

export default function PatientDashboardStats({ appointments, bills, documents }: PatientDashboardStatsProps) {
  const upcomingCount = (Array.isArray(appointments) ? appointments : []).filter(
    (a) => a.status === 'scheduled' || a.status === 'checked_in'
  ).length;

  const completedCount = (Array.isArray(appointments) ? appointments : []).filter(
    (a) => a.status === 'completed'
  ).length;

  const unpaidBillsCount = (Array.isArray(bills) ? bills : []).filter(
    (b) => b.status === 'unpaid' || b.status === 'overdue'
  ).length;

  const documentsCount = Array.isArray(documents) ? documents.length : 0;

  return (
    <Grid size="sm" cols={4}>
      <Stat
        value={upcomingCount}
        label="Upcoming Visits"
        icon="calendar"
      />
      <Stat
        value={completedCount}
        label="Past Visits"
        icon="check"
      />
      <Stat
        value={unpaidBillsCount}
        label="Unpaid Bills"
        icon="credit-card"
      />
      <Stat
        value={documentsCount}
        label="Medical Documents"
        icon="book"
      />
    </Grid>
  );
}
