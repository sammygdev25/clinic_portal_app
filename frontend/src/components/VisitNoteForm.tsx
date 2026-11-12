import React, { useState } from 'react';
import { createVisitNote } from '../api';
import type { Appointment, VisitNote } from '../types';
import { Button, Alert } from '../components/ui';

interface VisitNoteFormProps {
  appointment: Appointment;
  onSave: (visitNote: VisitNote) => void;
}

export default function VisitNoteForm({ appointment, onSave }: VisitNoteFormProps) {
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please enter visit note content before saving.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const note = await createVisitNote({
        appointment: appointment.id,
        doctor: appointment.doctor,
        patient: appointment.patient,
        diagnosis,
        content,
      });
      setDiagnosis('');
      setContent('');
      onSave(note);
    } catch (err) {
      setError('Could not save the visit note. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="ds-field">
        <label className="ds-label" htmlFor="diagnosis">Diagnosis</label>
        <input
          id="diagnosis"
          className="input"
          type="text"
          placeholder="e.g. Seasonal allergic rhinitis"
          value={diagnosis}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiagnosis(e.target.value)}
        />
      </div>
      <div className="ds-field">
        <label className="ds-label" htmlFor="content">Visit Note</label>
        <textarea
          id="content"
          className="input"
          rows={6}
          placeholder="Document findings, assessment, and plan for this visit..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />
        <p className="ds-help">Visible only to you and the patient.</p>
      </div>
      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Visit Note'}
        </Button>
      </div>
    </form>
  );
}