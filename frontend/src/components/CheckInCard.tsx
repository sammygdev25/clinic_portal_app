import { Card, CardBody, CardMeta, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface CheckInCardProps {
  appointment: Appointment;
  onCheckIn: (id: number) => void;
}

function formatTime(scheduledAt: string): string {
  const date = new Date(scheduledAt);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function toneForStatus(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'checked_in':
      return 'success';
    case 'completed':
      return 'primary';
    case 'cancelled':
      return 'danger';
    default:
      return 'soft';
  }
}

export default function CheckInCard({ appointment, onCheckIn }: CheckInCardProps) {
  const patientLabel =
    (appointment as any).patient_name || `Patient #${appointment.patient}`;
  const doctorLabel =
    (appointment as any).doctor_name || `Dr. #${appointment.doctor}`;
  const alreadyCheckedIn =
    appointment.status === 'checked_in' ||
    appointment.status === 'completed' ||
    appointment.status === 'cancelled';

  return (
    <Card>
      <CardBody>
        <div className="ds-between">
          <div>
            <h3 className="ds-card-title">{patientLabel}</h3>
            <CardMeta>
              <Icon name="clock" size={14} /> {formatTime(appointment.scheduled_at)}
              {' · '}
              <Icon name="user" size={14} /> {doctorLabel}
            </CardMeta>
          </div>
          <Badge tone={toneForStatus(appointment.status)}>
            {appointment.status.replace('_', ' ')}
          </Badge>
        </div>
        {appointment.reason && (
          <p className="ds-small ds-muted">{appointment.reason}</p>
        )}
        <div className="ds-form-actions">
          <Button
            variant="primary"
            disabled={alreadyCheckedIn}
            onClick={() => onCheckIn(appointment.id)}
          >
            <Icon name="check" size={16} />
            {appointment.status === 'checked_in' ? 'Checked In' : 'Check In'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}