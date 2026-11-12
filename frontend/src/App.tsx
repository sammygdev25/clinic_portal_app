import './App.css';
import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { Footer } from './components/ui';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import VisitHistoryPage from './pages/VisitHistoryPage';
import BillsPage from './pages/BillsPage';
import DocumentsPage from './pages/DocumentsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import DoctorPatientDetailPage from './pages/DoctorPatientDetailPage';
import DoctorAppointmentsPage from './pages/DoctorAppointmentsPage';
import ReceptionistDashboardPage from './pages/ReceptionistDashboardPage';
import ScheduleManagementPage from './pages/ScheduleManagementPage';
import PatientCheckInPage from './pages/PatientCheckInPage';
import ProfilePage from './pages/ProfilePage';

interface RequireAuthProps { children: ReactNode }

function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth() as { isAuthenticated?: boolean; loading?: boolean };
  if (auth && auth.loading) {
    return null;
  }
  const authed = auth && typeof auth.isAuthenticated === 'boolean' ? auth.isAuthenticated : Boolean(localStorage.getItem('token'));
  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="ds-page">
          <Navbar />
          <main className="ds-page-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<RequireAuth><PatientDashboardPage /></RequireAuth>} />
              <Route path="/appointments" element={<RequireAuth><AppointmentBookingPage /></RequireAuth>} />
              <Route path="/visit-history" element={<RequireAuth><VisitHistoryPage /></RequireAuth>} />
              <Route path="/bills" element={<RequireAuth><BillsPage /></RequireAuth>} />
              <Route path="/documents" element={<RequireAuth><DocumentsPage /></RequireAuth>} />
              <Route path="/profile" element={<RequireAuth><PatientProfilePage /></RequireAuth>} />
              <Route path="/staff/doctor-dashboard" element={<RequireAuth><DoctorDashboardPage /></RequireAuth>} />
              <Route path="/staff/patients/:id" element={<RequireAuth><DoctorPatientDetailPage /></RequireAuth>} />
              <Route path="/staff/appointments" element={<RequireAuth><DoctorAppointmentsPage /></RequireAuth>} />
              <Route path="/staff/receptionist-dashboard" element={<RequireAuth><ReceptionistDashboardPage /></RequireAuth>} />
              <Route path="/staff/schedule-management" element={<RequireAuth><ScheduleManagementPage /></RequireAuth>} />
              <Route path="/staff/checkin" element={<RequireAuth><PatientCheckInPage /></RequireAuth>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer brand="Clinic Portal App" columns={[{ title: 'Explore', links: [{ label: 'Home', to: '/' }] }]} />
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
