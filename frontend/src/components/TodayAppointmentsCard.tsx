import type { Appointment } from '../types';
import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface TodayAppointmentsCardProps {
  appointments: Appointment[];
}

function formatTime(value: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'checked_in':
      return 'primary';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    default:
      return 'soft';
  }
}

export default function TodayAppointmentsCard({ appointments }: TodayAppointmentsCardProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const todayStr = new Date().toDateString();
  const todays = list.filter((a) => new Date(a.scheduled_at).toDateString() === todayStr);
  const sorted = [...todays].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );

  return (
    <Card>
      <CardBody>
        <div className="ds-between">
          <CardTitle>Today's Appointments</CardTitle>
          <Badge tone="neutral">{sorted.length}</Badge>
        </div>
        {sorted.length === 0 ? (
          <EmptyState
            icon="calendar"
            title="No appointments today"
            text="Your schedule is clear for the rest of today."
          />
        ) : (
          <div className="ds-stack">
            {sorted.map((appt) => {
              const patientLabel =
                (appt as any).patient_name ||
                (appt as any).patient_detail?.user?.username ||
                `Patient #${appt.patient}`;
              return (
                <div key={appt.id} className="ds-between" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
                  <div>
                    <div className="ds-cluster">
                      <Icon name="clock" size={16} />
                      <strong>{formatTime(appt.scheduled_at)}</strong>
                    </div>
                    <CardMeta>{patientLabel}</CardMeta>
                    {appt.reason ? <p className="ds-small ds-muted">{appt.reason}</p> : null}
                  </div>
                  <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
}