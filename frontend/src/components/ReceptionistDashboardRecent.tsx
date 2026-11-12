import React from 'react';
import { Link } from 'react-router-dom';
import { Section, Stack, EmptyState, Badge, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface ReceptionistDashboardRecentProps {
  appointments: Appointment[];
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

function getPatientId(appt: Appointment): number | undefined {
  const p: any = appt.patient;
  if (p && typeof p === 'object') return p.id;
  return p;
}

function getPatientLabel(appt: Appointment): string {
  const p: any = appt.patient;
  if (p && typeof p === 'object') {
    return p.phone || p.user?.username || `Patient #${p.id}`;
  }
  return `Patient #${p}`;
}

function getDoctorLabel(appt: Appointment): string {
  const d: any = appt.doctor;
  if (d && typeof d === 'object') {
    return d.specialty ? `Dr. ${d.user?.username || d.id} · ${d.specialty}` : `Dr. #${d.id}`;
  }
  return `Doctor #${d}`;
}

export default function ReceptionistDashboardRecent({ appointments }: ReceptionistDashboardRecentProps) {
  const recent = Array.isArray(appointments) ? appointments.slice(0, 8) : [];

  return (
    <Section eyebrow="Front desk" title="Recent activity" tight>
      {recent.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No recent check-ins or bookings"
          text="Appointments booked or checked in today will show up here as they happen."
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Scheduled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((appt) => {
                const patientId = getPatientId(appt);
                const scheduledLabel = appt.scheduled_at
                  ? new Date(appt.scheduled_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : '—';
                return (
                  <tr key={appt.id}>
                    <td>
                      {patientId ? (
                        <Link to={`/staff/patients/${patientId}`}>
                          <Stack gap="xs">
                            <span>{getPatientLabel(appt)}</span>
                            <CardMeta>
                              <Icon name="user" size={14} /> View chart
                            </CardMeta>
                          </Stack>
                        </Link>
                      ) : (
                        getPatientLabel(appt)
                      )}
                    </td>
                    <td>{getDoctorLabel(appt)}</td>
                    <td>{scheduledLabel}</td>
                    <td>
                      <Badge tone={statusTone(appt.status)}>
                        {appt.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}