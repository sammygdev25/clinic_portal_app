import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface ReceptionistDashboardHeaderProps {
  userName?: string;
  onManageSchedule?: () => void;
}

export default function ReceptionistDashboardHeader({ userName, onManageSchedule }: ReceptionistDashboardHeaderProps) {
  const greeting = userName ? `Welcome back, ${userName}` : 'Welcome back';

  return (
    <PageHeader
      eyebrow="Front Desk"
      title="Receptionist Dashboard"
      subtitle={`${greeting} — here's today's schedule and check-in queue at a glance.`}
      actions={
        <Button variant="primary" onClick={onManageSchedule}>
          <Icon name="calendar" size={18} />
          Manage Schedule
        </Button>
      }
    />
  );
}