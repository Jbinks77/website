import type { Metadata } from 'next';
import { ReservationPageClient } from '@/components/ReservationPageClient';

export const metadata: Metadata = {
  title: 'Réservation',
  description: 'Réservez votre rendez-vous en ligne avec notre agenda intelligent.'
};

export default function ReservationPage() {
  return <ReservationPageClient />;
}
