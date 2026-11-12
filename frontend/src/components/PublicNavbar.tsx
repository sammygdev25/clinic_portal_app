import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui';
import { Icon } from '../components/icons';

export default function PublicNavbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="ds-nav">
      <div className="ds-container ds-between">
        <Link to="/" className="ds-cluster" style={{ textDecoration: 'none', gap: 'var(--space-sm)' }}>
          <Icon name="heart" size={24} />
          <span style={{ fontFamily: 'var(--font-heading, inherit)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>
            Riverside Family Clinic
          </span>
        </Link>

        <nav className="ds-cluster" style={{ gap: 'var(--space-lg)' }}>
          <Link to="/" className="ds-small">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/appointments" className="ds-small">Appointments</Link>
              <Link to="/visit-history" className="ds-small">Visit History</Link>
              <Link to="/bills" className="ds-small">Bills</Link>
              <Link to="/documents" className="ds-small">Documents</Link>
            </>
          )}
        </nav>

        <div className="ds-cluster" style={{ gap: 'var(--space-sm)' }}>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" to="/dashboard">
                <Icon name="user" size={16} /> {user?.username || 'Dashboard'}
              </Button>
              <Button variant="secondary" onClick={() => logout()}>
                <Icon name="logout" size={16} /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" to="/login">Log In</Button>
              <Button variant="primary" to="/register">Book an Appointment</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}