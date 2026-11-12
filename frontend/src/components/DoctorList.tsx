import type { DoctorProfile } from '../types';
import { Grid, Card, CardBody, CardTitle, CardMeta, Media, EmptyState } from '../components/ui';

interface DoctorListProps {
  doctors: DoctorProfile[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  const list = Array.isArray(doctors) ? doctors : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="users"
        title="No doctors listed yet"
        text="Our clinic roster will appear here once doctors are added."
      />
    );
  }

  return (
    <Grid size="md" cols={3}>
      {list.map((doctor) => {
        const name = (doctor as any).user_name || (doctor as any).username || doctor.specialty;
        return (
          <Card key={doctor.id}>
            <Media
              src={doctor.photo || ''}
              alt={name}
              ratio="square"
            />
            <CardBody>
              <CardTitle>{name}</CardTitle>
              <CardMeta>{doctor.specialty}</CardMeta>
              <CardMeta>{doctor.years_experience} years experience</CardMeta>
              {doctor.bio && <p className="ds-muted ds-small">{doctor.bio}</p>}
            </CardBody>
          </Card>
        );
      })}
    </Grid>
  );
}