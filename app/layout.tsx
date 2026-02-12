import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: 'Eli Nails | Prothésiste ongulaire premium', template: '%s | Eli Nails' },
  description: 'Salon de pose d’ongles premium à Maisse (91) : gel, semi-permanent, nail art et réservations en ligne.',
  openGraph: {
    title: 'Eli Nails',
    description: 'Prothésiste ongulaire premium à Maisse (91)',
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
