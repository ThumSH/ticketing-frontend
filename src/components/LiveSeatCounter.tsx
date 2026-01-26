  'use client';

  import { useEffect, useState } from 'react';
  import { io } from 'socket.io-client';

  // Connect to the Backend WebSocket
 const socket = io(process.env.NEXT_PUBLIC_API_URL);

  export default function LiveSeatCounter({ initialSeats }: { initialSeats: number }) {
    const [seats, setSeats] = useState(initialSeats);

    useEffect(() => {
      // Listen for the 'seats-updated' event from the server
      socket.on('seats-updated', (data) => {
        console.log('New seat count received:', data.availableSeats);
        setSeats(data.availableSeats);
      });

      // Cleanup when leaving the page
      return () => {
        socket.off('seats-updated');
      };
    }, []);

    return (
      <div className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-white transition-all duration-300 transform scale-100">
        {seats} Seats Left
      </div>
    );
  }