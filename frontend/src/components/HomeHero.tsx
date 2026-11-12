import React from 'react';
import { Hero, Button, Media } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeHeroProps {
  imageUrl?: string;
}

export default function HomeHero({ imageUrl = '/img/brand/hero.jpg' }: HomeHeroProps) {
  const media = imageUrl ? (
    <Media src={imageUrl} alt="Clinic reception and care team" ratio="wide" />
  ) : undefined;

  return (
    <Hero
      eyebrow="Riverside Family Clinic"
      title="Your health, scheduled on your terms"
      text="Book appointments with our doctors in minutes, track your visit history and bills in one place, and let our front desk team keep your care organized from check-in to follow-up."
      actions={
        <>
          <Button to="/appointments" size="lg">
            <Icon name="calendar" size={18} />
            Book an appointment
          </Button>
          <Button to="/login" variant="ghost" size="lg">
            Patient sign in
            <Icon name="arrow-right" size={18} />
          </Button>
        </>
      }
      media={media}
    />
  );
}