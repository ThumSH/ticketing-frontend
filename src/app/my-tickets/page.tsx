'use client'; 

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Ticket as TicketIcon, Calendar, MapPin, QrCode, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Ticket {
  id: number;
  createdAt: string;
  event: {
    title: string;
    venue: string;
    date: string;
  };
  ticketType: {
    name: string;
    price: number;
  };
}

export default function MyTickets() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      if (isLoaded && !isSignedIn) setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/user/${user.id}`);
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log('Failed to load tickets',error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [isLoaded, isSignedIn, user]);

  // 1. Loading State (Skeleton)
  if (loading) return (
    <div className="min-h-screen pt-24 px-6 flex justify-center">
       <div className="animate-pulse flex flex-col gap-4 w-full max-w-2xl">
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="h-48 bg-gray-800 rounded-xl"></div>
          <div className="h-48 bg-gray-800 rounded-xl"></div>
       </div>
    </div>
  );
  
  // 2. Not Signed In State
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="bg-purple-500/10 p-6 rounded-full mb-6">
          <TicketIcon className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Your Wallet</h1>
        <p className="text-gray-400 mb-8 max-w-md">Sign in to view your purchased tickets and access your QR codes.</p>
      </div>
    );
  }

 return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Digital Wallet
            </h1>
            <p className="text-gray-400 text-sm">
              {user.firstName ? `Welcome back, ${user.firstName}` : 'Your secure tickets'}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {tickets.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-700 rounded-3xl bg-gray-900/30">
            <p className="text-gray-400 mb-4">No tickets found in your wallet.</p>
            <Link href="/">
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                Browse Events
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tickets.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* The Ticket Card */}
                <div className="relative bg-gray-900 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
                  
                  {/* Decorative Gradient Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl -mr-16 -mt-16 rounded-full pointer-events-none"></div>

                  <div className="p-6 relative z-10">
                    {/* Event Title & Type */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <Badge variant="secondary" className="mb-2 bg-purple-500/10 text-purple-300 border-purple-500/20">
                          {t.ticketType.name} Pass
                        </Badge>
                        <h3 className="text-xl font-bold text-white leading-tight">{t.event.title}</h3>
                      </div>
                      <div className="text-right">
                         <span className="block text-xs text-gray-500 uppercase tracking-wider">Price</span>
                         <span className="font-mono font-bold text-lg text-emerald-400">LKR {t.ticketType.price}</span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                          <Calendar className="w-3 h-3" /> Date
                        </div>
                        <div className="text-gray-300 font-medium">
                          {new Date(t.event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                          <Clock className="w-3 h-3" /> Time
                        </div>
                        <div className="text-gray-300 font-medium">7:00 PM</div>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                          <MapPin className="w-3 h-3" /> Venue
                        </div>
                        <div className="text-gray-300 font-medium truncate">{t.event.venue}</div>
                      </div>
                    </div>

                    {/* Dotted Divider (Tear-off effect) */}
                    <div className="relative h-px bg-gray-700 my-6">
                       <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-background z-20"></div>
                       <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-background z-20"></div>
                    </div>

                    {/* Footer / QR Code Placeholder */}
                    <div className="flex items-center justify-between">
                       <div className="text-xs text-gray-500 font-mono">
                          ID: #{t.id.toString().padStart(6, '0')}
                          <br />
                          Purchased: {new Date(t.createdAt).toLocaleDateString()}
                       </div>
                       
                       {/* Fake QR Code */}
                       <div className="bg-white p-1 rounded">
                          <QrCode className="w-12 h-12 text-black" />
                       </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

