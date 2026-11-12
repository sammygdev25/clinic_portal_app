import React from 'react';
import type { Appointment } from '../types';
import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState, Stat } from './ui';
import { Icon } from './icons';

interface ScheduleOverviewCardProps {
  appointments: Appointment[];
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  scheduled: 'primary',
  checked_in: 'soft',
  completed: 'success',
  cancelled: 'danger',
};

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '--:--';
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function ScheduleOverviewCard({ appointments }: ScheduleOverviewCardProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const today = new Date();
  const todayStr = today.toDateString();

  const todays = list.filter((a) => {
    const d = new Date(a.scheduled_at);
    return d.toDateString() === todayStr;
  });

  const scheduledCount = todays.filter((a) => a.status === 'scheduled').length;
  const checkedInCount = todays.filter((a) => a.status === 'checked_in').length;
  const completedCount = todays.filter((a) => a.status === 'completed').length;
  const cancelledCount = todays.filter((a) => a.status === 'cancelled').length;

  const sortedTodays = [...todays].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  );

  return (
    <Card>
      <CardBody>
        <CardTitle>Today's Schedule Overview</CardTitle>
        <CardMeta>
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </CardMeta>

        <div className="ds-grid ds-grid-sm" style={{ marginTop: 'var(--space-md)' }}>
          <Stat value={todays.length} label="Total Today" icon="calendar" />
          <Stat value={scheduledCount} label="Scheduled" icon="clock" />
          <Stat value={checkedInCount} label="Checked In" icon="check" />
          <Stat value={completedCount} label="Completed" icon="award" />
        </div>

        {todays.length === 0 ? (
          <EmptyState
            icon="calendar"
            title="No appointments scheduled today"
            text="Once patients book appointments, they will appear here for the day."
          />
        ) : (
          <div className="ds-stack" style={{ marginTop: 'var(--space-lg)' }}>
            {sortedTodays.slice(0, 8).map((appt) => (
              <div
                key={appt.id}
                className="ds-between"
                style={{
                  padding: 'var(--space-sm) 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
                  <Icon name="clock" size={16} />
                  <span>{formatTime(appt.scheduled_at)}</span>
                  <span className="ds-muted">
                    {(appt as any).patient_name || (appt as any).patient?.user?.first_name
                      ? `${(appt as any).patient?.user?.first_name ?? ''} ${
                          (appt as any).patient?.user?.last_name ?? ''
                        }`.trim()
                      : `Patient #${
                          typeof appt.patient === 'object' ? (appt.patient as any)?.id : appt.patient
                        }`}
                  </span>
                </div>
                <Badge tone={STATUS_TONE[appt.status] || 'neutral'}>
                  {appt.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {cancelledCount > 0 && (
          <div className="ds-small ds-muted" style={{ marginTop: 'var(--space-sm)' }}>
            {cancelledCount} appointment{cancelledCount === 1 ? '' : 's'} cancelled today
          </div>
        )}
      </CardBody>
    </Card>
  );
}