'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser, useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const socket = io(process.env.NEXT_PUBLIC_API_URL);

interface TicketType {
  id: number;
  name: string;
  price: number;
  totalSeats: number;
  seatsSold: number;
}

interface Props {
  eventId: number;
  initialTypes: TicketType[];
}

export default function TicketPanel({ eventId, initialTypes }: Props) {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [types, setTypes] = useState<TicketType[]>(initialTypes);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    socket.on('seats-updated', (payload: { ticketTypeId: number; newSold: number }) => {
      setTypes((currentTypes) => 
        currentTypes.map((t) => 
          t.id === payload.ticketTypeId ? { ...t, seatsSold: payload.newSold } : t
        )
      );
    });

    return () => {
      socket.off('seats-updated');
    };
  }, []);

  const buyTicket = async (typeId: number) => {
    if (!isLoaded || !isSignedIn) {
      toast.error("Please Sign In to purchase");
      return;
    }

    setLoadingId(typeId);

    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          eventId, 
          ticketTypeId: typeId, 
        }),
      });

      if (res.ok) {
        toast.success("Success!", {
          description: "Ticket added to your wallet.",
        });
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to buy ticket");
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection Error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {types.map((type) => {
        const available = type.totalSeats - type.seatsSold;
        const isSoldOut = available <= 0;
        
        return (
          <div 
            key={type.id} 
            className={`
              relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200
              ${isSoldOut 
                ? 'bg-zinc-900/50 border-zinc-800 opacity-60' 
                : 'bg-zinc-900 border-zinc-800 hover:border-green-500/30'
              }
            `}
          >
            {/* Ticket Info */}
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-wide">{type.name}</span>
              <span className="text-sm text-zinc-400 font-mono">LKR {type.price.toLocaleString()}</span>
            </div>

            {/* Action Area */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className={`text-xs font-bold uppercase ${isSoldOut ? 'text-red-500' : 'text-green-500'}`}>
                   {isSoldOut ? 'Sold Out' : `${available} Available`}
                 </p>
              </div>
              
              <button
                onClick={() => buyTicket(type.id)}
                disabled={isSoldOut || loadingId !== null}
                className={`
                  min-w-[100px] h-9 rounded-lg text-sm font-bold transition-all flex items-center justify-center
                  ${!isSignedIn 
                    ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' 
                    : isSoldOut 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-green-400 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {loadingId === type.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : !isSignedIn ? (
                  'Sign In'
                ) : isSoldOut ? (
                  'Full'
                ) : (
                  'Buy'
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}