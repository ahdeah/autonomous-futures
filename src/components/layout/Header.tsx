// src/components/layout/Header.tsx
import Link from 'next/link';
import { GlobalSearch } from '@/components/search/GlobalSearch';

export function Header() {
  return (
    <header className="bg-af-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-af-warm-gray/20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-af-charcoal hover:text-af-sage transition-colors">
              Autonomous Futures
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex md:space-x-8">
            <Link 
              href="/principles" 
              className="font-medium text-af-primary hover:text-af-charcoal transition-colors"
            >
              Principles
            </Link>
            <Link 
              href="/cultural-texts" 
              className="font-medium text-af-primary hover:text-af-charcoal transition-colors"
            >
              Cultural Texts
            </Link>
             <Link 
              href="/about" 
              className="font-medium text-af-primary hover:text-af-charcoal transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center">
             <GlobalSearch />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;