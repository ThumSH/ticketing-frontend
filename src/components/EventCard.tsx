'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import TicketPanel from './TicketPanel';
import Link from 'next/link';
import { Button } from './ui/button';

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
  // Safe Date Handling
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const fullDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-green-500/50 transition-all duration-300"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 gap-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white leading-tight group-hover:text-green-400 transition-colors">
              {event.title}
            </h2>
            <div className="flex flex-col gap-1.5 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                {fullDate}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                {event.venue}
              </span>
            </div>
          </div>
          
          {/* Date Stamp */}
          <div className="flex flex-col items-center justify-center bg-zinc-950 border border-zinc-800 rounded-2xl p-3 min-w-[70px] shadow-xl">
            <span className="text-2xl font-bold text-white">{day}</span>
            <span className="text-xs font-bold text-green-500 uppercase tracking-wider">{month}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-2">
          {event.description}
        </p>

<div className="mt-auto pt-6 border-t border-white/5">
          <Link href={`/events/${event.id}`} className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-500 text-black font-bold h-12 rounded-xl text-lg group-hover:scale-[1.02] transition-transform">
              Book Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}