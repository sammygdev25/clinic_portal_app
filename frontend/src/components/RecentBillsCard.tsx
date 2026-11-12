import { Card, CardBody, CardTitle, CardMeta, Badge, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import { formatCurrency, formatDate } from '../utils';
import type { Bill } from '../types';

interface RecentBillsCardProps {
  bills: Bill[];
}

function statusTone(status: string): 'success' | 'danger' | 'neutral' {
  if (status === 'paid') return 'success';
  if (status === 'overdue') return 'danger';
  return 'neutral';
}

function RecentBillsCard({ bills }: RecentBillsCardProps) {
  const items = Array.isArray(bills) ? bills : [];

  return (
    <Card>
      <CardBody>
        <CardTitle>Recent Bills</CardTitle>
        {items.length === 0 ? (
          <EmptyState
            icon="credit-card"
            title="No bills yet"
            text="Your billing history will appear here after your visits."
          />
        ) : (
          <div className="ds-stack">
            {items.slice(0, 5).map((bill) => (
              <div key={bill.id} className="ds-between">
                <div>
                  <div className="ds-card-title">{formatCurrency(Number(bill.amount))}</div>
                  <CardMeta>
                    <Icon name="calendar" size={14} />
                    {bill.due_date ? `Due ${formatDate(bill.due_date)}` : 'No due date'}
                  </CardMeta>
                </div>
                <Badge tone={statusTone(bill.status)}>{bill.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default RecentBillsCard;