import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList, updateAppointment } from '../api';
import type { Appointment } from '../types';
import ReceptionistNavbar from '../components/ReceptionistNavbar';
import PatientCheckInHeader from '../components/PatientCheckInHeader';
import PatientCheckInContent from '../components/PatientCheckInContent';
import { Alert } from '../components/ui';

export default function PatientCheckInPage() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAppointmentList();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Unable to load the appointment queue right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleCheckIn = async (id: number) => {
    try {
      await updateAppointment(id, { status: 'checked_in' });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'checked_in' } : a))
      );
    } catch (err) {
      setError('Could not check in this patient. Please try again.');
    }
  };

  const todayStr = new Date().toDateString();
  const todaysAppointments = appointments.filter(
    (a) => new Date(a.scheduled_at).toDateString() === todayStr
  );
  const checkedInCount = todaysAppointments.filter((a) => a.status === 'checked_in').length;
  const waitingCount = todaysAppointments.filter((a) => a.status === 'scheduled').length;

  return (
    <div className="ds-stack-lg">
      <ReceptionistNavbar user={user} onLogout={logout} />
      <PatientCheckInHeader checkedInCount={checkedInCount} waitingCount={waitingCount} />
      {error && <Alert tone="danger">{error}</Alert>}
      <PatientCheckInContent
        appointments={todaysAppointments}
        loading={loading}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
}