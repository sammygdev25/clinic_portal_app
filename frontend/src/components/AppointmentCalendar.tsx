import { useState, useMemo } from 'react';
import type { Appointment } from '../types';
import { Icon } from '../components/icons';
import { Badge } from '../components/ui';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  onSlotSelect: (date: Date) => void;
}

const HOURS = Array.from({ length: 10 }, (_, i) => 8 + i); // 8am - 5pm
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // 0 = Monday
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function statusTone(status: string): 'primary' | 'success' | 'danger' | 'neutral' {
  if (status === 'checked_in') return 'primary';
  if (status === 'completed') return 'success';
  if (status === 'cancelled') return 'danger';
  return 'neutral';
}

export default function AppointmentCalendar({ appointments, onSlotSelect }: AppointmentCalendarProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(new Date()));

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const list = Array.isArray(appointments) ? appointments : [];

  const findAppointment = (day: Date, hour: number): Appointment | undefined => {
    return list.find((a) => {
      const dt = new Date(a.scheduled_at);
      return sameDay(dt, day) && dt.getHours() === hour;
    });
  };

  const goPrevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const goNextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const goToday = () => setWeekStart(startOfWeek(new Date()));

  const handleSlotClick = (day: Date, hour: number) => {
    const existing = findAppointment(day, hour);
    if (existing) return;
    const slotDate = new Date(day);
    slotDate.setHours(hour, 0, 0, 0);
    onSlotSelect(slotDate);
  };

  const weekLabel = `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${days[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="ds-card">
      <div className="ds-card-body">
        <div className="ds-between" style={{ marginBottom: 'var(--space-md)' }}>
          <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
            <button type="button" className="btn btn-secondary" onClick={goPrevWeek} aria-label="Previous week">
              <Icon name="chevron-left" size={16} />
            </button>
            <button type="button" className="btn btn-secondary" onClick={goToday}>
              Today
            </button>
            <button type="button" className="btn btn-secondary" onClick={goNextWeek} aria-label="Next week">
              <Icon name="chevron-right" size={16} />
            </button>
          </div>
          <div className="ds-cluster" style={{ gap: 'var(--space-xs)' }}>
            <Icon name="calendar" size={16} />
            <span className="ds-small">{weekLabel}</span>
          </div>
        </div>

        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Time</th>
                {days.map((day, idx) => (
                  <th key={day.toISOString()}>
                    <div className="ds-stack" style={{ gap: 0 }}>
                      <span>{DAY_LABELS[idx]}</span>
                      <span className="ds-muted ds-small">{day.getDate()}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td className="ds-small ds-muted">{hour % 12 === 0 ? 12 : hour % 12}:00 {hour < 12 ? 'AM' : 'PM'}</td>
                  {days.map((day) => {
                    const appt = findAppointment(day, hour);
                    return (
                      <td key={day.toISOString() + hour}>
                        {appt ? (
                          <Badge tone={statusTone(appt.status)}>{appt.reason || appt.status}</Badge>
                        ) : (
                          <button
                            type="button"
                            className="ds-btn-ghost"
                            onClick={() => handleSlotClick(day, hour)}
                            aria-label={`Select ${day.toDateString()} ${hour}:00`}
                          >
                            <Icon name="plus" size={14} />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}