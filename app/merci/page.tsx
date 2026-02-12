export default function MerciPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <section className="section-wrap py-20">
      <div className="max-w-2xl rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold">Merci {searchParams.name || 'beauté'} ✨</h1>
        <p className="mt-3 text-sm text-espresso/80">Votre réservation est confirmée.</p>
        <ul className="mt-4 space-y-1 text-sm">
          <li>Prestation : {searchParams.service}</li>
          <li>Date : {searchParams.date}</li>
          <li>Heure : {searchParams.time}</li>
        </ul>
      </div>
    </section>
  );
}
