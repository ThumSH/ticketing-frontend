import TicketPanel from "../components/TicketPanel";

// 1. Update Interfaces to match new Backend Response
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
  ticketTypes: TicketType[]; // <--- The Array of Categories
}

async function getEvents() {
  const res = await fetch('http://127.0.0.1:3001/events', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export default async function Home() {
  const events: Event[] = await getEvents();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-12 text-center text-blue-500 tracking-wider">
        TICKETMASTER <span className="text-white text-lg font-normal">PRO</span>
      </h1>

      <div className="grid gap-8 max-w-4xl mx-auto">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
          >
            {/* Header Section */}
            <div className="bg-gray-900/50 p-6 border-b border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center">📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span className="flex items-center">📍 {event.venue}</span>
                  </div>
                </div>
                {/* We could add an event image here later */}
              </div>
              <p className="mt-4 text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {/* Ticket Section */}
            <div className="p-6 bg-gray-800">
              {/* Pass the Categories to the Smart Component */}
              <TicketPanel 
                eventId={event.id} 
                initialTypes={event.ticketTypes} 
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}