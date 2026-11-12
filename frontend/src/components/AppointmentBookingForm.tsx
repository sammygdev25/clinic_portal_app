import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Alert, Button } from '../components/ui';
import Icon from '../components/icons';
import { createAppointment } from '../api';
import type { DoctorProfile, Appointment } from '../types';

interface AppointmentBookingFormProps {
  doctors: DoctorProfile[];
  onCreated?: (appointment: Appointment) => void;
}

export default function AppointmentBookingForm({ doctors, onCreated }: AppointmentBookingFormProps) {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!doctor || !scheduledAt) {
      setError('Please choose a doctor and a date & time for your visit.');
      return;
    }
    setSubmitting(true);
    try {
      const created: any = await createAppointment({
        doctor: Number(doctor),
        scheduled_at: new Date(scheduledAt).toISOString(),
        reason,
        status: 'scheduled',
      } as any);
      if (onCreated) onCreated(created);
      if (created && (created.amount || created.total)) {
        navigate(`/order-pay?order=${created.id}`);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('We could not book that slot. Please try a different time.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Section narrow title="You're all set" subtitle="Your appointment request has been sent to the clinic.">
        <Alert tone="success">
          Your appointment has been requested. You can track its status and your visit history any time.
        </Alert>
        <div className="ds-form-actions">
          <Button variant="primary" to="/visit-history">
            <Icon name="calendar" size={16} /> View my records
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section narrow title="Book an appointment" subtitle="Choose a doctor and a time that works for you.">
      <form className="ds-form" onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}

        <div className="ds-field">
          <label className="ds-label" htmlFor="doctor">Doctor</label>
          <select
            id="doctor"
            className="input"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select a doctor</option>
            {(Array.isArray(doctors) ? doctors : []).map((d) => (
              <option key={d.id} value={d.id}>
                Dr. {(d as any).user_full_name || (d as any).user?.username || d.specialty} — {d.specialty}
              </option>
            ))}
          </select>
          <p className="ds-help">Pick the specialist best suited to your visit.</p>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="scheduledAt">Date &amp; time</label>
          <input
            id="scheduledAt"
            type="datetime-local"
            className="input"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
          <p className="ds-help">Appointments are confirmed based on doctor availability.</p>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="reason">Reason for visit</label>
          <textarea
            id="reason"
            className="input"
            rows={4}
            placeholder="e.g. Annual check-up, follow-up on lab results, persistent cough..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <p className="ds-help">This helps your doctor prepare for the visit.</p>
        </div>

        <div className="ds-form-actions">
          <Button type="button" variant="ghost" to="/dashboard">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Booking...' : 'Book appointment'}
          </Button>
        </div>
      </form>
    </Section>
  );
}