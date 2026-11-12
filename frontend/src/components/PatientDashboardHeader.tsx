import { PageHeader, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientDashboardHeaderProps {
  userName: string;
  onBookAppointment: () => void;
}

export default function PatientDashboardHeader({ userName, onBookAppointment }: PatientDashboardHeaderProps) {
  return (
    <PageHeader
      eyebrow="Patient Portal"
      title={`Welcome back, ${userName}`}
      subtitle="Here's an overview of your upcoming appointments, bills, and records at the clinic."
      actions={
        <Button variant="primary" size="lg" onClick={onBookAppointment}>
          <Icon name="calendar" size={18} />
          Book Appointment
        </Button>
      }
    />
  );
}