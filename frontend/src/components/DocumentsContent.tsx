import type { Document } from '../types';
import { Section, Grid, SkeletonCards, EmptyState } from '../components/ui';
import DocumentCard from './DocumentCard';

interface DocumentsContentProps {
  documents: Document[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function DocumentsContent({ documents, loading, onDelete }: DocumentsContentProps) {
  if (loading) {
    return (
      <Section title="Your documents" subtitle="Insurance cards, lab results and other files you've uploaded">
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <Section title="Your documents" subtitle="Insurance cards, lab results and other files you've uploaded">
        <EmptyState
          icon="upload"
          title="No documents yet"
          text="Upload your insurance card, lab results, or other records so your care team has them on file."
        />
      </Section>
    );
  }

  return (
    <Section title="Your documents" subtitle="Insurance cards, lab results and other files you've uploaded">
      <Grid size="md" cols={3}>
        {(Array.isArray(documents) ? documents : []).map((document) => (
          <DocumentCard key={document.id} document={document} onDelete={onDelete} />
        ))}
      </Grid>
    </Section>
  );
}