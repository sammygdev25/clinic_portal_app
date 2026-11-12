import { useEffect, useState } from 'react';
import ScheduleManagementHeader from '../components/ScheduleManagementHeader';
import ScheduleManagementContent from '../components/ScheduleManagementContent';
import DoctorScheduleForm from '../components/DoctorScheduleForm';
import AppointmentCalendar from '../components/AppointmentCalendar';
import { Alert } from '../components/ui';
import {
  getDoctorProfileList,
  getDoctorScheduleList,
  createDoctorSchedule,
  getAppointmentList,
} from '../api';
import type { DoctorProfile, DoctorSchedule, Appointment } from '../types';

export default function ScheduleManagementPage() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'danger'; message: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [doctorList, scheduleList, appointmentList] = await Promise.all([
        getDoctorProfileList(),
        getDoctorScheduleList(),
        getAppointmentList(),
      ]);
      setDoctors(Array.isArray(doctorList) ? doctorList : []);
      setSchedules(Array.isArray(scheduleList) ? scheduleList : []);
      setAppointments(Array.isArray(appointmentList) ? appointmentList : []);
    } catch (err) {
      setFeedback({ tone: 'danger', message: 'Unable to load schedule data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSchedule = () => {
    setShowForm((prev) => !prev);
    setFeedback(null);
  };

  const handleSaveSchedule = async (schedule: DoctorSchedule) => {
    try {
      await createDoctorSchedule(schedule);
      setFeedback({ tone: 'success', message: 'Schedule slot added successfully.' });
      setShowForm(false);
      await loadData();
      setTimeout(() => setFeedback(null), 2000);
    } catch (err) {
      setFeedback({ tone: 'danger', message: 'Could not save the schedule slot. Check the fields and try again.' });
    }
  };

  const handleSlotSelect = (_date: Date) => {
    setShowForm(true);
  };

  return (
    <div className="ds-stack-lg">
      <ScheduleManagementHeader onAddSchedule={handleAddSchedule} />

      {feedback && <Alert tone={feedback.tone}>{feedback.message}</Alert>}

      {showForm && (
        <DoctorScheduleForm doctors={doctors} onSave={handleSaveSchedule} />
      )}

      <ScheduleManagementContent
        schedules={schedules}
        doctors={doctors}
        loading={loading}
      />

      <AppointmentCalendar
        appointments={appointments}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
}