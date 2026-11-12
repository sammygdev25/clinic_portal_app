import type { Bill } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Badge, Price } from '../components/ui';
import { Icon } from '../components/icons';
import { formatDate } from '../utils';

interface BillCardProps {
  bill: Bill;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'paid':
      return 'success';
    case 'overdue':
      return 'danger';
    case 'unpaid':
    default:
      return 'soft';
  }
}

function BillCard({ bill }: BillCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="ds-between">
          <CardTitle>Bill #{bill.id}</CardTitle>
          <Badge tone={statusTone(bill.status)}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </Badge>
        </div>
        <CardMeta>
          <Icon name="calendar" size={16} />
          {bill.due_date ? `Due ${formatDate(bill.due_date)}` : 'No due date set'}
        </CardMeta>
        <CardFooter>
          <Price value={Number(bill.amount)} />
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export default BillCard;