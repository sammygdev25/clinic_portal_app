import { PageHeader } from '../components/ui';

interface VisitHistoryHeaderProps {
  userName: string;
}

export default function VisitHistoryHeader({ userName }: VisitHistoryHeaderProps) {
  return (
    <PageHeader
      eyebrow="Medical Records"
      title="Visit History"
      subtitle={`Doctor-authored visit notes and prescriptions for ${userName}, visible only to you and your treating doctor.`}
    />
  );
}