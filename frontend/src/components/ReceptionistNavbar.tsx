import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../components/icons';

interface ReceptionistNavbarUser {
  username?: string;
  first_name?: string;
  email?: string;
}

interface ReceptionistNavbarProps {
  user: ReceptionistNavbarUser | null;
  onLogout: () => void;
}

export default function ReceptionistNavbar({ user, onLogout }: ReceptionistNavbarProps) {
  const location = useLocation();

  const links = [
    { to: '/staff/receptionist-dashboard', label: 'Dashboard', icon: 'grid' as const },
    { to: '/staff/schedule-management', label: 'Schedule', icon: 'calendar' as const },
    { to: '/staff/checkin', label: 'Check-In', icon: 'check' as const },
  ];

  const displayName = user?.first_name || user?.username || user?.email || 'Receptionist';

  return (
    <header className="ds-nav">
      <div className="ds-container ds-between">
        <Link to="/staff/receptionist-dashboard" className="ds-cluster" style={{ textDecoration: 'none' }}>
          <Icon name="users" size={22} />
          <span style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>
            Riverstone Clinic
          </span>
          <span className="ds-small ds-muted">Front Desk</span>
        </Link>

        <nav className="ds-cluster" aria-label="Receptionist navigation">
          {(Array.isArray(links) ? links : []).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`ds-cluster ds-nav-link${location.pathname === link.to ? ' active' : ''}`}
              style={{
                textDecoration: 'none',
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: location.pathname === link.to ? 600 : 500,
              }}
            >
              <Icon name={link.icon} size={16} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ds-cluster">
          <span className="ds-small ds-muted">{displayName}</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            <Icon name="logout" size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}