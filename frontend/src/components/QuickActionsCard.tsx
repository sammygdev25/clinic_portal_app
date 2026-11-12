import { Card, CardBody, CardTitle, Stack } from '../components/ui';
import { Icon } from '../components/icons';
import { useNavigate } from 'react-router-dom';

interface QuickActionsCardProps {
  onBookAppointment: () => void;
}

export default function QuickActionsCard({ onBookAppointment }: QuickActionsCardProps) {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Book Appointment',
      icon: 'calendar' as const,
      onClick: onBookAppointment,
    },
    {
      label: 'Visit History',
      icon: 'clock' as const,
      onClick: () => navigate('/visit-history'),
    },
    {
      label: 'View Bills',
      icon: 'dollar' as const,
      onClick: () => navigate('/bills'),
    },
    {
      label: 'My Documents',
      icon: 'upload' as const,
      onClick: () => navigate('/documents'),
    },
    {
      label: 'My Profile',
      icon: 'user' as const,
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle>Quick Actions</CardTitle>
        <Stack gap="sm">
          {(Array.isArray(actions) ? actions : []).map((action) => (
            <button
              key={action.label}
              className="btn btn-secondary"
              onClick={action.onClick}
              style={{ justifyContent: 'flex-start' }}
            >
              <Icon name={action.icon} size={18} />
              <span>{action.label}</span>
            </button>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}