import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PatientProfileHeader from '../components/PatientProfileHeader';
import PatientProfileContent from '../components/PatientProfileContent';
import PatientProfileDetails from '../components/PatientProfileDetails';
import { LoadingBlock, Alert } from '../components/ui';
import {
  getPatientProfileList,
  createPatientProfile,
  updatePatientProfile,
  getAppointmentList,
} from '../api';
import type { PatientProfile, Appointment } from '../types';

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const profiles = await getPatientProfileList();
      const mine = (Array.isArray(profiles) ? profiles : []).find(
        (p: PatientProfile) => (p as any).user === user.id
      );
      setProfile(mine || null);

      const appts = await getAppointmentList();
      const list = Array.isArray(appts) ? appts : [];
      const mineAppts = list.filter((a: Appointment) => (a as any).patient === user.id);
      setAppointments(mineAppts);
    } catch (err) {
      setError('Failed to load your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async (data: Partial<PatientProfile>) => {
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      if (profile && profile.id) {
        const updated = await updatePatientProfile(profile.id, data);
        setProfile(updated);
      } else {
        const created = await createPatientProfile({ ...data, user: user.id } as Partial<PatientProfile>);
        setProfile(created);
      }
    } catch (err) {
      setError('Could not save your profile details. Please check the form and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <LoadingBlock label="Loading your session..." />;
  }

  return (
    <div className="ds-stack-lg">
      <PatientProfileHeader
        userName={user.username || user.email || 'Patient'}
        userEmail={user.email || ''}
      />

      {error && <Alert tone="danger">{error}</Alert>}

      {loading ? (
        <LoadingBlock label="Loading your profile..." />
      ) : (
        <>
          <PatientProfileContent appointments={appointments} />
          <PatientProfileDetails profile={profile} onSave={handleSave} saving={saving} />
        </>
      )}
    </div>
  );
}
