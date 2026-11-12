import React, { useState, useEffect } from 'react';
import { Section, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { PatientProfile } from '../types';

interface PatientProfileDetailsProps {
  profile: PatientProfile | null;
  onSave: (data: Partial<PatientProfile>) => Promise<void> | void;
  saving?: boolean;
}

export default function PatientProfileDetails({ profile, onSave, saving = false }: PatientProfileDetailsProps) {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    setDateOfBirth(profile?.date_of_birth || '');
    setPhone(profile?.phone || '');
    setAddress(profile?.address || '');
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ date_of_birth: dateOfBirth, phone, address });
  };

  return (
    <Section eyebrow="Your information" title="Account details" subtitle="Keep your contact details up to date so the clinic can reach you about appointments and results." narrow>
      <form className="ds-form" onSubmit={handleSubmit}>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="pp-dob">
              <Icon name="calendar" size={14} /> Date of birth
            </label>
            <input
              id="pp-dob"
              type="date"
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="ds-field">
            <label className="ds-label" htmlFor="pp-phone">
              <Icon name="phone" size={14} /> Phone number
            </label>
            <input
              id="pp-phone"
              type="tel"
              className="input"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="pp-address">
            <Icon name="map-pin" size={14} /> Home address
          </label>
          <input
            id="pp-address"
            type="text"
            className="input"
            placeholder="123 Main St, Springfield"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <span className="ds-help">Used for billing correspondence and mailed lab results.</span>
        </div>
        <div className="ds-form-actions">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Section>
  );
}