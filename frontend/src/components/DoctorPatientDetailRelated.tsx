import { Section, Grid, Card, CardBody, CardTitle, CardMeta, Media } from '../components/ui';
import { Icon } from '../components/icons';
import type { DoctorProfile } from '../types';

interface DoctorPatientDetailRelatedProps {
  doctors: DoctorProfile[];
}

export default function DoctorPatientDetailRelated({ doctors }: DoctorPatientDetailRelatedProps) {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  const related = doctors.slice(0, 6);

  return (
    <Section
      eyebrow="Care team"
      title="Other treating physicians"
      subtitle="Doctors who have also seen this patient across the clinic"
      tight
    >
      <Grid size="sm">
        {(Array.isArray(related) ? related : []).map((doctor) => (
          <Card key={doctor.id}>
            <Media
              src={doctor.photo}
              alt={doctor.specialty}
              ratio="square"
              badge={`${doctor.years_experience} yrs`}
            />
            <CardBody>
              <CardTitle>{doctor.specialty}</CardTitle>
              <CardMeta>
                <Icon name="award" size={14} />
                {doctor.years_experience} years experience
              </CardMeta>
              {doctor.bio ? (
                <p className="ds-muted ds-small">{doctor.bio}</p>
              ) : null}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}