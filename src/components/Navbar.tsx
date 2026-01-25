'use client';

import Link from 'next/link';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { Ticket, Music2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Shadcn Button

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-purple-600 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <Music2 className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            BeatPass
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {isSignedIn && (
            <Link href="/my-tickets">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 gap-2">
                <Ticket className="h-4 w-4" />
                My Wallet
              </Button>
            </Link>
          )}

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button className="bg-white text-black hover:bg-gray-200 font-bold">
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 ring-2 ring-purple-500/50"
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}