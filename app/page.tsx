import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { SERVICES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

const benefits = ['Hygiène irréprochable', 'Produits premium', 'Tenue longue durée', 'Conseils personnalisés'];

export default function HomePage() {
  return (
    <div>
      <section className="bg-hero-glow">
        <div className="section-wrap flex min-h-[88vh] flex-col items-start justify-center gap-6">
          <p className="rounded-full border border-nude bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em]">Prothésiste ongulaire à Paris</p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">Élégance nude, finition parfaite, tenue durable.</h1>
          <p className="max-w-xl text-espresso/80">Offrez à vos mains une signature raffinée avec des prestations sur-mesure, dans une atmosphère chic et apaisante.</p>
          <div className="flex gap-3">
            <Button href="/reservation">Réserver</Button>
            <Button href="/galerie" variant="outline">Voir la galerie</Button>
          </div>
        </div>
      </section>

      <section className="section-wrap py-20">
        <h2 className="mb-8 text-3xl font-semibold">Prestations</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.name} className="transition-transform hover:-translate-y-1">
              <h3 className="text-xl font-medium">{service.name}</h3>
              <p className="mt-2 text-sm text-espresso/75">{service.description}</p>
              <p className="mt-4 text-sm font-semibold">À partir de {formatPrice(service.priceFrom)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <h2 className="mb-6 text-3xl font-semibold">Pourquoi nous</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {benefits.map((item) => (
            <Card key={item}><p className="text-sm font-medium">{item}</p></Card>
          ))}
        </div>
      </section>

      <section className="section-wrap py-20">
        <h2 className="mb-6 text-3xl font-semibold">Avis clientes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {['Le meilleur rendu nude que j’ai eu.', 'Accueil adorable et résultat parfait.', 'Tenue incroyable, je recommande à 100%.'].map((quote, i) => (
            <Card key={quote}><p className="text-sm">“{quote}”</p><p className="mt-3 text-xs text-espresso/60">— Cliente #{i + 1}</p></Card>
          ))}
        </div>
      </section>

      <section className="section-wrap py-8">
        <h2 className="mb-6 text-3xl font-semibold">Localisation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <p className="font-medium">12 rue des Fleurs, 75010 Paris</p>
            <p className="mt-2 text-sm text-espresso/80">Mar–Sam 10:00–19:00 (pause 13:00–14:00)</p>
          </Card>
          <Card className="flex h-52 items-center justify-center bg-nude/30">
            <p className="text-sm">Carte interactive (placeholder)</p>
          </Card>
        </div>
      </section>

      <section className="section-wrap py-16">
        <Card className="flex flex-col items-start justify-between gap-4 bg-white md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Réserve ton créneau</h2>
            <p className="text-sm text-espresso/75">Les places du soir partent vite, pense à anticiper.</p>
          </div>
          <Button href="/reservation">Prendre rendez-vous</Button>
        </Card>
      </section>
    </div>
  );
}
