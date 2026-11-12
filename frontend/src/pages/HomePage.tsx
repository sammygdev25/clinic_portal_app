import { useEffect, useState } from 'react';
import HomeHero from '../components/HomeHero';
import HomeFeatured from '../components/HomeFeatured';
import HomeCategories from '../components/HomeCategories';
import HomeAbout from '../components/HomeAbout';
import HomeCta from '../components/HomeCta';
import { getDoctorProfileList } from '../api';
import { useAuth } from '../contexts/AuthContext';
import type { DoctorProfile } from '../types';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getDoctorProfileList();
        if (mounted) {
          const list = Array.isArray(data) ? data : [];
          setDoctors(list.length > 0 ? list : [
            {
              id: 'fallback-1',
              name: 'Dr. Sarah Chen',
              specialty: 'Family Medicine',
              imageUrl: '/img/brand/about.jpg',
            } as DoctorProfile,
            {
              id: 'fallback-2',
              name: 'Dr. James Patel',
              specialty: 'Internal Medicine',
              imageUrl: '/img/brand/about.jpg',
            } as DoctorProfile,
            {
              id: 'fallback-3',
              name: 'Dr. Maria Gonzalez',
              specialty: 'Pediatrics',
              imageUrl: '/img/brand/about.jpg',
            } as DoctorProfile,
          ]);
        }
      } catch (err) {
        if (mounted) {
          setDoctors([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="ds-stack-lg">
      <HomeHero imageUrl="/img/brand/hero.jpg" />
      <HomeFeatured doctors={doctors} loading={loading} />
      <HomeCategories />
      <HomeAbout />
      <HomeCta isAuthenticated={isAuthenticated} />
    </div>
  );
}