import { Section, Cluster, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface ReceptionistDashboardActionsProps {
  onCheckIn?: () => void;
  onManageSchedule?: () => void;
}

export default function ReceptionistDashboardActions({ onCheckIn, onManageSchedule }: ReceptionistDashboardActionsProps) {
  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm" justify="start">
        <Button variant="primary" to="/staff/checkin" onClick={onCheckIn}>
          <Icon name="check" size={16} />
          Check in patient
        </Button>
        <Button variant="secondary" to="/staff/schedule-management" onClick={onManageSchedule}>
          <Icon name="calendar" size={16} />
          Manage schedules
        </Button>
        <Button variant="secondary" to="/staff/appointments">
          <Icon name="list" size={16} />
          View appointments
        </Button>
        <Button variant="ghost" to="/staff/receptionist-dashboard">
          <Icon name="refresh" size={16} />
          Refresh overview
        </Button>
      </Cluster>
    </Section>
  );
}