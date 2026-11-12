import { Grid, Stat } from '../components/ui';
import type { Appointment } from '../types';

interface DoctorDashboardStatsProps {
  appointments: Appointment[];
}

export default function DoctorDashboardStats({ appointments }: DoctorDashboardStatsProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const today = new Date().toDateString();

  const todayCount = list.filter(
    (a) => new Date(a.scheduled_at).toDateString() === today
  ).length;

  const checkedIn = list.filter((a) => a.status === 'checked_in').length;

  const completed = list.filter((a) => a.status === 'completed').length;

  const uniquePatients = new Set(list.map((a) => a.patient)).size;

  return (
    <Grid size="sm" cols={4}>
      <Stat
        value={todayCount}
        label="Appointments today"
        icon="calendar"
      />
      <Stat
        value={checkedIn}
        label="Checked in"
        icon="check"
      />
      <Stat
        value={completed}
        label="Completed visits"
        icon="clock"
      />
      <Stat
        value={uniquePatients}
        label="Patients seen"
        icon="users"
      />
    </Grid>
  );
}
