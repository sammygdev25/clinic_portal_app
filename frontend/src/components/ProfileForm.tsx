import React, { useState } from 'react';
import { createPatientProfile, updatePatientProfile } from '../api';
import type { PatientProfile } from '../types';

interface ProfileFormProps {
  profile: Partial<PatientProfile>;
  onSave: (profile: PatientProfile) => void;
}

export default function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [dateOfBirth, setDateOfBirth] = useState<string>(profile.date_of_birth || '');
  const [phone, setPhone] = useState<string>(profile.phone || '');
  const [address, setAddress] = useState<string>(profile.address || '');
  const [insuranceProvider, setInsuranceProvider] = useState<string>(profile.insurance_provider || '');
  const [insuranceId, setInsuranceId] = useState<string>(profile.insurance_id || '');
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload: Partial<PatientProfile> = {
      date_of_birth: dateOfBirth || undefined,
      phone,
      address,
      insurance_provider: insuranceProvider,
      insurance_id: insuranceId,
    };

    try {
      let result: PatientProfile;
      if (profile.id) {
        result = await updatePatientProfile(profile.id, payload);
      } else {
        result = await createPatientProfile(payload);
      }
      onSave(result);
    } catch (err) {
      setError('Unable to save your profile. Please check the fields and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ds-form" onSubmit={handleSubmit}>
      {error && (
        <div className="ds-alert" role="alert">
          {error}
        </div>
      )}

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="date_of_birth">Date of birth</label>
          <input
            id="date_of_birth"
            type="date"
            className="input"
            value={dateOfBirth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            className="input"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="ds-field">
        <label className="ds-label" htmlFor="address">Home address</label>
        <input
          id="address"
          type="text"
          className="input"
          placeholder="123 Main St, Springfield"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        />
      </div>

      <div className="ds-form-row">
        <div className="ds-field">
          <label className="ds-label" htmlFor="insurance_provider">Insurance provider</label>
          <input
            id="insurance_provider"
            type="text"
            className="input"
            placeholder="e.g. Blue Cross Blue Shield"
            value={insuranceProvider}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsuranceProvider(e.target.value)}
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="insurance_id">Insurance ID</label>
          <input
            id="insurance_id"
            type="text"
            className="input"
            placeholder="Member ID number"
            value={insuranceId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInsuranceId(e.target.value)}
          />
        </div>
      </div>

      <div className="ds-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </div>
    </form>
  );
}