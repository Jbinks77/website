import { Service } from './types';

export const SERVICES: Service[] = [
  { name: 'Pose Gel', description: 'Renforcement et finition brillante longue tenue.', priceFrom: 55, duration: 90 },
  { name: 'Semi-permanent', description: 'Couleur intense et naturelle jusqu’à 3 semaines.', priceFrom: 35, duration: 60 },
  { name: 'Nail art', description: 'Design sur-mesure et détails artistiques premium.', priceFrom: 65, duration: 120 },
  { name: 'Remplissage', description: 'Retouche impeccable pour conserver une ligne parfaite.', priceFrom: 45, duration: 75 },
  { name: 'Dépose', description: 'Retrait en douceur avec protection de l’ongle naturel.', priceFrom: 20, duration: 30 },
  { name: 'Soin mains', description: 'Soin complet hydratant, cuticules et massage.', priceFrom: 30, duration: 45 }
];

export const BUSINESS_HOURS = {
  daysOpen: [2, 3, 4, 5, 6],
  startHour: 10,
  endHour: 19,
  breakStart: 13,
  breakEnd: 14,
  slotMinutes: 30
};
