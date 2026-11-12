import { PageHeader } from '../components/ui';
import type { AuthUser } from '../contexts/AuthContext.tsx';

interface DoctorAppointmentsHeaderProps {
  user: AuthUser | null;
}

export default function DoctorAppointmentsHeader({ user }: DoctorAppointmentsHeaderProps) {
  const displayName = user?.first_name
    ? `Dr. ${user.first_name} ${user.last_name ?? ''}`.trim()
    : user?.email || 'Doctor';

  return (
    <PageHeader
      eyebrow="Clinic Schedule"
      title="Your Appointments"
      subtitle={`Signed in as ${displayName} — review today's visits and manage patient check-ins.`}
    />
  );
}