import type { PatientProfile } from '../types';
import { Card, CardBody, CardTitle, Badge } from '../components/ui';
import { Icon } from '../components/icons';

interface InsuranceInfoCardProps {
  profile: PatientProfile | null;
}

export default function InsuranceInfoCard({ profile }: InsuranceInfoCardProps) {
  const hasInsurance = !!(profile?.insurance_provider || profile?.insurance_id);

  return (
    <Card>
      <CardBody>
        <div className="ds-between" style={{ marginBottom: 'var(--space-sm)' }}>
          <CardTitle>
            <Icon name="shield" size={18} /> Insurance Information
          </CardTitle>
          {hasInsurance ? (
            <Badge tone="success">On file</Badge>
          ) : (
            <Badge tone="neutral">Not provided</Badge>
          )}
        </div>

        {hasInsurance ? (
          <div className="ds-stack" style={{ gap: 'var(--space-sm)' }}>
            <div className="ds-field">
              <span className="ds-label">Provider</span>
              <span>{profile?.insurance_provider || 'Not specified'}</span>
            </div>
            <div className="ds-field">
              <span className="ds-label">Insurance ID</span>
              <span>{profile?.insurance_id || 'Not specified'}</span>
            </div>
          </div>
        ) : (
          <p className="ds-muted">
            No insurance details have been added yet. Update your profile to add
            your insurance provider and ID so billing can process claims on your
            behalf.
          </p>
        )}
      </CardBody>
    </Card>
  );
}