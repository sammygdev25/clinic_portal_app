import React from 'react';
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface AppointmentBookingHeaderProps {
  section?: string;
  page?: string;
}

export default function AppointmentBookingHeader(props: AppointmentBookingHeaderProps) {
  return (
    <PageHeader
      eyebrow="Appointments"
      title="Book an Appointment"
      subtitle="Choose a doctor, pick a day and time that works for you, and tell us the reason for your visit."
      actions={<Icon name="calendar" size={28} title="Book appointment" />}
    />
  );
}