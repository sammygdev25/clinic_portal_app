import type { PatientProfile } from '../types';
import { Section, Split, Media, CardMeta, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface DoctorPatientDetailMediaProps {
  patient: PatientProfile;
  patientName: string;
  appointmentCount: number;
  onNewVisitNote: () => void;
}

export default function DoctorPatientDetailMedia({
  patient,
  patientName,
  appointmentCount,
  onNewVisitNote,
}: DoctorPatientDetailMediaProps) {
  return (
    <Section eyebrow="Patient Record" title={patientName} tight>
      <Split>
        <Media
          alt={patientName}
          ratio="square"
          badge={patient.insurance_provider ? 'Insured' : undefined}
        />
        <div className="ds-stack">
          <span className="ds-eyebrow">Chart Overview</span>
          <h2 className="ds-card-title">{patientName}</h2>
          <CardMeta>
            {patient.phone || 'No phone on file'} &middot; {patient.address || 'No address on file'}
          </CardMeta>
          <CardMeta>
            {appointmentCount} visit{appointmentCount === 1 ? '' : 's'} on record
          </CardMeta>
          <div className="ds-cluster">
            {patient.insurance_provider ? (
              <Badge tone="primary">{patient.insurance_provider}</Badge>
            ) : (
              <Badge tone="neutral">No insurance on file</Badge>
            )}
            {patient.insurance_id && <Badge tone="soft">ID {patient.insurance_id}</Badge>}
          </div>
          <Button variant="primary" size="lg" onClick={onNewVisitNote}>
            <Icon name="edit" size={18} />
            New Visit Note
          </Button>
        </div>
      </Split>
    </Section>
  );
}