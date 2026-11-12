import { Card, CardBody, CardTitle, CardMeta, Badge, Button, EmptyState, SkeletonCards, Stack } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface PatientCheckInContentProps {
  appointments: Appointment[];
  loading?: boolean;
  onCheckIn: (id: number) => void;
}

function formatTime(value: string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  if (status === 'checked_in') return 'success';
  if (status === 'completed') return 'soft';
  if (status === 'cancelled') return 'danger';
  return 'primary';
}

export default function PatientCheckInContent({ appointments, loading, onCheckIn }: PatientCheckInContentProps) {
  if (loading) {
    return <SkeletonCards count={4} />;
  }

  const queue = (Array.isArray(appointments) ? appointments : []).filter(
    (a: any) => a.status === 'scheduled' || a.status === 'checked_in'
  );

  if (queue.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No patients waiting"
        text="Once patients are scheduled for today, they will appear here ready for check-in."
      />
    );
  }

  return (
    <Stack gap="md">
      {queue.map((appointment: any) => (
        <Card key={appointment.id}>
          <CardBody>
            <Stack gap="sm">
              <div className="ds-between">
                <CardTitle>
                  {appointment.patient_name || appointment.patient?.name || `Patient #${appointment.patient}`}
                </CardTitle>
                <Badge tone={statusTone(appointment.status)}>
                  {appointment.status === 'checked_in' ? 'Checked In' : 'Scheduled'}
                </Badge>
              </div>
              <CardMeta>
                <Icon name="clock" size={16} /> {formatTime(appointment.scheduled_at)}
              </CardMeta>
              <CardMeta>
                <Icon name="user" size={16} />{' '}
                {appointment.doctor_name ? `Dr. ${appointment.doctor_name}` : `Doctor #${appointment.doctor}`}
              </CardMeta>
              {appointment.reason && (
                <CardMeta>
                  <Icon name="info" size={16} /> {appointment.reason}
                </CardMeta>
              )}
              {appointment.status === 'scheduled' && (
                <Button variant="primary" onClick={() => onCheckIn(appointment.id)}>
                  <Icon name="check" size={16} /> Check In
                </Button>
              )}
              {appointment.status === 'checked_in' && (
                <Button variant="ghost" disabled>
                  <Icon name="check" size={16} /> Waiting for doctor
                </Button>
              )}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}