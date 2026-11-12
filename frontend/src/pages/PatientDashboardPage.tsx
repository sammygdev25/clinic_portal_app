import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PatientDashboardHeader from '../components/PatientDashboardHeader';
import PatientDashboardStats from '../components/PatientDashboardStats';
import PatientDashboardRecent from '../components/PatientDashboardRecent';
import PatientDashboardActions from '../components/PatientDashboardActions';
import { LoadingBlock, Alert } from '../components/ui';
import { getAppointmentList, getBillList, getDocumentList } from '../api';
import type { Appointment, Bill, Document } from '../types';

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const [appointmentData, billData, documentData] = await Promise.all([
          getAppointmentList(),
          getBillList(),
          getDocumentList(),
        ]);
        if (!active) return;
        setAppointments(Array.isArray(appointmentData) ? appointmentData : []);
        setBills(Array.isArray(billData) ? billData : []);
        setDocuments(Array.isArray(documentData) ? documentData : []);
      } catch (err) {
        if (active) setError('We could not load your dashboard right now. Please try again shortly.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  const handleBookAppointment = () => {
    navigate('/appointments');
  };

  if (loading) {
    return <LoadingBlock label="Loading your dashboard..." />;
  }

  const firstName = user && typeof user.first_name === 'string' ? user.first_name : '';
  const userName = firstName || user?.username || 'there';

  return (
    <div className="ds-stack-lg">
      <PatientDashboardHeader
        userName={userName}
        onBookAppointment={handleBookAppointment}
      />

      {error && <Alert tone="danger">{error}</Alert>}

      <PatientDashboardStats appointments={appointments} bills={bills} documents={documents} />

      <PatientDashboardRecent appointments={appointments} />

      <PatientDashboardActions />
    </div>
  );
}
