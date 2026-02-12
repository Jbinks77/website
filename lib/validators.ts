import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string().min(2, 'Le nom est requis.'),
  phone: z.string().min(10, 'Téléphone invalide.').max(15),
  email: z.string().email('Email invalide.'),
  service: z.string().min(1, 'Sélectionnez une prestation.'),
  duration: z.number().min(30),
  comment: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide.'),
  start: z.string().regex(/^\d{2}:\d{2}$/)
});
