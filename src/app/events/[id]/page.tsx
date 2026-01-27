import { notFound } from 'next/navigation';
import Link from 'next/link'; // <--- Import Link
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TicketPanel from '@/components/TicketPanel';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Share2, Info } from 'lucide-react';

// Fetch specific event data
async function getEvent(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function BookingPage({ params }: { params: { id: string } }) {
  // Await params for Next.js 15+ compatibility
  const { id } = await Promise.resolve(params); 
  const event = await getEvent(id);

  if (!event) return notFound();

  const eventDate = new Date(event.date);
  const fullDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        
        {/* 👇 FIXED: Used Link instead of <a> */}
        <Link href="/" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
          &larr; Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Event Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative overflow-hidden rounded-3xl aspect-video bg-zinc-900 border border-white/10">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-0 left-0 p-8">
                  <Badge className="bg-green-500 text-black font-bold mb-4 hover:bg-green-400">
                    Selling Fast
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-2">
                    {event.title}
                  </h1>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 text-zinc-300">
              <div className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex-1">
                <div className="bg-zinc-800 p-3 rounded-full text-green-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold">Date & Time</p>
                  <p className="font-medium">{fullDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex-1">
                <div className="bg-zinc-800 p-3 rounded-full text-green-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Info className="text-green-500" /> About Event
              </h3>
              <p className="text-zinc-400 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
              <div className="mb-6 pb-6 border-b border-white/5">
                <h3 className="text-xl font-bold text-white mb-1">Select Tickets</h3>
                <p className="text-sm text-zinc-500">Choose your preferred category</p>
              </div>
              
              <TicketPanel eventId={event.id} initialTypes={event.ticketTypes} />

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-zinc-500 flex items-center justify-center gap-2">
                  <Share2 className="w-3 h-3" /> Share this event
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}