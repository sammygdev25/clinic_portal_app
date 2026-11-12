import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DoctorNavbar from '../components/DoctorNavbar';
import PatientInfoCard from '../components/PatientInfoCard';
import DoctorPatientDetailMedia from '../components/DoctorPatientDetailMedia';
import DoctorPatientDetailFacts from '../components/DoctorPatientDetailFacts';
import DoctorPatientDetailRelated from '../components/DoctorPatientDetailRelated';
import VisitNoteForm from '../components/VisitNoteForm';
import PrescriptionForm from '../components/PrescriptionForm';
import { Section, Grid, Alert, LoadingBlock, EmptyState } from '../components/ui';
import {
  getPatientProfile,
  getAppointmentList,
  getDoctorProfileList,
} from '../api';
import type { PatientProfile, Appointment, DoctorProfile, VisitNote, Prescription } from '../types';

export default function DoctorPatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, logout } = useAuth();

  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);
  const [showClinicalForms, setShowClinicalForms] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const patientData = await getPatientProfile(Number(id));
      setPatient(patientData);

      const allAppointments = await getAppointmentList();
      const list = Array.isArray(allAppointments) ? allAppointments : [];
      const forPatient = list.filter(
        (a: Appointment) => Number((a as any).patient) === Number(id) || Number((a as any).patient?.id) === Number(id)
      );
      setAppointments(forPatient);
      if (forPatient.length > 0) {
        setSelectedAppointmentId(forPatient[0].id);
      }

      const doctorList = await getDoctorProfileList();
      setDoctors(Array.isArray(doctorList) ? doctorList : []);
    } catch (err) {
      setError('Unable to load patient record. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleNewVisitNote = () => {
    setShowClinicalForms(true);
  };

  const handleVisitNoteSaved = (note: VisitNote) => {
    setFeedback('Visit note saved successfully.');
    window.setTimeout(() => setFeedback(''), 2000);
  };

  const handlePrescriptionSaved = (prescription: Prescription) => {
    setFeedback('Prescription added successfully.');
    window.setTimeout(() => setFeedback(''), 2000);
  };

  const patientName = patient
    ? `${(patient as any).first_name || ''} ${(patient as any).last_name || ''}`.trim() ||
      (patient as any).username ||
      'Patient'
    : 'Patient';

  const selectedAppointment = appointments.find((a) => a.id === selectedAppointmentId) || null;

  if (loading) {
    return (
      <>
        <DoctorNavbar user={user as any} onLogout={logout} />
        <Section>
          <LoadingBlock label="Loading patient record..." />
        </Section>
      </>
    );
  }

  if (error || !patient) {
    return (
      <>
        <DoctorNavbar user={user as any} onLogout={logout} />
        <Section>
          <Alert tone="danger">{error || 'Patient record not found.'}</Alert>
        </Section>
      </>
    );
  }

  return (
    <>
      <DoctorNavbar user={user as any} onLogout={logout} />
      <div className="ds-stack-lg">
        <DoctorPatientDetailMedia
          patient={patient}
          patientName={patientName}
          appointmentCount={appointments.length}
          onNewVisitNote={handleNewVisitNote}
        />

        <Section title="Patient contact information">
          <PatientInfoCard
            patient={{
              id: (patient as any).id,
              username: (patient as any).username,
              first_name: (patient as any).first_name,
              last_name: (patient as any).last_name,
              email: (patient as any).email,
              date_of_birth: patient.date_of_birth,
              phone: patient.phone,
              address: patient.address,
            }}
          />
        </Section>

        <DoctorPatientDetailFacts patient={patient} />

        <Section title="Clinical documentation" subtitle="Add a visit note or prescription for this patient">
          {feedback && <Alert tone="success">{feedback}</Alert>}

          {appointments.length === 0 ? (
            <EmptyState
              icon="calendar"
              title="No appointments on record"
              text="This patient has no appointments yet, so there is nothing to document."
            />
          ) : (
            <div className="ds-stack">
              <div className="ds-field">
                <label className="ds-label" htmlFor="appointment-select">
                  Select appointment
                </label>
                <select
                  id="appointment-select"
                  className="input"
                  value={selectedAppointmentId ?? ''}
                  onChange={(e) => {
                    setSelectedAppointmentId(Number(e.target.value));
                    setShowClinicalForms(true);
                  }}
                >
                  {appointments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {new Date(a.scheduled_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}{' '}
                      - {a.status} {a.reason ? `- ${a.reason}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {showClinicalForms && selectedAppointment && (
                <Grid cols={2} size="md">
                  <VisitNoteForm appointment={selectedAppointment} onSave={handleVisitNoteSaved} />
                  <PrescriptionForm appointment={selectedAppointment} onSave={handlePrescriptionSaved} />
                </Grid>
              )}
            </div>
          )}
        </Section>

        <DoctorPatientDetailRelated doctors={doctors} />
      </div>
    </>
  );
}