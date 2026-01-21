// This makes it a Client Component so we can use useEffect
'use client'; 

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

// Define what a "Full Ticket" looks like coming from the API
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
      setLoading(false);
      return;
    }
const fetchTickets = async () => {
      try {
        const res = await fetch('http://localhost:3001/tickets/user/101');
        
        if (!res.ok) {
           throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        
        // Safety Check: Is it actually an array?
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          console.error("API did not return a list:", data);
          setTickets([]); // Set to empty list to prevent crash
        }

      } catch (error) {
        console.error('Failed to load tickets', error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [isLoaded,isSignedIn,user]);

  if (!isLoaded) return <div className="p-10 text-white">Loading...</div>;
  
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p className="text-gray-400">You need to be logged in to view your wallet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">My Wallet</h1>

      {loading ? (
        <p>Loading your receipts...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t bought any tickets yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t) => (
            <div key={t.id} className="bg-white text-black rounded-xl overflow-hidden shadow-lg relative">
              
              {/* Top Banner (Event Info) */}
              <div className="bg-blue-600 p-4 text-white">
                <h3 className="font-bold text-lg">{t.event.title}</h3>
                <p className="text-sm opacity-90">📍 {t.event.venue}</p>
              </div>

              {/* Ticket Body */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {t.ticketType.name}
                  </span>
                  <span className="font-bold text-xl">LKR {t.ticketType.price}</span>
                </div>

                <div className="border-t border-dashed border-gray-400 my-4"></div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ticket ID:</span>
                  <span className="font-mono font-bold">#{t.id.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Purchased:</span>
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Fake QR Code Strip */}
              <div className="bg-gray-100 p-3 flex justify-center border-t border-gray-200">
                 <div className="h-8 w-48 bg-gray-800 rounded opacity-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}