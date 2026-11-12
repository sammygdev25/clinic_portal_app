import React, { useState } from 'react';
import { createPrescription } from '../api';
import type { Appointment, Prescription } from '../types';
import { Button } from './ui';

interface PrescriptionFormProps {
  appointment: Appointment;
  onSave: (prescription: Prescription) => void;
}

export default function PrescriptionForm({ appointment, onSave }: PrescriptionFormProps) {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medication.trim() || !dosage.trim()) {
      setError('Medication and dosage are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const prescription = await createPrescription({
        appointment: appointment.id,
        doctor: appointment.doctor,
        patient: appointment.patient,
        medication: medication.trim(),
        dosage: dosage.trim(),
        instructions: instructions.trim(),
      });
      setMedication('');
      setDosage('');
      setInstructions('');
      onSave(prescription);
    } catch (err) {
      setError('Could not save the prescription. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && <div className="ds-alert">{error}</div>}
      <div className="ds-field">
        <label className="ds-label" htmlFor="medication">Medication</label>
        <input
          id="medication"
          className="input"
          type="text"
          placeholder="e.g. Amoxicillin 500mg"
          value={medication}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMedication(e.target.value)}
        />
      </div>
      <div className="ds-field">
        <label className="ds-label" htmlFor="dosage">Dosage</label>
        <input
          id="dosage"
          className="input"
          type="text"
          placeholder="e.g. 1 capsule three times daily"
          value={dosage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDosage(e.target.value)}
        />
      </div>
      <div className="ds-field">
        <label className="ds-label" htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          className="input"
          rows={3}
          placeholder="Take with food. Complete the full course even if symptoms improve."
          value={instructions}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInstructions(e.target.value)}
        />
      </div>
      <div className="ds-form-actions">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? 'Saving...' : 'Add Prescription'}
        </Button>
      </div>
    </form>
  );
}