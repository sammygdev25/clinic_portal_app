import { Section, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeCtaProps {
  isAuthenticated?: boolean;
}

export default function HomeCta({ isAuthenticated }: HomeCtaProps) {
  return (
    <Section tight>
      <div className="ds-card ds-card-body ds-between">
        <p className="ds-lead">
          Ready to see a doctor? Book your appointment online in minutes or create your patient account to get started.
        </p>
        <Button
          variant="primary"
          size="lg"
          to={isAuthenticated ? '/appointments' : '/register'}
        >
          {isAuthenticated ? 'Book an Appointment' : 'Sign Up Today'}
          <Icon name="arrow-right" size={18} />
        </Button>
      </div>
    </Section>
  );
}