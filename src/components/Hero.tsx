'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="tk.png" 
          alt="Concert Crowd" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="border-green-500/50 text-green-400 px-6 py-2 text-sm uppercase tracking-widest bg-black/50 backdrop-blur-md mb-6">
            <Sparkles className="w-3 h-3 mr-2 text-green-400" />
            Live The Moment
          </Badge>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none"
        >
          UNLEASH THE <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            RHYTHM
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light"
        >
          Your gateway to the world&apos;s most electrifying musical experiences. 
          Secure, instant, and unforgettable.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <Button className="h-12 px-8 bg-green-600 hover:bg-green-500 text-black font-bold text-lg rounded-full">
            Explore Events <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-lg rounded-full backdrop-blur-sm">
            <PlayCircle className="mr-2 w-5 h-5" /> How it Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
}