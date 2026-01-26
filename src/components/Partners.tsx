'use client';

export default function Partners() {
  const partners = [
    { name: "Spotify", logo: "MusicStream" },
    { name: "LiveNation", logo: "EventCorp" },
    { name: "SoundCloud", logo: "CloudAudio" },
    { name: "TicketMaster", logo: "Tickety" },
    { name: "RedBull", logo: "EnergyX" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-8">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {partners.map((partner, i) => (
            <div key={i} className="text-2xl font-black text-zinc-600 flex items-center gap-2">
              {/* Fake Logo Icon */}
              <div className="w-8 h-8 rounded-full bg-zinc-800" />
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}