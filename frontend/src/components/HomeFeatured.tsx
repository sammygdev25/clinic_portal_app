import type { DoctorProfile } from '../types';
import { Section, Grid, Card, CardBody, Media, CardTitle, CardMeta, Badge, SkeletonCards, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeFeaturedProps {
  doctors: DoctorProfile[];
  loading?: boolean;
}

export default function HomeFeatured({ doctors, loading }: HomeFeaturedProps) {
  const featured = doctors.slice(0, 8);

  return (
    <Section
      eyebrow="Our Physicians"
      title="Meet Our Doctors"
      subtitle="Experienced, board-certified physicians dedicated to your family's health"
    >
      {loading ? (
        <SkeletonCards count={6} />
      ) : featured.length === 0 ? (
        <EmptyState
          icon="users"
          title="No doctor profiles yet"
          text="Our physician directory is being updated. Please check back soon or call the clinic for scheduling."
        />
      ) : (
        <Grid size="md" cols={4}>
          {(Array.isArray(featured) ? featured : []).map((doctor) => (
            <Card key={doctor.id}>
              <Media
                src={doctor.photo || ''}
                alt={doctor.specialty}
                ratio="portrait"
                badge={`${doctor.years_experience} yrs exp`}
              />
              <CardBody>
                <CardTitle>{doctor.specialty}</CardTitle>
                <CardMeta>
                  {doctor.bio
                    ? doctor.bio.length > 90
                      ? `${doctor.bio.slice(0, 90)}...`
                      : doctor.bio
                    : 'Compassionate, patient-centered care at our clinic.'}
                </CardMeta>
                <Badge tone="primary">
                  <Icon name="award" size={14} /> {doctor.specialty}
                </Badge>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}