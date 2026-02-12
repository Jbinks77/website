import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: 'Atelier Rosé | Prothésiste ongulaire premium', template: '%s | Atelier Rosé' },
  description: 'Salon de pose d’ongles premium à Paris : gel, semi-permanent, nail art et réservations en ligne.',
  openGraph: {
    title: 'Atelier Rosé',
    description: 'Prothésiste ongulaire premium à Paris',
    type: 'website',
    locale: 'fr_FR'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
