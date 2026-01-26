'use client';

import Link from 'next/link';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { Ticket, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-green-500 p-2 rounded-lg text-black group-hover:bg-green-400 transition-colors">
            <Music2 className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-green-500 transition-colors">
            BeatPass
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {isSignedIn && (
            <Link href="/my-tickets">
              <Button variant="ghost" className="text-zinc-400 hover:text-green-400 hover:bg-green-500/10 gap-2">
                <Ticket className="h-4 w-4" />
                My Wallet
              </Button>
            </Link>
          )}

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button className="bg-green-600 text-black hover:bg-green-500 font-bold px-6 rounded-full">
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-green-500/50"
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}