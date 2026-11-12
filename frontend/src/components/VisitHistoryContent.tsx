import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, EmptyState, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';
import { formatDate } from '../utils';

interface VisitHistoryContentProps {
  appointments: Appointment[];
  onSelectAppointment?: (appointment: Appointment) => void;
  onBookAppointment?: () => void;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'checked_in':
      return 'primary';
    case 'cancelled':
      return 'danger';
    default:
      return 'soft';
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case 'checked_in':
      return 'Checked In';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Scheduled';
  }
}

export default function VisitHistoryContent({ appointments, onSelectAppointment, onBookAppointment }: VisitHistoryContentProps) {
  if (!appointments || appointments.length === 0) {
    return (
      <Section eyebrow="Your records" title="Visit history">
        <EmptyState
          icon="calendar"
          title="No visits yet"
          text="Once you book and complete an appointment, your doctor's notes and prescriptions will show up here."
          action={
            onBookAppointment ? (
              <Button variant="primary" onClick={onBookAppointment}>
                Book an appointment
              </Button>
            ) : (
              <Button variant="primary" to="/appointments">
                Book an appointment
              </Button>
            )
          }
        />
      </Section>
    );
  }

  return (
    <Section eyebrow="Your records" title="Visit history" subtitle="Every appointment, with its outcome and any notes from your doctor.">
      <Grid size="md" cols={3}>
        {(Array.isArray(appointments) ? appointments : []).map((appointment) => (
          <Card
            key={appointment.id}
            onClick={onSelectAppointment ? () => onSelectAppointment(appointment) : undefined}
          >
            <CardBody>
              <CardTitle>{formatDate(appointment.scheduled_at)}</CardTitle>
              <CardMeta>
                {appointment.reason ? appointment.reason : 'General consultation'}
              </CardMeta>
              <Badge tone={statusTone(appointment.status)}>{statusLabel(appointment.status)}</Badge>
            </CardBody>
            <CardFooter>
              <span className="ds-cluster">
                <Icon name="arrow-right" size={16} />
                <span>View details</span>
              </span>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}