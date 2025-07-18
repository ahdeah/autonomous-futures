// src/hooks/useAirtable.ts
'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CulturalText, Principle, DesignRecommendation, Profile, TechnologyTaxonomy } from '@/types';

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

// Generic Airtable fetch function
async function fetchAirtableTable<T>(tableName: string): Promise<T[]> {
  if (!BASE_ID || !API_TOKEN) {
    console.warn('Airtable credentials not configured');
    return [];
  }

  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/${BASE_ID}/${tableName}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    return data.records.map((record: any) => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
}

// Individual table hooks
export function useCulturalTexts() {
  return useQuery({
    queryKey: ['cultural-texts'],
    queryFn: () => fetchAirtableTable<CulturalText>('Cultural Texts'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
}

export function usePrinciples() {
  return useQuery({
    queryKey: ['principles'],
    queryFn: () => fetchAirtableTable<Principle>('Principles'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useDesignRecommendations() {
  return useQuery({
    queryKey: ['design-recommendations'],
    queryFn: () => fetchAirtableTable<DesignRecommendation>('Design Recommendations'),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 1000,
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: () => fetchAirtableTable<Profile>('Profiles'),
    staleTime: 10 * 60 * 1000, // 10 minutes (profiles change less frequently)
    retry: 2,
    retryDelay: 1000,
  });
}

export function useTechnologyTaxonomy() {
  return useQuery({
    queryKey: ['technology-taxonomy'],
    queryFn: () => fetchAirtableTable<TechnologyTaxonomy>('Technology Taxonomy'),
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