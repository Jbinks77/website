'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { SERVICES } from '@/lib/constants';
import { Reservation } from '@/lib/types';
import { buildSlots, getServiceDuration, isOpenDay, isSlotAvailable, toIsoDate } from '@/lib/utils';
import { Button } from '@/components/Button';

function getMonthDays(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const last = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: last }).map((_, i) => new Date(year, month, i + 1));
}

export function ReservationPageClient() {
  const router = useRouter();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(toIsoDate(new Date()));
  const [service, setService] = useState(SERVICES[0].name);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '', start: '' });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/reservations').then((r) => r.json()).then((d) => setReservations(d.reservations || []));
  }, []);

  const duration = getServiceDuration(service);
  const available = useMemo(
    () => buildSlots(duration).filter((slot) => isSlotAvailable(selectedDate, slot, duration, reservations)),
    [duration, reservations, selectedDate]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, service, date: selectedDate, duration })
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Erreur lors de la réservation.');
    router.push(`/merci?name=${encodeURIComponent(form.name)}&date=${selectedDate}&time=${form.start}&service=${encodeURIComponent(service)}`);
  };

  return (
    <section className="section-wrap py-14">
      <h1 className="text-4xl font-semibold">Réservation</h1>
      <p className="mt-2 text-sm text-espresso/75">Choisissez votre créneau puis confirmez en quelques clics.</p>

      <div className="mt-6 flex gap-2">
        <Button variant={view === 'calendar' ? 'primary' : 'outline'} onClick={() => setView('calendar')}>Vue mensuelle</Button>
        <Button variant={view === 'list' ? 'primary' : 'outline'} onClick={() => setView('list')}>Vue liste</Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>←</button>
            <h2 className="font-medium">{month.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>→</button>
          </div>

          {view === 'calendar' ? (
            <div className="grid grid-cols-7 gap-2">
              {getMonthDays(month).map((date) => {
                const iso = toIsoDate(date);
                const open = isOpenDay(date);
                return (
                  <button key={iso} disabled={!open} onClick={() => setSelectedDate(iso)} className={`rounded-xl p-2 text-sm transition ${selectedDate === iso ? 'bg-rosegold text-white' : open ? 'bg-nude/40 hover:bg-nude' : 'cursor-not-allowed bg-gray-100 text-gray-400'}`}>
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ) : (
            <ul className="space-y-2">
              {getMonthDays(month).filter(isOpenDay).map((d) => {
                const iso = toIsoDate(d);
                return (
                  <li key={iso}>
                    <button className={`w-full rounded-xl p-2 text-left ${selectedDate === iso ? 'bg-rosegold text-white' : 'bg-nude/40'}`} onClick={() => setSelectedDate(iso)}>
                      {d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold">Créneaux disponibles</h3>
            <div className="flex flex-wrap gap-2">
              {available.map((slot) => (
                <button key={slot} onClick={() => setForm((f) => ({ ...f, start: slot }))} className={`rounded-full px-3 py-1 text-xs ${form.start === slot ? 'bg-rosegold text-white' : 'bg-nude/50'}`}>
                  {slot}
                </button>
              ))}
              {!available.length && <p className="text-xs text-espresso/70">Aucun créneau disponible ce jour.</p>}
            </div>
          </div>
        </Card>

        <Card>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm">Prestation</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-xl border border-nude bg-white p-2">
                {SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name} — {s.duration} min</option>)}
              </select>
            </div>
            <input required placeholder="Nom" className="w-full rounded-xl border border-nude p-2" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input required placeholder="Téléphone" className="w-full rounded-xl border border-nude p-2" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <input required type="email" placeholder="Email" className="w-full rounded-xl border border-nude p-2" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <textarea placeholder="Commentaire" className="w-full rounded-xl border border-nude p-2" value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} />
            <p className="text-xs text-espresso/70">Durée estimée : {duration} min • Date : {selectedDate} • Heure : {form.start || 'non sélectionnée'}</p>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={!form.start}>Confirmer la réservation</Button>
          </form>
        </Card>
      </div>

      <Card className="mt-8 bg-white/80">
        <h3 className="font-semibold">Politique d’annulation</h3>
        <p className="mt-2 text-sm text-espresso/75">Annulation ou report possible jusqu’à 24h avant le rendez-vous. En dessous de ce délai, un acompte peut être conservé.</p>
      </Card>
    </section>
  );
}
