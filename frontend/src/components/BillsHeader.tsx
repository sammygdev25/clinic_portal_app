import { PageHeader } from '../components/ui';

interface BillsHeaderProps {
  totalDue?: number;
}

export default function BillsHeader({ totalDue }: BillsHeaderProps) {
  const subtitle =
    totalDue && totalDue > 0
      ? `You have $${Number(totalDue || 0).toFixed(2)} outstanding across your unpaid bills.`
      : 'Review your billing history and keep track of what you owe the clinic.';

  return (
    <PageHeader
      eyebrow="Patient Billing"
      title="Bills & Payments"
      subtitle={subtitle}
    />
  );
}