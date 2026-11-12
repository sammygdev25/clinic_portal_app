import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList, getDoctorProfileList, updateAppointment } from '../api';
import type { Appointment, DoctorProfile } from '../types';
import DoctorAppointmentsHeader from '../components/DoctorAppointmentsHeader';
import DoctorAppointmentsContent from '../components/DoctorAppointmentsContent';
import DoctorAppointmentsDetails from '../components/DoctorAppointmentsDetails';
import { Alert, LoadingBlock } from '../components/ui';

export default function DoctorAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [allAppointments, allDoctors] = await Promise.all([
        getAppointmentList(),
        getDoctorProfileList(),
      ]);
      const doctorsArr = Array.isArray(allDoctors) ? allDoctors : [];
      const myProfile = doctorsArr.find((d) => d.user === user?.id) || null;
      setDoctorProfile(myProfile);

      const appointmentsArr = Array.isArray(allAppointments) ? allAppointments : [];
      const mine = myProfile
        ? appointmentsArr.filter((a) => a.doctor === myProfile.id)
        : appointmentsArr;
      setAppointments(mine);
    } catch (err) {
      setError('Unable to load your appointments right now. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleComplete = async (id: number) => {
    try {
      const updated = await updateAppointment(id, { status: 'completed' });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated, status: 'completed' } : a))
      );
    } catch (err) {
      setError('Could not mark this appointment as completed. Please try again.');
    }
  };

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email || '';

  return (
    <div className="ds-stack-lg">
      <DoctorAppointmentsHeader user={user} />

      {error && <Alert tone="danger">{error}</Alert>}

      {loading ? (
        <LoadingBlock label="Loading your appointments..." />
      ) : (
        <DoctorAppointmentsContent appointments={appointments} onComplete={handleComplete} />
      )}

      <DoctorAppointmentsDetails
        doctorName={displayName}
        specialty={doctorProfile?.specialty}
        email={user?.email}
        phone={undefined}
        yearsExperience={doctorProfile?.years_experience}
      />
    </div>
  );
}