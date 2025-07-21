// src/components/principles/PrinciplesAccordion.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { usePrinciples } from '@/hooks/useAirtable';
import { Principle } from '@/types';
import { ChevronDown } from 'lucide-react';
import { PrincipleCard } from './PrinciplesCard';

interface ThemeWithPrinciples extends Principle {
  subPrinciples: Principle[];
}

export function PrinciplesAccordion() {
  const { data: principles, isLoading, error } = usePrinciples();
  const [openThemeId, setOpenThemeId] = useState<string | null>(null);

  const themes = useMemo((): ThemeWithPrinciples[] => {
    if (!principles || !Array.isArray(principles)) {
      return [];
    }

    const overarchingThemes = principles.filter(p => p.isOverarching);
    const subPrinciples = principles.filter(p => !p.isOverarching);

    return overarchingThemes.map(theme => ({
      ...theme,
      subPrinciples: subPrinciples.filter(sp => sp.theme === (theme.title || theme.Title))
    })).sort((a,b) => (a.title || a.Title).localeCompare(b.title || b.Title)); // Sort themes alphabetically
  }, [principles]);

  const toggleTheme = (themeId: string) => {
    setOpenThemeId(openThemeId === themeId ? null : themeId);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full h-24 bg-af-placeholder-bg rounded-af-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading principles. Please try again later.</div>
  }

  return (
    <div className="space-y-4">
      {themes.map((theme) => (
        <div key={theme.id} id={theme.id} className="border border-af-warm-gray/20 rounded-af-lg overflow-hidden transition-all duration-300">
          {/* Theme Header */}
          <button
            onClick={() => toggleTheme(theme.id)}
            className="w-full p-6 text-left flex justify-between items-center bg-af-warm-white hover:bg-af-light-sage/50 transition-colors"
            aria-expanded={openThemeId === theme.id}
            aria-controls={`principles-${theme.id}`}
          >
            <div>
              <h2 className="text-xl font-semibold text-af-charcoal">{theme.title || theme.Title}</h2>
              <p className="text-sm text-af-primary mt-1">{theme.subPrinciples.length} principles</p>
            </div>
            <ChevronDown
              className={`transition-transform duration-300 ${openThemeId === theme.id ? 'rotate-180' : ''}`}
              size={24}
            />
          </button>

          {/* Expanded Content with Sub-Principles */}
          {openThemeId === theme.id && (
            <div id={`principles-${theme.id}`} className="bg-af-light-sage/30 p-6 animate-fade-in">
              <p className="text-af-primary mb-6">{theme.description || theme.Content}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {theme.subPrinciples.map((principle) => (
                  <PrincipleCard key={principle.id} principle={principle} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}