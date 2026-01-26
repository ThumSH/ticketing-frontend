import Navbar from '@/components/Navbar';
import TicketPanel from '@/components/TicketPanel';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { EventCard } from '@/components/EventCard';


// Backend Data Types
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
  // Ensure this URL matches your backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Home() {
  const events: Event[] = await getEvents();

  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mb-16 text-center space-y-6">
        <Badge variant="outline" className="border-purple-500/50 text-purple-300 px-4 py-1 text-sm uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="w-3 h-3 mr-2 text-purple-400" />
          Live Music Experience
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 tracking-tight">
          Find Your <br/> Next <span className="text-purple-500">Rhythm.</span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Secure your spot at the hottest musical events in Sri Lanka. 
          Real-time ticketing, instant QR codes, zero hassle.
        </p>

      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </main>
  );
}

