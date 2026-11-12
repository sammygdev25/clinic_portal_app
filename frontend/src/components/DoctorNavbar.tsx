import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../components/icons';

interface DoctorNavbarUser {
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
}

interface DoctorNavbarProps {
  user: DoctorNavbarUser | null;
  onLogout: () => void;
}

export default function DoctorNavbar({ user, onLogout }: DoctorNavbarProps) {
  const location = useLocation();

  const links = [
    { to: '/staff/doctor-dashboard', label: 'Dashboard', icon: 'home' as const },
    { to: '/staff/appointments', label: 'Appointments', icon: 'calendar' as const },
  ];

  const displayName = user?.first_name
    ? `Dr. ${user.first_name} ${user.last_name || ''}`.trim()
    : user?.username || 'Doctor';

  return (
    <nav className="ds-nav">
      <div className="ds-container ds-between">
        <Link to="/staff/doctor-dashboard" className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-sm)' }}>
          <Icon name="award" size={22} />
          <span style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>Clinic Portal</span>
          <span className="badge badge-soft">Doctor</span>
        </Link>

        <div className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-md)' }}>
          {(Array.isArray(links) ? links : []).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="ds-cluster"
              style={{
                alignItems: 'center',
                gap: '6px',
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: location.pathname === link.to ? 600 : 500,
              }}
            >
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="ds-cluster" style={{ alignItems: 'center', gap: 'var(--space-sm)' }}>
            <span className="ds-small ds-muted">{displayName}</span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onLogout}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Icon name="logout" size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}