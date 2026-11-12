import { Section, EmptyState, Badge } from '../components/ui';
import { Icon } from '../components/icons';
import type { Appointment } from '../types';

interface DoctorDashboardRecentProps {
  appointments: Appointment[];
}

function formatWhen(scheduledAt: string): string {
  const date = new Date(scheduledAt);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
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

export default function DoctorDashboardRecent({ appointments }: DoctorDashboardRecentProps) {
  const recent = [...(appointments || [])]
    .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime())
    .slice(0, 8);

  return (
    <Section eyebrow="Recent activity" title="Latest visits and bookings">
      {recent.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No recent appointments yet"
          text="As patients book or complete visits, their activity will show up here."
        />
      ) : (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>When</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(recent) ? recent : []).map((appt) => (
                <tr key={appt.id}>
                  <td>
                    <span className="ds-cluster">
                      <Icon name="user" size={16} />
                      {typeof appt.patient === 'object' && appt.patient !== null
                        ? (appt.patient as any).user?.first_name
                          ? `${(appt.patient as any).user?.first_name} ${(appt.patient as any).user?.last_name}`
                          : `Patient #${(appt.patient as any).id}`
                        : `Patient #${appt.patient}`}
                    </span>
                  </td>
                  <td>{formatWhen(appt.scheduled_at)}</td>
                  <td className="ds-muted">{appt.reason || 'No reason provided'}</td>
                  <td>
                    <Badge tone={statusTone(appt.status)}>{appt.status.replace('_', ' ')}</Badge>
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