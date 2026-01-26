'use client';

import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Beat<span className="text-green-500">Pass</span>
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Sri Lanka&apos;s #1 Official Online Tickets Marketplace. 
              Experience the joy of live entertainment with zero hassle.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="bg-zinc-900 p-2 rounded-full text-zinc-400 hover:bg-green-500 hover:text-black transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Discover</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {['Concerts', 'Movies', 'Sports', 'Theatre', 'Deals'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              {['Contact Us', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                <span>No. 123, Lotus Tower Road,<br/>Colombo 01, Sri Lanka.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                <span>support@beatpass.lk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© 2026 BeatPass Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}