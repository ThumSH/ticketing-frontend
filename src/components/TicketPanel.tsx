'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser, useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';


const socket = io('http://localhost:3001');

// 1. Define what a "Type" looks like
interface TicketType {
  id: number;
  name: string;
  price: number;
  totalSeats: number;
  seatsSold: number;
}

interface Props {
  eventId: number;
  initialTypes: TicketType[]; // We now accept a LIST of types
}

export default function TicketPanel({ eventId, initialTypes }: Props) {
  const {user , isLoaded, isSignedIn} = useUser();
  const { getToken } = useAuth();
  const [types, setTypes] = useState<TicketType[]>(initialTypes);
  const [loadingId, setLoadingId] = useState<number | null>(null); // Track which button is spinning
  const [message, setMessage] = useState('');

  // 2. Listen for Real-Time Updates 
  useEffect(() => {
    socket.on('seats-updated', (payload: { ticketTypeId: number; newSold: number }) => {
      // When an update comes, find the correct type and update its 'seatsSold'
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

  // 3. The Buy Logic (Now requires typeId)
  const buyTicket = async (typeId: number) => {

    if (!isLoaded || !isSignedIn) {
      toast.error("Please Sign In to buy tickets!");
      return;
    }

    setLoadingId(typeId);
    setMessage('');

    try {
      const token = await getToken();
      const res = await fetch('http://localhost:3001/orders', {
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
        toast.success("Ticket Purchased!", {
          description: "Check your wallet for the QR code.",
          duration: 4000,
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
    <div className="bg-gray-700 p-4 rounded-lg w-full max-w-md">
      {/* ... (Keep your UI code the same) ... */}
      
      {/* Update the Button to look disabled if not logged in */}
      {types.map((type) => {
        const available = type.totalSeats - type.seatsSold;
        const isSoldOut = available <= 0;
        
        return (
          <div key={type.id} className="flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-600 mb-2">
            <div>
              <p className="font-bold text-white">{type.name}</p>
              <p className="text-sm text-gray-400">LKR {type.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-sm font-mono ${isSoldOut ? 'text-red-500' : 'text-green-400'}`}>
                {isSoldOut ? 'SOLD OUT' : `${available} left`}
              </div>
              
              <button
                onClick={() => buyTicket(type.id)}
                disabled={isSoldOut || loadingId !== null}
                className={`px-3 py-1 rounded text-sm font-bold transition-all
                  ${!isSignedIn 
                    ? 'bg-gray-500 hover:bg-gray-600 text-gray-200' // Different style if logged out
                    : isSoldOut 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }
                `}
              >
                {!isSignedIn ? 'Sign In' : loadingId === type.id ? '...' : 'Buy'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}