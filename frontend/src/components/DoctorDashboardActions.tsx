import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, Cluster, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorDashboardActionsProps {
  onViewAppointments?: () => void;
  onViewPatients?: () => void;
}

export default function DoctorDashboardActions({ onViewAppointments, onViewPatients }: DoctorDashboardActionsProps) {
  const navigate = useNavigate();

  return (
    <Section title="Quick actions" tight>
      <Cluster gap="sm" justify="start">
        <Button
          variant="primary"
          onClick={() => (onViewAppointments ? onViewAppointments() : navigate('/staff/appointments'))}
        >
          <Icon name="calendar" size={16} /> View today's appointments
        </Button>
        <Button
          variant="secondary"
          onClick={() => (onViewPatients ? onViewPatients() : navigate('/staff/appointments'))}
        >
          <Icon name="users" size={16} /> Patient queue
        </Button>
        <Button variant="secondary" to="/staff/schedule-management">
          <Icon name="clock" size={16} /> Manage schedule
        </Button>
        <Button variant="ghost" to="/staff/checkin">
          <Icon name="check" size={16} /> Check-in desk
        </Button>
      </Cluster>
    </Section>
  );
}