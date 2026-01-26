'use client'; // <--- This magic line allows interactivity (onClick)

import { useState } from 'react';

export default function PurchaseButton({ eventId }: { eventId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const buyTicket = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // 1. Send the "Order" to our NestJS Backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: eventId,
          userId: 101, // Hardcoded for now (Simulating a logged-in user)
        }),
      });

      const data = await res.json();
      
      // 2. Show the "Success" message from Redis
      if (res.ok) {
        setMessage('✅ ' + data.message);
      } else {
        setMessage('❌ Purchase Failed');
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage('❌ Server Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={buyTicket}
        disabled={isLoading}
        className={`mt-4 w-full py-2 px-4 rounded transition text-white font-bold
          ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
        `}
      >
        {isLoading ? 'Joining Queue...' : 'Buy Ticket'}
      </button>
      
      {message && <p className="mt-2 text-sm text-yellow-400 font-mono">{message}</p>}
    </div>
  );
}