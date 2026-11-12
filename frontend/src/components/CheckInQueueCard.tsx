import React from 'react';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Button, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface CheckInQueueCardProps {
  appointments: Appointment[];
  onCheckIn: (id: number) => void;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'checked_in':
      return 'success';
    case 'completed':
      return 'soft';
    case 'cancelled':
      return 'danger';
    default:
      return 'primary';
  }
}

export default function CheckInQueueCard({ appointments, onCheckIn }: CheckInQueueCardProps) {
  const list = Array.isArray(appointments) ? appointments : [];
  const pending = list.filter((a) => a.status === 'scheduled');

  return (
    <Card>
      <CardBody>
        <CardTitle>Check-In Queue</CardTitle>
        <CardMeta>Patients waiting to be checked in today</CardMeta>

        {pending.length === 0 ? (
          <EmptyState
            icon="check"
            title="Queue is clear"
            text="No patients are currently waiting to be checked in."
          />
        ) : (
          <div className="ds-stack" style={{ marginTop: 'var(--space-md)' }}>
            {pending.map((appointment) => {
              const patientLabel =
                (appointment as any).patient_name ||
                (appointment as any).patient_username ||
                `Patient #${appointment.patient}`;
              const doctorLabel =
                (appointment as any).doctor_name ||
                (appointment as any).doctor_specialty ||
                `Doctor #${appointment.doctor}`;

              return (
                <div key={appointment.id} className="ds-between" style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="ds-stack" style={{ gap: 'var(--space-xs)' }}>
                    <div className="ds-cluster" style={{ gap: 'var(--space-xs)' }}>
                      <Icon name="clock" size={16} />
                      <strong>{formatTime(appointment.scheduled_at)}</strong>
                      <Badge tone={statusTone(appointment.status)}>{appointment.status.replace('_', ' ')}</Badge>
                    </div>
                    <span>{patientLabel}</span>
                    <span className="ds-small ds-muted">with {doctorLabel}</span>
                    {appointment.reason && <span className="ds-small ds-muted">Reason: {appointment.reason}</span>}
                  </div>
                  <Button variant="primary" onClick={() => onCheckIn(appointment.id)}>
                    <Icon name="check" size={16} /> Check In
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        <CardFooter>
          <span className="ds-small ds-muted">{pending.length} patient(s) waiting</span>
        </CardFooter>
      </CardBody>
    </Card>
  );
}