// src/hooks/useAirtable.ts
'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CulturalText, Principle, DesignRecommendation, Profile, TechnologyTaxonomy } from '@/types';

// Use internal API routes instead of direct Airtable calls (secure approach)
async function fetchFromAPI<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data.data || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Individual table hooks using secure API routes
export function useCulturalTexts() {
  return useQuery({
    queryKey: ['cultural-texts'],
    queryFn: () => fetchFromAPI<CulturalText>('cultural-texts'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
}

export function usePrinciples() {
  return useQuery({
    queryKey: ['principles'],
    queryFn: () => fetchFromAPI<Principle>('principles'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useDesignRecommendations() {
  return useQuery({
    queryKey: ['design-recommendations'],
    queryFn: () => fetchFromAPI<DesignRecommendation>('design-recommendations'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: () => fetchFromAPI<Profile>('profiles'),
    staleTime: 10 * 60 * 1000, // 10 minutes (profiles change less frequently)
    retry: 2,
    retryDelay: 1000,
  });
}

export function useTechnologyTaxonomy() {
  return useQuery({
    queryKey: ['technology-taxonomy'],
    queryFn: () => fetchFromAPI<TechnologyTaxonomy>('technology-taxonomy'),
    staleTime: 15 * 60 * 1000, // 15 minutes (taxonomy is relatively stable)
    retry: 2,
    retryDelay: 1000,
  });
}

// Combined data hook for complex operations
export function useAllData() {
  const culturalTexts = useCulturalTexts();
  const principles = usePrinciples();
  const designRecommendations = useDesignRecommendations();
  const profiles = useProfiles();
  const technology = useTechnologyTaxonomy();

  return {
    culturalTexts,
    principles,
    designRecommendations,
    profiles,
    technology,
    isLoading: culturalTexts.isLoading || principles.isLoading || designRecommendations.isLoading || profiles.isLoading || technology.isLoading,
    hasError: culturalTexts.error || principles.error || designRecommendations.error || profiles.error || technology.error,
  };
}

// Utility hooks for specific data relationships
export function usePrinciplesByTheme() {
  const { data: principles, ...query } = usePrinciples();
  
  const principlesByTheme = React.useMemo(() => {
    if (!principles) return {};
    
    return principles.reduce((acc, principle) => {
      const theme = principle.theme || 'Uncategorized';
      if (!acc[theme]) acc[theme] = [];
      acc[theme].push(principle);
      return acc;
    }, {} as Record<string, Principle[]>);
  }, [principles]);

  return {
    ...query,
    data: principlesByTheme,
  };
}

// Search and filter utilities
export function useSearchResults(query: string, filters: any = {}) {
  const allData = useAllData();
  
  return useQuery({
    queryKey: ['search', query, filters],
    queryFn: async () => {
      // This will be implemented when we build the search system
      return [];
    },
    enabled: query.length > 2, // Only search when query is meaningful
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}