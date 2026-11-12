import React, { useState, useMemo } from 'react';
import { Button } from './ui';
import { Icon } from './icons';
import type { DoctorProfile, Appointment } from '../types';

interface AppointmentFormProps {
  doctors: DoctorProfile[];
  initialData?: Partial<Appointment>;
  onSubmit: (data: Partial<Appointment>) => void | Promise<void>;
  onCancel: () => void;
}

function toLocalInputValue(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AppointmentForm({ doctors, initialData, onSubmit, onCancel }: AppointmentFormProps) {
  const [doctorId, setDoctorId] = useState<string>(
    initialData?.doctor ? String(initialData.doctor) : ''
  );
  const [scheduledAt, setScheduledAt] = useState<string>(
    toLocalInputValue(initialData?.scheduled_at)
  );
  const [reason, setReason] = useState<string>(initialData?.reason || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const doctorList = useMemo(() => (Array.isArray(doctors) ? doctors : []), [doctors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!doctorId) {
      setError('Please choose a doctor to book with.');
      return;
    }
    if (!scheduledAt) {
      setError('Please choose a date and time for the visit.');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        doctor: Number(doctorId) as unknown as Appointment['doctor'],
        scheduled_at: new Date(scheduledAt).toISOString(),
        reason,
      });
    } catch (err: any) {
      setError(err?.message || 'Could not save this appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && (
        <div className="ds-alert" role="alert" style={{ borderColor: 'var(--color-danger)' }}>
          <Icon name="alert" size={16} /> {error}
        </div>
      )}

      <div className="ds-field">
        <label className="ds-label" htmlFor="appointment-doctor">
          Doctor
        </label>
        <select
          id="appointment-doctor"
          className="input"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Select a doctor...</option>
          {doctorList.map((doc) => (
            <option key={doc.id} value={doc.id}>
              Dr. {doc.specialty ? `(${doc.specialty})` : ''} — {doc.specialty}
            </option>
          ))}
        </select>
        <span className="ds-help">Choose the specialist you'd like to see for this visit.</span>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="appointment-datetime">
          Date &amp; time
        </label>
        <input
          id="appointment-datetime"
          type="datetime-local"
          className="input"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="appointment-reason">
          Reason for visit
        </label>
        <textarea
          id="appointment-reason"
          className="input"
          rows={4}
          placeholder="e.g. Annual checkup, follow-up on test results, persistent cough..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="ds-form-actions">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Booking...' : 'Book appointment'}
        </Button>
      </div>
    </form>
  );
}