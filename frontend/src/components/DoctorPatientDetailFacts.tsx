import React from 'react';
import { Section, Grid } from '../components/ui';
import { Icon } from '../components/icons';
import type { PatientProfile } from '../types';
import { formatDate } from '../utils';

interface DoctorPatientDetailFactsProps {
  patient: PatientProfile | null;
}

export default function DoctorPatientDetailFacts({ patient }: DoctorPatientDetailFactsProps) {
  if (!patient) return null;

  const facts: { icon: string; label: string; value: string }[] = [
    {
      icon: 'calendar',
      label: 'Date of Birth',
      value: patient.date_of_birth ? formatDate(patient.date_of_birth) : 'Not on file',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: patient.phone || 'Not on file',
    },
    {
      icon: 'map-pin',
      label: 'Address',
      value: patient.address || 'Not on file',
    },
    {
      icon: 'shield',
      label: 'Insurance Provider',
      value: patient.insurance_provider || 'Not on file',
    },
    {
      icon: 'info',
      label: 'Insurance ID',
      value: patient.insurance_id || 'Not on file',
    },
    {
      icon: 'clock',
      label: 'Patient Since',
      value: patient.created_at ? formatDate(patient.created_at) : 'Unknown',
    },
  ];

  return (
    <Section eyebrow="Patient Record" title="Details" tight>
      <Grid cols={2} size="md">
        {(Array.isArray(facts) ? facts : []).map((fact) => (
          <div className="ds-card" key={fact.label}>
            <div className="ds-card-body">
              <div className="ds-cluster">
                <Icon name={fact.icon as any} size={18} />
                <span className="ds-label">{fact.label}</span>
              </div>
              <p className="ds-lead">{fact.value}</p>
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  );
}