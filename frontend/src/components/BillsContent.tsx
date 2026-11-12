import type { Bill } from '../types';
import { Section, SkeletonCards, EmptyState, Badge, Price } from '../components/ui';
import { Icon } from '../components/icons';

interface BillsContentProps {
  bills: Bill[];
  loading: boolean;
}

function statusTone(status: string): 'neutral' | 'success' | 'danger' {
  if (status === 'paid') return 'success';
  if (status === 'overdue') return 'danger';
  return 'neutral';
}

function formatDate(value?: string | null): string {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BillsContent({ bills, loading }: BillsContentProps) {
  if (loading) {
    return (
      <Section title="Billing statements" subtitle="Charges for your visits and treatments">
        <SkeletonCards count={4} />
      </Section>
    );
  }

  if (!bills || bills.length === 0) {
    return (
      <Section title="Billing statements" subtitle="Charges for your visits and treatments">
        <EmptyState
          icon="dollar"
          title="No bills yet"
          text="Once a doctor completes a visit, any charges will appear here for you to review and pay."
        />
      </Section>
    );
  }

  return (
    <Section title="Billing statements" subtitle="Charges for your visits and treatments">
      <div className="ds-table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Statement</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due date</th>
              <th>Issued</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(bills) ? bills : []).map((bill) => (
              <tr key={bill.id}>
                <td>
                  <div className="ds-cluster">
                    <Icon name="credit-card" size={16} />
                    <span>Visit charge #{bill.appointment}</span>
                  </div>
                </td>
                <td>
                  <Price value={bill.amount} />
                </td>
                <td>
                  <Badge tone={statusTone(bill.status)}>{bill.status}</Badge>
                </td>
                <td>{formatDate(bill.due_date)}</td>
                <td className="ds-muted">{formatDate(bill.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}