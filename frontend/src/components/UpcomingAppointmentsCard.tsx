import React from 'react';
import type { Appointment } from '../types';
import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState } from './ui';
import { Icon } from './icons';

interface UpcomingAppointmentsCardProps {
  appointments: Appointment[];
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
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

export default function UpcomingAppointmentsCard({ appointments }: UpcomingAppointmentsCardProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const upcoming = list
    .filter((appt) => appt.status === 'scheduled' || appt.status === 'checked_in')
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardBody>
        <CardTitle>Upcoming Appointments</CardTitle>
        {upcoming.length === 0 ? (
          <EmptyState
            icon="calendar"
            title="No upcoming appointments"
            text="Book a visit with your doctor to see it here."
          />
        ) : (
          <div className="ds-stack">
            {upcoming.map((appt) => (
              <div key={appt.id} className="ds-between" style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                <div className="ds-stack" style={{ gap: 'var(--space-xs)' }}>
                  <div className="ds-cluster" style={{ alignItems: 'center' }}>
                    <Icon name="calendar" size={16} />
                    <span>{formatDateTime(appt.scheduled_at)}</span>
                  </div>
                  {appt.reason ? <CardMeta>{appt.reason}</CardMeta> : null}
                </div>
                <Badge tone={statusTone(appt.status)}>{statusLabel(appt.status)}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}