import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorDashboardHeaderProps {
  doctorName?: string;
  onViewSchedule?: () => void;
}

export default function DoctorDashboardHeader({ doctorName, onViewSchedule }: DoctorDashboardHeaderProps) {
  const greeting = doctorName ? `Welcome back, Dr. ${doctorName}` : 'Welcome back';

  return (
    <PageHeader
      eyebrow="Clinic Schedule"
      title={greeting}
      subtitle="Here is a snapshot of today's visits and your upcoming patient queue."
      actions={
        <Button variant="primary" onClick={onViewSchedule}>
          <Icon name="calendar" size={18} />
          View Full Schedule
        </Button>
      }
    />
  );
}