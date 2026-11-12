import { Section, Grid, Card, CardBody, CardTitle, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

export interface HomeCategoriesStep {
  icon: IconName;
  title: string;
  text: string;
}

export interface HomeCategoriesProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: HomeCategoriesStep[];
}

const defaultSteps: HomeCategoriesStep[] = [
  {
    icon: 'calendar',
    title: 'Book an appointment',
    text: 'Choose a doctor and a time that works for you, right from your patient dashboard.',
  },
  {
    icon: 'map-pin',
    title: 'Visit the clinic',
    text: 'Check in on arrival and meet with your doctor at your scheduled time.',
  },
  {
    icon: 'book',
    title: 'Review your records',
    text: 'Access visit notes, prescriptions, bills and documents anytime online.',
  },
];

export default function HomeCategories({
  eyebrow = 'How it works',
  title = 'Getting care is simple',
  subtitle = 'From booking to follow-up, our patient portal keeps every step of your visit in one place.',
  steps = defaultSteps,
}: HomeCategoriesProps) {
  return (
    <Section eyebrow={eyebrow} title={title} subtitle={subtitle}>
      <Grid size="sm" cols={3}>
        {(Array.isArray(steps) ? steps : []).map((step, index) => (
          <Card key={step.title}>
            <CardBody>
              <Icon name={step.icon} size={28} title={step.title} />
              <CardTitle>{`${index + 1}. ${step.title}`}</CardTitle>
              <CardMeta>{step.text}</CardMeta>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
