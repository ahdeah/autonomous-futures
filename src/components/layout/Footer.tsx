// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-af-charcoal text-af-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Statement */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-af-warm-white flex items-center gap-2">
              <Globe size={20} />
              Autonomous Futures
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              Centering marginalized voices in technology futures through diverse speculative fiction traditions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-af-warm-white">Explore</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/principles" className="text-sm hover:text-af-sage transition-colors">Principles</Link></li>
                <li><Link href="/cultural-texts" className="text-sm hover:text-af-sage transition-colors">Cultural Texts</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-af-warm-white">About</h4>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm hover:text-af-sage transition-colors">Our Mission</Link></li>
                {/* Add future links here e.g., Team, Contact */}
              </ul>
            </div>
            {/* Additional link columns can be added here */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-af-primary/20 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Autonomous Futures. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}