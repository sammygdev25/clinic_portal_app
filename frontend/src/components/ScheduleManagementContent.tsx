import React from 'react';
import { Section, Grid, Card, CardBody, CardTitle, CardMeta, Stack, Badge, EmptyState, SkeletonCards } from '../components/ui';
import { Icon } from '../components/icons';
import type { DoctorSchedule, DoctorProfile } from '../types';

interface ScheduleManagementContentProps {
  schedules: DoctorSchedule[];
  doctors: DoctorProfile[];
  loading?: boolean;
}

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

function doctorName(doctors: DoctorProfile[], doctorId: number | DoctorProfile): string {
  if (typeof doctorId === 'object' && doctorId !== null) {
    return doctorId.specialty || 'Doctor';
  }
  const found = doctors.find((d) => d.id === doctorId);
  return found ? found.specialty : 'Doctor';
}

function formatTime(value: string): string {
  if (!value) return '';
  const parts = value.split(':');
  if (parts.length < 2) return value;
  const hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${suffix}`;
}

export default function ScheduleManagementContent(props: ScheduleManagementContentProps) {
  const { schedules, doctors, loading = false } = props;

  if (loading) {
    return (
      <Section eyebrow="Clinic schedule" title="Weekly availability" subtitle="Loading doctor working hours...">
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (!schedules || schedules.length === 0) {
    return (
      <Section eyebrow="Clinic schedule" title="Weekly availability">
        <EmptyState
          icon="calendar"
          title="No availability set up yet"
          text="Add working hours for each doctor so patients can book appointments at the right times."
        />
      </Section>
    );
  }

  const sortedSchedules = [...schedules].sort((a, b) => {
    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayDiff = dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week);
    if (dayDiff !== 0) return dayDiff;
    return a.start_time.localeCompare(b.start_time);
  });

  return (
    <Section
      eyebrow="Clinic schedule"
      title="Weekly availability"
      subtitle="Review and manage each doctor's working hours across the week."
    >
      <Grid size="md" cols={3}>
        {(Array.isArray(sortedSchedules) ? sortedSchedules : []).map((schedule) => (
          <Card key={schedule.id}>
            <CardBody>
              <Stack gap="sm">
                <CardTitle>{doctorName(doctors, schedule.doctor)}</CardTitle>
                <Badge tone="primary">{DAY_LABELS[schedule.day_of_week] || schedule.day_of_week}</Badge>
                <CardMeta>
                  <Icon name="clock" size={16} />
                  {' '}
                  {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                </CardMeta>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}