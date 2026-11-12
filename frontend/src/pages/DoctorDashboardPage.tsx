import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList } from '../api';
import type { Appointment } from '../types';
import DoctorDashboardHeader from '../components/DoctorDashboardHeader';
import DoctorDashboardStats from '../components/DoctorDashboardStats';
import DoctorDashboardRecent from '../components/DoctorDashboardRecent';
import DoctorDashboardActions from '../components/DoctorDashboardActions';
import { LoadingBlock } from '../components/ui';

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getAppointmentList();
        if (active) setAppointments(Array.isArray(data) ? data : []);
      } catch {
        if (active) setAppointments([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const doctorName = user ? `${(user as any).first_name || user.username || ''}`.trim() : '';

  if (loading) {
    return <LoadingBlock label="Loading your dashboard..." />;
  }

  return (
    <div className="ds-stack-lg">
      <DoctorDashboardHeader
        doctorName={doctorName}
        onViewSchedule={() => navigate('/staff/appointments')}
      />
      <DoctorDashboardStats appointments={appointments} />
      <DoctorDashboardRecent appointments={appointments} />
      <DoctorDashboardActions
        onViewAppointments={() => navigate('/staff/appointments')}
        onViewPatients={() => navigate('/staff/appointments')}
      />
    </div>
  );
}