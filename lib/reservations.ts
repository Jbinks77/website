import { promises as fs } from 'fs';
import path from 'path';
import { Reservation } from './types';
import { isSlotAvailable, minutesToTime, timeToMinutes } from './utils';

const filePath = path.join(process.cwd(), 'data', 'reservations.json');

export async function readReservations(): Promise<Reservation[]> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as Reservation[];
}

export async function createReservation(input: Omit<Reservation, 'id' | 'createdAt' | 'end'>) {
  const reservations = await readReservations();
  const startMin = timeToMinutes(input.start);
  const end = minutesToTime(startMin + input.duration);

  if (!isSlotAvailable(input.date, input.start, input.duration, reservations)) {
    throw new Error('Ce créneau n’est plus disponible.');
  }

  const record: Reservation = {
    ...input,
    id: `${Date.now()}`,
    end,
    createdAt: new Date().toISOString()
  };

  reservations.push(record);
  await fs.writeFile(filePath, JSON.stringify(reservations, null, 2), 'utf-8');
  return record;
}
