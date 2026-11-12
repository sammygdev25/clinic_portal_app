import { Section, Grid, Card, CardBody, CardTitle, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';

interface AppointmentBookingInfoProps {
  section?: string;
  page?: string;
}

export default function AppointmentBookingInfo(props: AppointmentBookingInfoProps) {
  return (
    <Section title="Good to know" tight>
      <Grid size="sm">
        <Card>
          <CardBody>
            <Icon name="clock" size={20} />
            <CardTitle>Clinic Hours</CardTitle>
            <CardMeta>
              Monday - Friday: 8:00 AM - 6:00 PM. Saturday: 9:00 AM - 1:00 PM.
              Closed Sundays and public holidays.
            </CardMeta>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Icon name="map-pin" size={20} />
            <CardTitle>Where To Go</CardTitle>
            <CardMeta>
              Check in at the front desk 10 minutes before your appointment.
              Bring a valid ID and your insurance card if this is your first visit.
            </CardMeta>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Icon name="calendar" size={20} />
            <CardTitle>What Happens Next</CardTitle>
            <CardMeta>
              Your doctor will review your reason for visit before the appointment.
              You will receive a confirmation and can track or cancel it anytime
              from your dashboard.
            </CardMeta>
          </CardBody>
        </Card>
      </Grid>
    </Section>
  );
}