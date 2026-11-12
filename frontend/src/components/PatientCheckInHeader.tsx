import React from 'react';
import { PageHeader } from '../components/ui';

interface PatientCheckInHeaderProps {
  checkedInCount?: number;
  waitingCount?: number;
}

export default function PatientCheckInHeader({ checkedInCount = 0, waitingCount = 0 }: PatientCheckInHeaderProps) {
  return (
    <PageHeader
      eyebrow="Front Desk"
      title="Patient Check-In"
      subtitle={`Confirm arrivals and move patients into the queue. ${waitingCount} waiting, ${checkedInCount} checked in today.`}
    />
  );
}