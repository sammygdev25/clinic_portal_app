import { PageHeader } from '../components/ui';

interface DocumentsHeaderProps {
  documentCount?: number;
}

export default function DocumentsHeader({ documentCount }: DocumentsHeaderProps) {
  return (
    <PageHeader
      eyebrow="Patient Portal"
      title="Documents"
      subtitle={
        documentCount !== undefined
          ? `${documentCount} file${documentCount === 1 ? '' : 's'} on record — insurance cards, lab results and more, all in one place.`
          : 'Upload and manage your insurance cards, lab results and other medical paperwork.'
      }
    />
  );
}