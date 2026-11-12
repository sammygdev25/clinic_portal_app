import { Grid, Stat } from '../components/ui';
import type { Appointment } from '../types';

interface ReceptionistDashboardStatsProps {
  appointments: Appointment[];
}

export default function ReceptionistDashboardStats({ appointments }: ReceptionistDashboardStatsProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const today = new Date().toDateString();

  const todaysCount = list.filter(
    (a) => new Date(a.scheduled_at).toDateString() === today
  ).length;

  const checkedInCount = list.filter((a) => a.status === 'checked_in').length;

  const scheduledCount = list.filter((a) => a.status === 'scheduled').length;

  const cancelledCount = list.filter((a) => a.status === 'cancelled').length;

  return (
    <Grid size="sm">
      <Stat
        value={todaysCount}
        label="Appointments today"
        icon="calendar"
      />
      <Stat
        value={checkedInCount}
        label="Checked in"
        icon="check"
      />
      <Stat
        value={scheduledCount}
        label="Awaiting arrival"
        icon="clock"
      />
      <Stat
        value={cancelledCount}
        label="Cancelled"
        icon="alert"
      />
    </Grid>
  );
}
