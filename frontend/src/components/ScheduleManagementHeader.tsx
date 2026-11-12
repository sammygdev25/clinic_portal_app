import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface ScheduleManagementHeaderProps {
  onAddSchedule?: () => void;
}

export default function ScheduleManagementHeader({ onAddSchedule }: ScheduleManagementHeaderProps) {
  return (
    <PageHeader
      eyebrow="Receptionist tools"
      title="Schedule management"
      subtitle="Set doctor availability windows and review the appointment calendar across the clinic."
      actions={
        onAddSchedule ? (
          <Button variant="primary" onClick={onAddSchedule}>
            <Icon name="plus" size={16} />
            Add availability
          </Button>
        ) : undefined
      }
    />
  );
}