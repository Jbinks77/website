import { NextResponse } from 'next/server';
import { createReservation, readReservations } from '@/lib/reservations';
import { reservationSchema } from '@/lib/validators';

export async function GET() {
  const reservations = await readReservations();
  return NextResponse.json({ reservations });
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Données invalides.' }, { status: 400 });
  }

  try {
    const reservation = await createReservation(parsed.data);
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erreur serveur.' }, { status: 409 });
  }
}
