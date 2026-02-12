import { BUSINESS_HOURS, SERVICES } from './constants';
import { Reservation } from './types';

export const formatPrice = (price: number) => `${price}€`;

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

export const getServiceDuration = (serviceName: string) => SERVICES.find((s) => s.name === serviceName)?.duration ?? 60;

export const isOpenDay = (date: Date) => BUSINESS_HOURS.daysOpen.includes(date.getDay());

export const timeToMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};

export const minutesToTime = (total: number) => `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;

export const buildSlots = (duration: number) => {
  const slots: string[] = [];
  const start = BUSINESS_HOURS.startHour * 60;
  const end = BUSINESS_HOURS.endHour * 60;
  const breakStart = BUSINESS_HOURS.breakStart * 60;
  const breakEnd = BUSINESS_HOURS.breakEnd * 60;

  for (let t = start; t + duration <= end; t += BUSINESS_HOURS.slotMinutes) {
    const endsAt = t + duration;
    const overlapsBreak = t < breakEnd && endsAt > breakStart;
    if (!overlapsBreak) slots.push(minutesToTime(t));
  }

  return slots;
};

export const isSlotAvailable = (date: string, start: string, duration: number, reservations: Reservation[]) => {
  const startMin = timeToMinutes(start);
  const endMin = startMin + duration;

  return !reservations
    .filter((r) => r.date === date)
    .some((r) => {
      const rStart = timeToMinutes(r.start);
      const rEnd = timeToMinutes(r.end);
      return startMin < rEnd && endMin > rStart;
    });
};
