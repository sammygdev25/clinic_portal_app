import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AppointmentBookingHeader from '../components/AppointmentBookingHeader';
import AppointmentBookingForm from '../components/AppointmentBookingForm';
import AppointmentBookingInfo from '../components/AppointmentBookingInfo';
import { getDoctorProfileList } from '../api';
import type { DoctorProfile, Appointment } from '../types';
import { LoadingBlock, Alert } from '../components/ui';

export default function AppointmentBookingPage() {
  useAuth();
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadDoctors() {
      setLoading(true);
      setError('');
      try {
        const data = await getDoctorProfileList();
        if (active) {
          setDoctors(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError('We could not load the list of doctors right now. Please try again shortly.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDoctors();
    return () => {
      active = false;
    };
  }, []);

  const handleCreated = (_appointment: Appointment) => {
    // AppointmentBookingForm manages its own success/pay-now flow after creation.
  };

  return (
    <div className="ds-stack-lg">
      <AppointmentBookingHeader />
      {loading ? (
        <LoadingBlock label="Loading available doctors..." />
      ) : error ? (
        <Alert tone="danger">{error}</Alert>
      ) : (
        <AppointmentBookingForm doctors={doctors} onCreated={handleCreated} />
      )}
      <AppointmentBookingInfo />
    </div>
  );
}