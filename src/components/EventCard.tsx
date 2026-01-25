'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import TicketPanel from './TicketPanel';

// Re-define interfaces locally or import from a shared types file
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

export function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect
      className="group relative overflow-hidden rounded-3xl bg-gray-900/40 border border-white/10 hover:border-purple-500/30 transition-colors backdrop-blur-md"
    >
      {/* Glow Effect behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition duration-500" />

      <div className="relative p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {event.title}
            </h2>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                {event.venue}
              </span>
            </div>
          </div>
          
          {/* Date Circle */}
          <div className="text-center bg-white/5 border border-white/10 rounded-xl p-3 min-w-[70px]">
            <span className="block text-2xl font-bold text-white">
              {new Date(event.date).getDate()}
            </span>
            <span className="block text-xs uppercase text-gray-400 font-bold">
              {new Date(event.date).toLocaleString('default', { month: 'short' })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-8 leading-relaxed border-l-2 border-purple-500/30 pl-4">
          {event.description}
        </p>

        {/* Ticket Actions */}
        <TicketPanel eventId={event.id} initialTypes={event.ticketTypes} />
      </div>
    </motion.div>
  );
}