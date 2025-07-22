// src/components/homepage/HomepageHero.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePrinciples } from '@/hooks/use-airtable-data';
import { Principle } from '@/types';

interface ThemePreview {
  name: string;
  slug: string;
  description: string;
  principleCount: number;
  principles: Principle[];
  color: string;
}

interface HomepageHeroProps {
  className?: string;
}

const THEME_CONFIGS: Omit<ThemePreview, 'principles' | 'principleCount'>[] = [
  {
    name: 'Collective Power',
    slug: 'collective-power',
    description: 'Distributed decision-making and community governance',
    color: 'bg-gradient-to-br from-af-sage/20 to-af-sage/40'
  },
  {
    name: 'Inclusive Engagement',
    slug: 'inclusive-engagement', 
    description: 'Accessible design and participatory processes',
    color: 'bg-gradient-to-br from-af-golden/20 to-af-golden/40'
  },
  {
    name: 'Cultural Specificity',
    slug: 'cultural-specificity',
    description: 'Context-aware solutions rooted in community wisdom',
    color: 'bg-gradient-to-br from-af-warm-gray/20 to-af-warm-gray/40'
  }
];

const HomepageHero: React.FC<HomepageHeroProps> = ({ className = '' }) => {
  const { data: principles, isLoading, error } = usePrinciples();

  // Group principles by theme with safe array handling
  const themeData: ThemePreview[] = React.useMemo(() => {
    // Ensure principles is an array before processing
    if (!principles || !Array.isArray(principles)) {
      return THEME_CONFIGS.map(config => ({ ...config, principles: [], principleCount: 0 }));
    }

    return THEME_CONFIGS.map(config => {
      try {
        const themePrinciples = principles.filter(p => {
          // Safe access to principle properties
          if (!p || typeof p !== 'object') return false;
          
          const principleTheme = p.theme;
          if (!principleTheme || typeof principleTheme !== 'string') return false;
          
          return principleTheme.toLowerCase().replace(/\s+/g, '-') === config.slug;
        });
        
        return {
          ...config,
          principles: themePrinciples,
          principleCount: themePrinciples.length
        };
      } catch (err) {
        console.warn(`Error processing theme ${config.slug}:`, err);
        return {
          ...config,
          principles: [],
          principleCount: 0
        };
      }
    });
  }, [principles]);

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Elevator Pitch */}
          <div className="space-y-6">
            <h1 className="text-display text-af-charcoal leading-tight">
              Autonomous Futures
            </h1>
            
            <div className="space-y-4 text-af-primary">
              <p className="text-xl leading-relaxed">
                Centering marginalized voices in technology futures through 
                <span className="text-af-sage font-medium"> Afrofuturist</span>, 
                <span className="text-af-sage font-medium"> Indigenous</span>, and 
                diverse speculative fiction traditions.
              </p>
              
              <p className="text-lg">
                Explore design principles grounded in community wisdom, 
                cultural specificity, and collective power to build more 
                equitable technological futures.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href="/principles" 
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
              >
                Explore Principles
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Principle Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-heading text-af-charcoal mb-2">
                Three Core Themes
              </h2>
              <p className="text-af-primary">
                {isLoading ? 'Loading principles...' : 
                 error ? 'Principles coming soon' :
                 `${Array.isArray(principles) ? principles.length : 0} principles across 3 interconnected themes`}
              </p>
            </div>

            {/* Theme Preview Cards */}
            <div className="space-y-4">
              {themeData.map((theme, index) => (
                <ThemeCard 
                  key={theme.slug}
                  theme={theme}
                  index={index}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ThemeCardProps {
  theme: ThemePreview;
  index: number;
  isLoading: boolean;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, index, isLoading }) => {
  const principleCountText = isLoading 
    ? 'Loading...' 
    : theme.principleCount > 0 
      ? `${theme.principleCount} principle${theme.principleCount !== 1 ? 's' : ''}`
      : 'Principles coming soon';

  return (
    <Link href={`/principles#${theme.slug}`}>
      <div className={`
        group p-6 rounded-af-lg border border-af-warm-gray/20 
        hover:border-af-sage/40 transition-all duration-300
        hover:shadow-af-md hover:-translate-y-1
        ${theme.color}
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 150}ms` }}>
        
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-af-charcoal group-hover:text-af-sage transition-colors">
            {theme.name}
          </h3>
          <span className="text-af-primary text-sm font-medium">
            {principleCountText}
          </span>
        </div>
        
        <p className="text-af-primary text-sm leading-relaxed mb-4">
          {theme.description}
        </p>
        
        {/* Principle Preview (if loaded) */}
        {!isLoading && Array.isArray(theme.principles) && theme.principles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {theme.principles.slice(0, 3).map((principle) => (
              <span 
                key={principle?.id || Math.random()}
                className="text-xs px-2 py-1 bg-af-warm-white/60 rounded-af-sm text-af-charcoal"
              >
                {principle?.title || 'Untitled Principle'}
              </span>
            ))}
            {theme.principles.length > 3 && (
              <span className="text-xs px-2 py-1 text-af-primary">
                +{theme.principles.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-end mt-4 text-af-sage group-hover:translate-x-1 transition-transform">
          <span className="text-sm font-medium">Explore</span>
          <span className="ml-1">→</span>
        </div>
      </div>
    </Link>
  );
};

export default HomepageHero;