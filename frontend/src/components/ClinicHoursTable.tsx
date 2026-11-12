import type { ClinicHours } from '../types';
import { Icon } from '../components/icons';

interface ClinicHoursTableProps {
  hours: ClinicHours[];
}

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

function formatTime(time?: string | null): string {
  if (!time) return '';
  const parts = time.split(':');
  const h = parseInt(parts[0], 10);
  const m = parts[1] || '00';
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${period}`;
}

export default function ClinicHoursTable({ hours }: ClinicHoursTableProps) {
  const list = Array.isArray(hours) ? hours : [];

  if (list.length === 0) {
    return (
      <div className="ds-empty">
        <Icon name="clock" size={28} />
        <p className="ds-muted">Clinic hours have not been published yet.</p>
      </div>
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {list.map((entry) => (
            <tr key={entry.id}>
              <td>{DAY_LABELS[entry.day_of_week] || entry.day_of_week}</td>
              <td>
                {entry.is_closed ? (
                  <span className="badge" style={{ color: 'var(--color-danger)' }}>
                    Closed
                  </span>
                ) : (
                  <span>
                    {formatTime(entry.open_time)} &ndash; {formatTime(entry.close_time)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}