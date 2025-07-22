// src/components/cultural-texts/CulturalTextFilters.tsx
'use client';

import { useMemo } from 'react';
import { CulturalText } from '@/types';

interface CulturalTextFiltersProps {
  texts: CulturalText[];
  filters: {
    genre: string;
    medium: string;
    country: string;
  };
  onFilterChange: (filterType: 'genre' | 'medium' | 'country', value: string) => void;
}

export function CulturalTextFilters({ texts, filters, onFilterChange }: CulturalTextFiltersProps) {
  const options = useMemo(() => {
    const genres = new Set<string>();
    const mediums = new Set<string>();
    const countries = new Set<string>();

    texts.forEach(text => {
      if (text.genres && Array.isArray(text.genres)) {
        text.genres.forEach(g => {
          if (g) genres.add(g);
        });
      }
      
      if (text.medium) mediums.add(text.medium);
      if (text.country) countries.add(text.country);
    });

    return {
      genres: Array.from(genres).sort(),
      mediums: Array.from(mediums).sort(),
      countries: Array.from(countries).sort(),
    };
  }, [texts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Genre Filter */}
      <div>
        <label htmlFor="genre-filter" className="block text-sm font-medium text-af-primary mb-1">
          Genre
        </label>
        <select
          id="genre-filter"
          value={filters.genre}
          onChange={(e) => onFilterChange('genre', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-af-md bg-af-warm-white focus:ring-af-sage focus:border-af-sage"
        >
          <option value="">All Genres</option>
          {options.genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Medium Filter */}
      <div>
        <label htmlFor="medium-filter" className="block text-sm font-medium text-af-primary mb-1">
          Medium
        </label>
        <select
          id="medium-filter"
          value={filters.medium}
          onChange={(e) => onFilterChange('medium', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-af-md bg-af-warm-white focus:ring-af-sage focus:border-af-sage"
        >
          <option value="">All Mediums</option>
          {options.mediums.map(medium => (
            <option key={medium} value={medium}>{medium}</option>
          ))}
        </select>
      </div>

      {/* Country Filter */}
      <div>
        <label htmlFor="country-filter" className="block text-sm font-medium text-af-primary mb-1">
          Country
        </label>
        <select
          id="country-filter"
          value={filters.country}
          onChange={(e) => onFilterChange('country', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-af-md bg-af-warm-white focus:ring-af-sage focus:border-af-sage"
        >
          <option value="">All Countries</option>
          {options.countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
    </div>
  );
}