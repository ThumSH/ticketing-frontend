import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs' // <--- Import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketMaster Pro",
  description: "Live Ticketing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> {/* 1. Wrap everything with this */}
      <html lang="en">
        <body className={inter.className}>
          
          {/* OPTIONAL: A Simple Navbar to test Login */}
          <nav className="p-4 bg-gray-900 text-white flex justify-between items-center border-b border-gray-700">
            <div className="font-bold text-xl">TicketMaster</div>
            <div>
              {/* Show this if user is logged OUT */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 px-4 py-2 rounded">Sign In</button>
                </SignInButton>
              </SignedOut>

              {/* Show this if user is logged IN */}
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}