'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { InstagramPost } from '@/lib/types';

const PAGE_SIZE = 6;
const filters = ['Tous', 'Nail art', 'Nude', 'Couleurs'];

export function InstagramGallery() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<InstagramPost | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [activeFilter, setActiveFilter] = useState('Tous');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/instagram');
        const data = await res.json();
        setPosts(data.posts || []);
        if (data.message) setError(data.message);
      } catch {
        setError('Impossible de charger Instagram pour le moment.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(
    () => posts.filter((p) => activeFilter === 'Tous' || p.tags?.includes(activeFilter)),
    [posts, activeFilter]
  );

  const displayPosts = filtered.slice(0, visible);

  return (
    <section className="section-wrap py-14">
      <h1 className="text-4xl font-semibold">Galerie Instagram</h1>
      <p className="mt-2 text-sm text-espresso/75">Nos dernières inspirations, synchronisées automatiquement.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => { setActiveFilter(f); setVisible(PAGE_SIZE); }} className={`rounded-full px-3 py-1 text-xs transition ${activeFilter === f ? 'bg-rosegold text-white' : 'bg-white'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading && <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-72 animate-pulse rounded-3xl bg-nude/60" />)}</div>}

      {!loading && error && <Card className="mt-6 border border-rosegold/30 bg-rosegold/5 text-sm">{error}</Card>}

      {!loading && !filtered.length && <Card className="mt-6 text-sm">Aucun post pour ce filtre actuellement.</Card>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post) => (
          <button key={post.id} className="group text-left" onClick={() => setSelected(post)}>
            <Card className="overflow-hidden p-0">
              <div className="relative h-72 w-full overflow-hidden">
                <Image src={post.media_url} alt="Post Instagram" fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs text-espresso/60">{new Date(post.timestamp).toLocaleDateString('fr-FR')}</p>
                <p className="line-clamp-2 text-sm">{post.caption || 'Nouvelle réalisation.'}</p>
                <a href={post.permalink} target="_blank" className="text-xs font-semibold text-rosegold">Voir sur Instagram</a>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {visible < filtered.length && <div className="mt-8"><Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Charger plus</Button></div>}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative h-80 w-full overflow-hidden rounded-2xl">
              <Image src={selected.media_url} alt="Aperçu post" fill className="object-cover" />
            </div>
            <div className="space-y-3 p-2">
              <Badge>{new Date(selected.timestamp).toLocaleDateString('fr-FR')}</Badge>
              <p className="text-sm text-espresso/90">{selected.caption}</p>
              <a href={selected.permalink} target="_blank" className="text-sm font-semibold text-rosegold underline">Voir le post original</a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
