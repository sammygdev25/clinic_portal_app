import React from 'react';
import { Section } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorAppointmentsDetailsProps {
  doctorName?: string;
  specialty?: string;
  email?: string;
  phone?: string;
  yearsExperience?: number;
}

export default function DoctorAppointmentsDetails({
  doctorName,
  specialty,
  email,
  phone,
  yearsExperience,
}: DoctorAppointmentsDetailsProps) {
  return (
    <Section
      narrow
      eyebrow="Account"
      title="Account details"
      subtitle="Your clinic profile as patients and staff see it."
    >
      <div className="ds-form">
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="user" size={16} /> Doctor
          </span>
          <p>{doctorName || 'Not available'}</p>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="award" size={16} /> Specialty
          </span>
          <p>{specialty || 'General Practice'}</p>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="mail" size={16} /> Email
            </span>
            <p>{email || 'Not on file'}</p>
          </div>
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="phone" size={16} /> Phone
            </span>
            <p>{phone || 'Not on file'}</p>
          </div>
        </div>
        <div className="ds-field">
          <span className="ds-label">
            <Icon name="clock" size={16} /> Years of experience
          </span>
          <p>{yearsExperience !== undefined ? `${yearsExperience} years` : 'Not specified'}</p>
        </div>
        <p className="ds-help">
          To update your specialty, bio, or photo, contact clinic administration —
          these details are managed by the front desk to keep patient records consistent.
        </p>
      </div>
    </Section>
  );
}