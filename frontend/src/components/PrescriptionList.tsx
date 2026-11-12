import type { Prescription } from '../types';
import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState } from '../components/ui';

interface PrescriptionListProps {
  prescriptions: Prescription[];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PrescriptionList({ prescriptions }: PrescriptionListProps) {
  const list = Array.isArray(prescriptions) ? prescriptions : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No prescriptions yet"
        text="Prescriptions written by your doctor during a visit will appear here."
      />
    );
  }

  return (
    <div className="ds-stack">
      {list.map((prescription) => (
        <Card key={prescription.id}>
          <CardBody>
            <div className="ds-between">
              <CardTitle>{prescription.medication}</CardTitle>
              <Badge tone="primary">{prescription.dosage}</Badge>
            </div>
            <CardMeta>Prescribed {formatDate(prescription.created_at)}</CardMeta>
            {prescription.instructions && (
              <p className="ds-muted">{prescription.instructions}</p>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}