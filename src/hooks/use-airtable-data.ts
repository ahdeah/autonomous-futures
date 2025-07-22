import { useQuery } from '@tanstack/react-query';
import { queryKeys, handleQueryError } from '@/lib/react-query';
import type { 
  CulturalText, 
  Principle, 
  DesignRecommendation, 
  Profile, 
  TechnologyTaxonomy 
} from '@/types';

// API response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  count?: number;
}

// API client functions
const api = {
  async getCulturalTexts(filters?: {
    genre?: string;
    medium?: string;
    country?: string;
    maxRecords?: number;
  }): Promise<CulturalText[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`/api/cultural-texts?${params}`);
    const result: ApiResponse<CulturalText[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch cultural texts');
    }
    
    return result.data;
  },

  async getPrinciples(): Promise<Principle[]> {
    const response = await fetch('/api/principles');
    const result: ApiResponse<Principle[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch principles');
    }
    
    return result.data;
  },

  async search(query: string): Promise<(CulturalText | Principle | DesignRecommendation)[]> {
    if (!query) return [];
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const result: ApiResponse<(CulturalText | Principle | DesignRecommendation)[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to perform search');
    }
    
    return result.data;
  }
};

// Cultural Texts hooks
export function useCulturalTexts(filters?: {
  genre?: string;
  medium?: string;
  country?: string;
  maxRecords?: number;
}) {
  return useQuery({
    queryKey: queryKeys.culturalTexts.list(filters),
    queryFn: () => api.getCulturalTexts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Principles hooks
export function usePrinciples() {
  return useQuery({
    queryKey: queryKeys.principles.list(),
    queryFn: () => api.getPrinciples(),
    staleTime: 10 * 60 * 1000, // 10 minutes - principles change infrequently
  });
}

// SEARCH HOOK
export function useSearch(query: string) {
    return useQuery({
      queryKey: ['search', query],
      queryFn: () => api.search(query),
      enabled: !!query && query.length > 2,
      staleTime: 5 * 60 * 1000,
    });
}


// Get only the overarching principles (main themes)
export function useOverarchingPrinciples() {
  const { data: allPrinciples, ...rest } = usePrinciples();
  
  const overarchingPrinciples = allPrinciples?.filter(principle => principle.isOverarching) || [];
  
  return {
    data: overarchingPrinciples,
    ...rest,
  };
}
// NOTE: The following hooks are not yet implemented with API routes.
// They are kept here as placeholders for future development.

export function useDesignRecommendations(principleId?: string) {
  return useQuery({
    queryKey: queryKeys.designRecommendations.list(principleId),
    queryFn: async () => [],
    enabled: false,
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: queryKeys.profiles.list(),
    queryFn: async () => [],
    enabled: false,
  });
}

export function useTechnologyTaxonomy() {
  return useQuery({
    queryKey: queryKeys.technology.list(),
    queryFn: async () => [],
    enabled: false,
  });
}