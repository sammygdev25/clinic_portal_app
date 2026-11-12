import type { Appointment } from '../types';
import { Section, EmptyState, Badge } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientDashboardRecentProps {
  appointments: Appointment[];
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
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

function doctorLabel(appointment: Appointment): string {
  const doctor = (appointment as any).doctor;
  if (doctor && typeof doctor === 'object') {
    return doctor.specialty ? `Dr. ${doctor.specialty}` : 'Your doctor';
  }
  return 'Your doctor';
}

export default function PatientDashboardRecent({ appointments }: PatientDashboardRecentProps) {
  const recent = [...(appointments || [])]
    .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
    .slice(0, 6);

  return (
    <Section eyebrow="Recent activity" title="Your recent visits" tight>
      {recent.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No visits yet"
          text="Once you book and attend an appointment at the clinic, it will show up here."
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(recent) ? recent : []).map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <span className="ds-cluster">
                      <Icon name="clock" size={16} />
                      {formatDateTime(appointment.scheduled_at)}
                    </span>
                  </td>
                  <td>{doctorLabel(appointment)}</td>
                  <td className="ds-muted">{appointment.reason || 'General visit'}</td>
                  <td>
                    <Badge tone={statusTone(appointment.status)}>
                      {appointment.status.replace('_', ' ')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}