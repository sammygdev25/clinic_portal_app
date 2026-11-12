import { Section, Cluster, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientDashboardActionsProps {
  section?: string;
  page?: string;
}

export default function PatientDashboardActions(props: PatientDashboardActionsProps) {
  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm">
        <Button variant="primary" to="/appointments">
          <Icon name="calendar" size={16} />
          Book Appointment
        </Button>
        <Button variant="secondary" to="/visit-history">
          <Icon name="book" size={16} />
          View Visit History
        </Button>
        <Button variant="secondary" to="/bills">
          <Icon name="dollar" size={16} />
          Pay Bills
        </Button>
        <Button variant="secondary" to="/documents">
          <Icon name="upload" size={16} />
          My Documents
        </Button>
        <Button variant="ghost" to="/profile">
          <Icon name="user" size={16} />
          Edit Profile
        </Button>
      </Cluster>
    </Section>
  );
}