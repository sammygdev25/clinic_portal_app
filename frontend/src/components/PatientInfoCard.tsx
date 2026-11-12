import { Card, CardBody, CardTitle, CardMeta, Badge } from '../components/ui';
import { Icon } from '../components/icons';

interface PatientInfoCardProps {
  patient: {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    date_of_birth?: string | null;
    phone?: string;
    address?: string;
  };
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  const fullName =
    patient.first_name || patient.last_name
      ? `${patient.first_name || ''} ${patient.last_name || ''}`.trim()
      : patient.username || 'Patient';

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <Card>
      <CardBody>
        <Stack gap="sm" align="center" justify="start">
          <div className="ds-avatar" aria-hidden="true">
            {initials || <Icon name="user" size={20} />}
          </div>
          <div>
            <CardTitle>{fullName}</CardTitle>
            <CardMeta>{patient.email || 'No email on file'}</CardMeta>
          </div>
        </Stack>
        <div className="ds-stack" style={{ marginTop: 'var(--space-md)' }}>
          <CardMeta>
            <Icon name="calendar" size={14} /> Date of birth:{' '}
            {patient.date_of_birth
              ? new Date(patient.date_of_birth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Not provided'}
          </CardMeta>
          <CardMeta>
            <Icon name="phone" size={14} /> {patient.phone || 'No phone on file'}
          </CardMeta>
          <CardMeta>
            <Icon name="map-pin" size={14} /> {patient.address || 'No address on file'}
          </CardMeta>
        </div>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <Badge tone="soft">Patient</Badge>
        </div>
      </CardBody>
    </Card>
  );
}

function Stack({
  children,
  gap = 'md',
  align = 'start',
  justify = 'start',
}: {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  align?: string;
  justify?: 'start' | 'center' | 'end' | 'between';
}) {
  return (
    <div
      className={`ds-stack ds-stack-${gap}`}
      style={{ display: 'flex', alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}