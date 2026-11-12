import type { Appointment } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Button, Stack } from './ui';
import { Icon } from './icons';

interface AppointmentCardProps {
  appointment: Appointment;
  onReschedule: (appointment: Appointment) => void;
  onCancel: (id: number) => void;
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

function formatStatus(status: string): string {
  return status
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatScheduledAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AppointmentCard({ appointment, onReschedule, onCancel }: AppointmentCardProps) {
  const doctorLabel =
    (appointment as any).doctor_name ||
    (appointment as any).doctor_specialty ||
    `Doctor #${appointment.doctor}`;

  const isActionable = appointment.status === 'scheduled' || appointment.status === 'checked_in';

  return (
    <Card>
      <CardBody>
        <Stack justify="between" align="center">
          <CardTitle>{doctorLabel}</CardTitle>
          <Badge tone={statusTone(appointment.status)}>{formatStatus(appointment.status)}</Badge>
        </Stack>
        <CardMeta>
          <Icon name="calendar" size={16} /> {formatScheduledAt(appointment.scheduled_at)}
        </CardMeta>
        {appointment.reason ? (
          <CardMeta>
            <Icon name="info" size={16} /> {appointment.reason}
          </CardMeta>
        ) : null}
        {isActionable ? (
          <CardFooter>
            <Button variant="secondary" size="md" onClick={() => onReschedule(appointment)}>
              <Icon name="edit" size={16} /> Reschedule
            </Button>
            <Button variant="danger" size="md" onClick={() => onCancel(appointment.id)}>
              <Icon name="close" size={16} /> Cancel
            </Button>
          </CardFooter>
        ) : null}
      </CardBody>
    </Card>
  );
}