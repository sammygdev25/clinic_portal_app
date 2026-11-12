import type { Appointment } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Button, Stack } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorAppointmentCardProps {
  appointment: Appointment;
  onComplete: (id: number) => void;
}

function formatScheduledAt(value: string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'scheduled':
      return 'primary';
    case 'checked_in':
      return 'soft';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'neutral';
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'Scheduled';
    case 'checked_in':
      return 'Checked In';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}

export default function DoctorAppointmentCard({ appointment, onComplete }: DoctorAppointmentCardProps) {
  const patientLabel =
    (appointment as any).patient_name ||
    (appointment as any).patient_detail?.user?.username ||
    `Patient #${appointment.patient}`;

  const canComplete = appointment.status === 'checked_in' || appointment.status === 'scheduled';

  return (
    <Card>
      <CardBody>
        <Stack gap="xs">
          <div className="ds-between">
            <CardTitle>{patientLabel}</CardTitle>
            <Badge tone={statusTone(appointment.status)}>{statusLabel(appointment.status)}</Badge>
          </div>
          <CardMeta>
            <Icon name="clock" size={16} /> {formatScheduledAt(appointment.scheduled_at)}
          </CardMeta>
          {appointment.reason ? (
            <p className="ds-small ds-muted">{appointment.reason}</p>
          ) : (
            <p className="ds-small ds-muted">No reason provided for this visit.</p>
          )}
        </Stack>
      </CardBody>
      <CardFooter>
        {canComplete ? (
          <Button variant="primary" onClick={() => onComplete(appointment.id)}>
            <Icon name="check" size={16} /> Mark Completed
          </Button>
        ) : (
          <span className="ds-small ds-muted">
            {appointment.status === 'completed' ? 'Visit completed' : 'Visit cancelled'}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}