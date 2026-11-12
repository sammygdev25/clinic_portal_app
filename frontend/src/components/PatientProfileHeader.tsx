import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientProfileHeaderProps {
  userName: string;
  userEmail: string;
}

export default function PatientProfileHeader({ userName, userEmail }: PatientProfileHeaderProps) {
  const displayName = userName && userName.trim().length > 0 ? userName : userEmail;

  return (
    <PageHeader
      eyebrow="Patient Account"
      title={`Welcome, ${displayName}`}
      subtitle="Manage your personal details, insurance information, and contact preferences for the clinic."
      actions={
        <div className="ds-cluster">
          <Icon name="user" size={20} title="Patient profile" />
        </div>
      }
    />
  );
}