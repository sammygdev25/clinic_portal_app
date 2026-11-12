import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Button } from './ui';
import { Icon } from '../components/icons';
import type { Document } from '../types';
import { Stack } from './ui/Grid';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: number) => void;
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  insurance_card: 'Insurance Card',
  lab_result: 'Lab Result',
  other: 'Other',
};

const DOCUMENT_TYPE_ICON: Record<string, 'credit-card' | 'package' | 'book'> = {
  insurance_card: 'credit-card',
  lab_result: 'package',
  other: 'book',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const typeLabel = DOCUMENT_TYPE_LABELS[document.document_type] || 'Other';
  const iconName = DOCUMENT_TYPE_ICON[document.document_type] || 'book';

  return (
    <Card>
      <CardBody>
        <Stack gap="sm">
          <Stack gap="sm" align="center" >
            <Icon name={iconName} size={20} />
            <CardTitle>{typeLabel}</CardTitle>
          </Stack>
          {document.description && (
            <CardMeta>{document.description}</CardMeta>
          )}
          <CardMeta>Uploaded {formatDate(document.created_at)}</CardMeta>
        </Stack>
      </CardBody>
      <CardFooter>
        <Badge tone="soft">{typeLabel}</Badge>
        <a href={document.file} target="_blank" rel="noopener noreferrer" className="ds-btn-ghost">
          <Icon name="download" size={16} /> View
        </a>
        <Button variant="danger" size="md" onClick={() => onDelete(document.id)}>
          <Icon name="trash" size={16} /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}