export function Footer() {
  return (
    <footer className="mt-20 border-t border-nude bg-white/70 py-12">
      <div className="section-wrap grid gap-6 text-sm text-espresso/90 md:grid-cols-4">
        <div>
          <h3 className="mb-2 font-semibold">Eli Nails</h3>
          <p>8 place de la Mairie, 91720 Maisse</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Horaires</h3>
          <p>Mar–Sam : 10:00–19:00</p>
          <p>Pause : 13:00–14:00</p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Contact</h3>
          <p>+33 6 12 34 56 78</p>
          <a href="https://instagram.com" target="_blank" className="underline">@elinails</a>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Informations</h3>
          <a href="#" className="underline">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}
