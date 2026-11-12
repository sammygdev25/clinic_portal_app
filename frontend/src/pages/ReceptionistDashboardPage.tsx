import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAppointmentList } from '../api';
import type { Appointment } from '../types';
import ReceptionistDashboardHeader from '../components/ReceptionistDashboardHeader';
import ReceptionistDashboardStats from '../components/ReceptionistDashboardStats';
import ReceptionistDashboardRecent from '../components/ReceptionistDashboardRecent';
import ReceptionistDashboardActions from '../components/ReceptionistDashboardActions';
import { LoadingBlock, Alert } from '../components/ui';

export default function ReceptionistDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAppointmentList();
        if (mounted) setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError('Unable to load the schedule right now. Please try again shortly.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCheckIn = () => navigate('/staff/checkin');
  const handleManageSchedule = () => navigate('/staff/schedule-management');

  if (loading) {
    return <LoadingBlock label="Loading front desk schedule..." />;
  }

  const firstName = typeof user?.first_name === 'string' ? user.first_name : undefined;
  const userName = firstName || user?.username;

  return (
    <div className="ds-stack-lg">
      <ReceptionistDashboardHeader
        userName={userName}
        onManageSchedule={handleManageSchedule}
      />
      {error && <Alert tone="danger">{error}</Alert>}
      <ReceptionistDashboardStats appointments={appointments} />
      <ReceptionistDashboardRecent appointments={appointments} />
      <ReceptionistDashboardActions
        onCheckIn={handleCheckIn}
        onManageSchedule={handleManageSchedule}
      />
    </div>
  );
}
