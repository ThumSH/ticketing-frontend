'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Music, Ticket, Clapperboard, Trophy, Utensils, Zap } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Events', icon: Ticket },
  { id: 'music', label: 'Concerts', icon: Music },
  { id: 'sports', label: 'Sports', icon: Trophy },
  { id: 'theatre', label: 'Theatre', icon: Clapperboard },
  { id: 'dining', label: 'Dining', icon: Utensils },
  { id: 'deals', label: 'Hot Deals', icon: Zap },
];

export default function CategoryFilter() {
  const [active, setActive] = useState('all');

  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar">
      <div className="flex gap-3 min-w-max">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all border",
                isActive 
                  ? "bg-green-500 text-black border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-green-500/50 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}