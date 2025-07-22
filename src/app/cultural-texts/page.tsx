// src/app/cultural-texts/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CulturalTextGrid } from '@/components/cultural-texts/CulturalTextGrid';
import { CulturalTextFilters } from '@/components/cultural-texts/CulturalTextFilters';
import { useCulturalTexts } from '@/hooks/use-airtable-data';
import { CulturalText } from '@/types';

export default function CulturalTextsPage() {
  const { data: culturalTexts = [], isLoading, error } = useCulturalTexts();
  const [filters, setFilters] = useState({
    genre: '',
    medium: '',
    country: '',
  });

  const handleFilterChange = (filterType: 'genre' | 'medium' | 'country', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredTexts = useMemo(() => {
    return culturalTexts.filter(text => {
      const genreMatch = filters.genre ? text.genres?.includes(filters.genre) : true;
      const mediumMatch = filters.medium ? text.medium === filters.medium : true;
      const countryMatch = filters.country ? text.country === filters.country : true;
      return genreMatch && mediumMatch && countryMatch;
    });
  }, [culturalTexts, filters]);

  const breadcrumbItems = [{ label: 'Cultural Texts', href: '/cultural-texts' }];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-heading text-af-charcoal mb-4">
            Explore Cultural Texts
          </h1>
          <p className="text-af-primary max-w-3xl mx-auto text-lg">
            Browse the collection of speculative fiction and media that form the foundation of the Autonomous Futures principles.
          </p>
        </div>

        {isLoading && <p className="text-center">Loading filters and texts...</p>}
        {error && <p className="text-center text-red-600">Error loading data.</p>}
        
        {!isLoading && !error && (
          <>
            <CulturalTextFilters 
              texts={culturalTexts}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            <CulturalTextGrid texts={filteredTexts} />
          </>
        )}
      </div>
    </main>
  );
}