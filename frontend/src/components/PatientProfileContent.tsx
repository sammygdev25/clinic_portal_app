import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Button, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface PatientProfileContentProps {
  appointments: Appointment[];
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'confirmed':
      return 'primary';
    default:
      return 'soft';
  }
}

export default function PatientProfileContent({ appointments }: PatientProfileContentProps) {
  return (
    <Section
      eyebrow="Your Care"
      title="Recent Appointments"
      subtitle="A quick look at your upcoming and past visits with our clinic."
    >
      {appointments.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No appointments yet"
          text="Book a visit with one of our doctors to get started on your care journey."
          action={<Button to="/appointments" variant="primary">Book an appointment</Button>}
        />
      ) : (
        <Grid size="md" cols={3}>
          {(Array.isArray(appointments) ? appointments : []).map((appt) => (
            <Card key={appt.id} to="/visit-history">
              <CardBody>
                <CardTitle>
                  {appt.reason || 'General consultation'}
                </CardTitle>
                <CardMeta>
                  <Icon name="calendar" size={14} />
                  {new Date(appt.scheduled_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </CardMeta>
                <CardFooter>
                  <Badge tone={statusTone(appt.status)}>{appt.status}</Badge>
                  <Icon name="arrow-right" size={16} />
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}