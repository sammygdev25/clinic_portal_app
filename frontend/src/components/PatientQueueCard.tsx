import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface PatientQueueCardProps {
  appointments: Appointment[];
}

const statusTone: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  scheduled: 'neutral',
  checked_in: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function PatientQueueCard({ appointments }: PatientQueueCardProps) {
  const queue = (Array.isArray(appointments) ? appointments : []).filter(
    (a) => a.status === 'checked_in' || a.status === 'scheduled'
  );

  return (
    <Card>
      <CardBody>
        <CardTitle>Patient Queue</CardTitle>
        <CardMeta>Patients waiting or scheduled for today</CardMeta>
        {queue.length === 0 ? (
          <EmptyState
            icon="users"
            title="No patients in queue"
            text="Checked-in patients will appear here as they arrive."
          />
        ) : (
          <div className="ds-stack">
            {queue.map((appt) => (
              <div key={appt.id} className="ds-between ds-card" style={{ padding: 'var(--space-sm) var(--space-md)' }}>
                <div className="ds-cluster">
                  <Icon name="user" size={18} />
                  <div>
                    <div>Patient #{appt.patient}</div>
                    <div className="ds-small ds-muted">{formatTime(appt.scheduled_at)}</div>
                  </div>
                </div>
                <Badge tone={statusTone[appt.status] || 'neutral'}>
                  {appt.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}