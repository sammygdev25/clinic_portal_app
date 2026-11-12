import { Link } from 'react-router-dom';
import type { Appointment } from '../types';
import { Section, Card, CardBody, CardTitle, CardMeta, Badge, Button, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorAppointmentsContentProps {
  appointments: Appointment[];
  onComplete?: (id: number) => void;
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

export default function DoctorAppointmentsContent({ appointments, onComplete }: DoctorAppointmentsContentProps) {
  if (!appointments || appointments.length === 0) {
    return (
      <Section eyebrow="Visit list" title="Your appointments">
        <EmptyState
          icon="calendar"
          title="No appointments scheduled"
          text="Once patients book visits with you, they will show up here for review and check-in."
          action={
            <Button variant="primary" to="/staff/doctor-dashboard">
              Back to dashboard
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <Section eyebrow="Visit list" title="Your appointments" subtitle="Review scheduled, checked-in and completed visits.">
      <div className="ds-stack">
        {(Array.isArray(appointments) ? appointments : []).map((appointment: any) => (
          <Card key={appointment.id} className="ds-between">
            <CardBody>
              <div className="ds-between">
                <div>
                  <CardTitle>
                    <Link to={`/staff/patients/${appointment.patient}`}>
                      {appointment.patient_name ?? `Patient #${appointment.patient}`}
                    </Link>
                  </CardTitle>
                  <CardMeta>
                    <Icon name="clock" size={14} />{' '}
                    {appointment.scheduled_at ? new Date(appointment.scheduled_at).toLocaleString() : 'Unscheduled'}
                  </CardMeta>
                  {appointment.reason ? <p className="ds-muted ds-small">{appointment.reason}</p> : null}
                </div>
                <div className="ds-stack ds-stack-sm" style={{ alignItems: 'flex-end' }}>
                  <Badge tone={statusTone(appointment.status)}>{statusLabel(appointment.status)}</Badge>
                  <div className="ds-cluster">
                    <Button variant="ghost" size="md" to={`/staff/patients/${appointment.patient}`}>
                      <Icon name="chevron-right" size={16} /> View patient
                    </Button>
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && onComplete ? (
                      <Button variant="primary" size="md" onClick={() => onComplete(appointment.id)}>
                        <Icon name="check" size={16} /> Mark complete
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}