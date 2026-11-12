import { Section, Split, Stack, Card, CardBody, CardTitle } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeAboutValue {
  icon: 'shield' | 'clock' | 'heart';
  title: string;
  text: string;
}

interface HomeAboutProps {
  values?: HomeAboutValue[];
}

const DEFAULT_VALUES: HomeAboutValue[] = [
  {
    icon: 'shield',
    title: 'Trusted care',
    text: 'Board-certified doctors and a care team that keeps your history, prescriptions and bills in one secure place.',
  },
  {
    icon: 'clock',
    title: 'Fast scheduling',
    text: 'Book an appointment in minutes, get reminders, and check in online before you even reach the front desk.',
  },
  {
    icon: 'heart',
    title: 'Patient-first',
    text: 'From receptionists to specialists, every visit is coordinated around you — no repeated paperwork, no surprises.',
  },
];

export default function HomeAbout({ values = DEFAULT_VALUES }: HomeAboutProps) {
  return (
    <Section
      eyebrow="About us"
      title="A clinic portal built around your visit"
      subtitle="From the moment you book to the day your bill is settled, our portal keeps patients, doctors and receptionists working from the same up-to-date record."
    >
      <Split>
        <Stack gap="md">
          <p className="ds-lead">
            Our clinic portal was built to take the friction out of healthcare administration. Patients can book
            appointments, review visit history, pay bills and upload documents without a single phone call.
          </p>
          <p className="ds-muted">
            Doctors see their schedule and patient notes in one dashboard, while receptionists manage check-ins and
            the daily calendar in real time. The result is a clinic that runs smoothly for everyone who walks through
            the door — and for the staff keeping it open.
          </p>
          <p className="ds-muted">
            Whether you are here for a routine check-up or ongoing care, our team is committed to clear
            communication, accurate records and appointments that start on time.
          </p>
        </Stack>
        <Stack gap="sm">
          {(Array.isArray(values) ? values : []).map((value) => (
            <Card key={value.title}>
              <CardBody>
                <Stack gap="xs">
                  <Icon name={value.icon} size={22} title={value.title} />
                  <CardTitle>{value.title}</CardTitle>
                  <p className="ds-small">{value.text}</p>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Split>
    </Section>
  );
}