import type { Metadata } from 'next';
import { InstagramGallery } from '@/components/InstagramGallery';

export const metadata: Metadata = {
  title: 'Galerie Instagram',
  description: 'Découvrez les dernières poses d’ongles du salon Eli Nails.'
};

export default function GaleriePage() {
  return <InstagramGallery />;
}
