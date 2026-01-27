import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import { EventCard } from '@/components/EventCard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Types
interface TicketType {
  id: number;
  name: string;
  price: number;
  totalSeats: number;
  seatsSold: number;
}
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  ticketTypes: TicketType[];
}

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const events: Event[] = await getEvents();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black font-sans">
      <Navbar />
      <Hero />
      
      {/* Search & Categories Bar (Sticky-ish) */}
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6">
           <CategoryFilter />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        
        {/* Section: Trending Events */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-3 border-green-500/30 text-green-400 bg-green-500/5">
                Happening This Month
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Trending Now
              </h2>
            </div>
          <Link href="/events" className="hidden md:block text-sm font-bold text-green-500 hover:text-green-400 hover:underline transition-colors">
            View All Events &rarr;
          </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
             <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
               <p className="text-zinc-500">No events currently scheduled.</p>
             </div>
          )}
        </section>

        {/* Section: Fake 'Deals' Row (To mimic mytickets.lk deals) */}
        <section className="bg-gradient-to-r from-green-900/20 to-black rounded-3xl p-8 border border-green-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-32 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Exclusive Student Offers</h3>
                <p className="text-zinc-400 max-w-lg">
                  Get up to 50% off on selected tech workshops and music events. 
                  Valid for all university students in Sri Lanka.
                </p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors">
                View Deals
              </button>
           </div>
        </section>

      </div>

      <Partners />
      <Features />
      <Footer />
    </main>
  );
}