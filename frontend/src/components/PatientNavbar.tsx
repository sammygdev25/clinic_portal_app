import { Link, useLocation } from 'react-router-dom';
import { Icon } from './icons';

interface PatientNavbarUser {
  username?: string;
  first_name?: string;
  email?: string;
}

interface PatientNavbarProps {
  user: PatientNavbarUser | null;
  onLogout: () => void;
}

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'home' as const },
  { to: '/appointments', label: 'Appointments', icon: 'calendar' as const },
  { to: '/visit-history', label: 'Visit History', icon: 'clock' as const },
  { to: '/bills', label: 'Bills', icon: 'dollar' as const },
  { to: '/documents', label: 'Documents', icon: 'upload' as const },
  { to: '/profile', label: 'Profile', icon: 'user' as const },
];

export default function PatientNavbar({ user, onLogout }: PatientNavbarProps) {
  const location = useLocation();
  const displayName = user?.first_name || user?.username || user?.email || 'Patient';

  return (
    <div className="ds-nav patient-navbar">
      <div className="ds-container patient-navbar-inner">
        <Link to="/dashboard" className="patient-navbar-brand">
          <Icon name="award" size={20} />
          <span>Riverside Clinic</span>
        </Link>
        <nav className="patient-navbar-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`patient-navbar-link${location.pathname === link.to ? ' is-active' : ''}`}
            >
              <Icon name={link.icon} size={16} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="patient-navbar-user">
          <span className="patient-navbar-username">{displayName}</span>
          <button type="button" className="btn btn-secondary patient-navbar-logout" onClick={onLogout}>
            <Icon name="logout" size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}