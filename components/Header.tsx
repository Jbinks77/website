import Link from 'next/link';
import { Button } from './Button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-nude/70 bg-ivory/90 backdrop-blur">
      <div className="section-wrap flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em]">ATELIER ROSÉ</Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/">Accueil</Link>
          <Link href="/galerie">Galerie</Link>
          <Link href="/reservation">Réservation</Link>
        </nav>
        <Button href="/reservation" className="text-xs md:text-sm">Réserver</Button>
      </div>
    </header>
  );
}
