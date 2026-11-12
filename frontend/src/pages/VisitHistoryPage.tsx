import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getAppointmentList,
  getPatientProfileList,
  getVisitNoteList,
  getPrescriptionList,
} from '../api';
import type { Appointment, PatientProfile, VisitNote, Prescription } from '../types';
import VisitHistoryHeader from '../components/VisitHistoryHeader';
import VisitHistoryContent from '../components/VisitHistoryContent';
import VisitHistoryDetails from '../components/VisitHistoryDetails';
import VisitNoteList from '../components/VisitNoteList';
import PrescriptionList from '../components/PrescriptionList';
import { Section, LoadingBlock, Alert } from '../components/ui';
import { useNavigate } from 'react-router-dom';

export default function VisitHistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [visitNotes, setVisitNotes] = useState<VisitNote[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError('');
      try {
        const profiles = await getPatientProfileList();
        const myProfile =
          profiles.find((p) => String(p.user) === String(user?.id)) || profiles[0] || null;

        const [allAppointments, allVisitNotes, allPrescriptions] = await Promise.all([
          getAppointmentList(),
          getVisitNoteList(),
          getPrescriptionList(),
        ]);

        if (cancelled) return;

        const myAppointments = myProfile
          ? (Array.isArray(allAppointments) ? allAppointments : []).filter((a) => String(a.patient) === String(myProfile.id))
          : allAppointments;

        const myNotes = myProfile
          ? (Array.isArray(allVisitNotes) ? allVisitNotes : []).filter((n) => String(n.patient) === String(myProfile.id))
          : allVisitNotes;

        const myPrescriptions = myProfile
          ? (Array.isArray(allPrescriptions) ? allPrescriptions : []).filter((p) => String(p.patient) === String(myProfile.id))
          : allPrescriptions;

        setPatientProfile(myProfile);
        setAppointments(myAppointments);
        setVisitNotes(myNotes);
        setPrescriptions(myPrescriptions);
      } catch (err) {
        if (!cancelled) setError('Unable to load your visit history right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email || 'Patient';

  const selectedNotes = selectedAppointment
    ? (Array.isArray(visitNotes) ? visitNotes : []).filter((n) => String(n.appointment) === String(selectedAppointment.id))
    : [];

  const selectedPrescriptions = selectedAppointment
    ? (Array.isArray(prescriptions) ? prescriptions : []).filter((p) => String(p.appointment) === String(selectedAppointment.id))
    : [];

  if (loading) {
    return (
      <div className="ds-stack-lg">
        <LoadingBlock label="Loading your visit history..." />
      </div>
    );
  }

  return (
    <div className="ds-stack-lg">
      <VisitHistoryHeader userName={userName} />

      {error && <Alert tone="danger">{error}</Alert>}

      <VisitHistoryContent
        appointments={appointments}
        onSelectAppointment={(appointment) => setSelectedAppointment(appointment)}
        onBookAppointment={() => navigate('/appointments')}
      />

      {selectedAppointment && (
        <Section
          title="Visit details"
          subtitle={`Appointment on ${new Date(selectedAppointment.scheduled_at).toLocaleString('en-US')}`}
          narrow
        >
          <div className="ds-stack">
            <VisitNoteList visitNotes={selectedNotes} />
            <PrescriptionList prescriptions={selectedPrescriptions} />
          </div>
        </Section>
      )}

      <VisitHistoryDetails
        patientName={userName}
        patientEmail={user?.email}
        phone={patientProfile?.phone}
        dateOfBirth={patientProfile?.date_of_birth ?? undefined}
        insuranceProvider={patientProfile?.insurance_provider}
        insuranceId={patientProfile?.insurance_id}
        address={patientProfile?.address}
      />
    </div>
  );
}