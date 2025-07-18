// src/components/homepage/ProgressiveDisclosure.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePrinciples } from '@/hooks/useAirtable';
import { Principle } from '@/types';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

interface ThemeData {
  name: string;
  slug: string;
  description: string;
  principles: Principle[];
  color: string;
  accentColor: string;
}

interface ProgressiveDisclosureProps {
  className?: string;
}

const THEME_CONFIGS = [
  {
    name: 'Collective Power',
    slug: 'collective-power',
    description: 'Distributed decision-making and community governance that centers marginalized voices in shaping technology futures.',
    color: 'bg-gradient-to-br from-af-sage/10 to-af-sage/20',
    accentColor: 'af-sage'
  },
  {
    name: 'Inclusive Engagement', 
    slug: 'inclusive-engagement',
    description: 'Accessible design processes and participatory methods that welcome diverse perspectives and ways of knowing.',
    color: 'bg-gradient-to-br from-af-golden/10 to-af-golden/20',
    accentColor: 'af-golden'
  },
  {
    name: 'Cultural Specificity',
    slug: 'cultural-specificity', 
    description: 'Context-aware solutions rooted in community wisdom, traditions, and culturally-grounded approaches to technology.',
    color: 'bg-gradient-to-br from-af-warm-gray/10 to-af-warm-gray/20',
    accentColor: 'af-warm-gray'
  }
];

const ProgressiveDisclosure: React.FC<ProgressiveDisclosureProps> = ({ className = '' }) => {
  const { data: principles, isLoading, error } = usePrinciples();
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  // Group principles by theme with safe array handling
  const themeData: ThemeData[] = React.useMemo(() => {
    // Ensure principles is an array before processing
    if (!principles || !Array.isArray(principles)) {
      return THEME_CONFIGS.map(config => ({ ...config, principles: [] }));
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
          principles: themePrinciples
        };
      } catch (err) {
        console.warn(`Error processing theme ${config.slug}:`, err);
        return {
          ...config,
          principles: []
        };
      }
    });
  }, [principles]);

  const toggleTheme = (slug: string) => {
    setExpandedTheme(expandedTheme === slug ? null : slug);
  };

  if (error) {
    return (
      <section className={`py-16 bg-af-warm-white/30 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading text-af-charcoal mb-4">
            Explore Autonomous Futures Principles
          </h2>
          <p className="text-af-primary max-w-2xl mx-auto mb-8">
            Principles are loading. Please check back soon to explore how speculative fiction 
            from marginalized communities informs equitable technology design.
          </p>
          <Link href="/principles" className="btn-primary">
            View Principles Page
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-af-warm-white/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-heading text-af-charcoal mb-4">
            Explore Autonomous Futures Principles
          </h2>
          <p className="text-af-primary max-w-2xl mx-auto">
            Discover how speculative fiction from marginalized communities 
            informs equitable technology design through interconnected principles.
          </p>
          {!isLoading && Array.isArray(principles) && principles.length > 0 && (
            <p className="text-af-sage font-medium mt-2">
              {principles.length} principles across 3 interconnected themes
            </p>
          )}
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themeData.map((theme, index) => (
            <ThemeDisclosureCard
              key={theme.slug}
              theme={theme}
              index={index}
              isLoading={isLoading}
              isExpanded={expandedTheme === theme.slug}
              onToggle={() => toggleTheme(theme.slug)}
            />
          ))}
        </div>

        {/* Call to Action */}
        {!isLoading && Array.isArray(principles) && principles.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              href="/principles"
              className="btn-accent inline-flex items-center gap-2"
            >
              View All Principles
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

interface ThemeDisclosureCardProps {
  theme: ThemeData;
  index: number;
  isLoading: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

const ThemeDisclosureCard: React.FC<ThemeDisclosureCardProps> = ({
  theme,
  index,
  isLoading,
  isExpanded,
  onToggle
}) => {
  const principleCount = Array.isArray(theme.principles) ? theme.principles.length : 0;
  const hasData = !isLoading && principleCount > 0;

  return (
    <div
      className={`
        ${theme.color}
        rounded-af-lg border border-af-warm-gray/20 
        hover:border-af-sage/30 transition-all duration-300
        hover:shadow-af-md
        animate-fade-in
        ${isExpanded ? 'ring-2 ring-af-sage/20' : ''}
      `}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-af-charcoal">
            {theme.name}
          </h3>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-af-primary text-sm font-medium block">
                {isLoading ? 'Loading...' : 
                 hasData ? `${principleCount} principle${principleCount !== 1 ? 's' : ''}` :
                 'Coming soon'}
              </span>
            </div>
            {hasData && (
              <button
                onClick={onToggle}
                className={`
                  p-2 rounded-af-sm border transition-all duration-200
                  ${isExpanded 
                    ? 'bg-af-sage text-af-warm-white border-af-sage shadow-sm' 
                    : 'bg-af-warm-white text-af-sage border-af-sage/30 hover:border-af-sage hover:bg-af-sage/5'
                  }
                `}
                aria-label={isExpanded ? 'Collapse principles' : 'Expand principles'}
              >
                {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            )}
          </div>
        </div>

        <p className="text-af-primary text-sm leading-relaxed mb-4">
          {theme.description}
        </p>

        {/* Principle Preview (collapsed state) */}
        {hasData && !isExpanded && (
          <div className="flex flex-wrap gap-2 mb-4">
            {theme.principles.slice(0, 2).map((principle) => (
              <span 
                key={principle?.id || Math.random()}
                className="text-xs px-3 py-1 bg-af-warm-white/60 rounded-af-sm text-af-charcoal"
              >
                {principle?.title || 'Untitled Principle'}
              </span>
            ))}
            {principleCount > 2 && (
              <span className="text-xs px-3 py-1 text-af-primary font-medium">
                +{principleCount - 2} more
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link 
          href={`/principles#${theme.slug}`}
          className="btn-outline text-sm w-full justify-center"
        >
          Explore {theme.name}
        </Link>

        {/* Expand/Collapse Instructions */}
        {hasData && (
          <div className="mt-3 text-center">
            <button
              onClick={onToggle}
              className="text-xs text-af-sage hover:text-af-charcoal transition-colors inline-flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Hide principles
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show {principleCount} principle{principleCount !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Expanded Principles List */}
      {isExpanded && hasData && (
        <div className="border-t border-af-warm-gray/20 bg-af-warm-white/40 animate-fade-in">
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-af-charcoal mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-af-sage rounded-full"></span>
              Principles in this theme:
            </h4>
            {theme.principles.map((principle, idx) => (
              <div
                key={principle?.id || idx}
                className="animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <PrinciplePreview principle={principle} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface PrinciplePreviewProps {
  principle: Principle;
}

const PrinciplePreview: React.FC<PrinciplePreviewProps> = ({ principle }) => {
  // Safe access to principle properties
  const title = principle?.title || 'Untitled Principle';
  const description = principle?.description || 'Principle description coming soon.';
  const truncatedDescription = description.length > 120 
    ? description.slice(0, 120) + '...' 
    : description;

  const culturalTextsLength = Array.isArray(principle?.culturalTexts) 
    ? principle.culturalTexts.length 
    : 0;

  return (
    <Link href={`/principles/${principle?.id || '#'}`}>
      <div className="group p-4 bg-af-warm-white rounded-af-sm hover:bg-af-background transition-colors border border-transparent hover:border-af-sage/20 hover:shadow-sm">
        <h5 className="font-medium text-af-charcoal group-hover:text-af-sage transition-colors mb-2">
          {title}
        </h5>
        <p className="text-sm text-af-primary leading-relaxed">
          {truncatedDescription}
        </p>
        
        {/* Connection indicators */}
        {culturalTextsLength > 0 && (
          <div className="mt-3">
            <span className="text-xs text-af-sage">
              → Inspired by {culturalTextsLength} cultural text{culturalTextsLength !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProgressiveDisclosure;