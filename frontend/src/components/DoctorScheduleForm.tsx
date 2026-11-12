import { useState } from 'react';
import type { FormEvent } from 'react';
import { createDoctorSchedule } from '../api';
import type { DoctorProfile, DoctorSchedule } from '../types';
import { Button } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorScheduleFormProps {
  doctors: DoctorProfile[];
  onSave: (schedule: DoctorSchedule) => void;
}

const DAYS: Array<{ value: string; label: string }> = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

export default function DoctorScheduleForm({ doctors, onSave }: DoctorScheduleFormProps) {
  const safeDoctors = Array.isArray(doctors) ? doctors : [];
  const [doctorId, setDoctorId] = useState<string>(safeDoctors[0]?.id ? String(safeDoctors[0].id) : '');
  const [dayOfWeek, setDayOfWeek] = useState<string>('monday');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!doctorId) {
      setError('Please select a doctor.');
      return;
    }
    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    setSubmitting(true);
    try {
      const schedule = await createDoctorSchedule({
        doctor: Number(doctorId),
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
      } as Partial<DoctorSchedule>);
      onSave(schedule as DoctorSchedule);
      setStartTime('09:00');
      setEndTime('17:00');
    } catch (err) {
      setError('Could not save this availability slot. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      <div className="ds-field">
        <label className="ds-label" htmlFor="schedule-doctor">Doctor</label>
        <select
          id="schedule-doctor"
          className="input"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          {safeDoctors.length === 0 && <option value="">No doctors available</option>}
          {safeDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              Dr. {doc.specialty} — {doc.specialty}
            </option>
          ))}
        </select>
      </div>

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="schedule-day">Day of week</label>
          <select
            id="schedule-day"
            className="input"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="schedule-start">Start time</label>
          <input
            id="schedule-start"
            type="time"
            className="input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="schedule-end">End time</label>
          <input
            id="schedule-end"
            type="time"
            className="input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="ds-help" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
      )}

      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={submitting || safeDoctors.length === 0}>
          <Icon name="calendar" size={16} />
          {submitting ? 'Saving…' : 'Add availability slot'}
        </Button>
      </div>
    </form>
  );
}
