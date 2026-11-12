import { Grid, Card, CardBody, CardTitle, CardMeta, EmptyState } from '../components/ui';
import { Icon, IconName } from '../components/icons';
import type { Service } from '../types';

interface ServiceListProps {
  services: Service[];
}

function iconNameFor(icon: string): IconName {
  const known: IconName[] = [
    'search', 'cart', 'user', 'users', 'menu', 'close', 'arrow-right', 'arrow-left',
    'chevron-down', 'chevron-right', 'chevron-left', 'plus', 'minus', 'trash', 'edit',
    'check', 'star', 'heart', 'home', 'book', 'tag', 'filter', 'grid', 'list', 'calendar',
    'clock', 'mail', 'phone', 'map-pin', 'info', 'alert', 'package', 'truck', 'credit-card',
    'dollar', 'logout', 'login', 'settings', 'eye', 'download', 'upload', 'image', 'external',
    'refresh', 'shield', 'bell', 'sun', 'moon', 'award', 'message', 'quote', 'sparkle'
  ];
  if (known.includes(icon as IconName)) {
    return icon as IconName;
  }
  return 'sparkle';
}

export default function ServiceList({ services }: ServiceListProps) {
  if (!Array.isArray(services) || services.length === 0) {
    return (
      <EmptyState
        icon="info"
        title="No services listed yet"
        text="Our clinic services will appear here once they are added."
      />
    );
  }

  return (
    <Grid size="md" cols={3}>
      {services.map((service) => (
        <Card key={service.id}>
          <CardBody>
            <Icon name={iconNameFor(service.icon)} size={28} />
            <CardTitle>{service.name}</CardTitle>
            {service.description && (
              <CardMeta>{service.description}</CardMeta>
            )}
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
}