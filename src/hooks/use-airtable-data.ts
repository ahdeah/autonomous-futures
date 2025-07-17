import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

export function useCulturalText(id: string) {
  return useQuery({
    queryKey: queryKeys.culturalTexts.detail(id),
    queryFn: async () => {
      // This would need its own API route for individual items
      // For now, we'll skip this implementation
      return null;
    },
    enabled: false, // Disable for now
    staleTime: 10 * 60 * 1000,
  });
}

export function useSearchCulturalTexts(
  query: string, 
  filters?: {
    genre?: string;
    medium?: string;
    country?: string;
  }
) {
  return useQuery({
    queryKey: queryKeys.culturalTexts.search(query, filters),
    queryFn: async () => {
      // This would need its own search API route
      // For now, we'll skip this implementation
      return [];
    },
    enabled: false, // Disable for now
    staleTime: 2 * 60 * 1000,
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

export function usePrinciple(id: string) {
  return useQuery({
    queryKey: queryKeys.principles.detail(id),
    queryFn: async () => {
      // This would need its own API route for individual items
      return null;
    },
    enabled: false, // Disable for now
    staleTime: 10 * 60 * 1000,
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

// Simplified hooks for the remaining functions (disabled for now)
export function useDesignRecommendations(principleId?: string) {
  return useQuery({
    queryKey: queryKeys.designRecommendations.list(principleId),
    queryFn: async () => [],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: queryKeys.profiles.list(),
    queryFn: async () => [],
    enabled: false,
    staleTime: 15 * 60 * 1000,
  });
}

export function useTechnologyTaxonomy() {
  return useQuery({
    queryKey: queryKeys.technology.list(),
    queryFn: async () => [],
    enabled: false,
    staleTime: 15 * 60 * 1000,
  });
}

// Connection hooks (disabled for now)
export function useCulturalTextsForPrinciple(principleId: string) {
  return useQuery({
    queryKey: queryKeys.connections.culturalTextsForPrinciple(principleId),
    queryFn: async () => [],
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrinciplesForCulturalText(textId: string) {
  return useQuery({
    queryKey: queryKeys.connections.principlesForCulturalText(textId),
    queryFn: async () => [],
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDesignRecommendationsForPrinciple(principleId: string) {
  return useQuery({
    queryKey: queryKeys.connections.designRecommendationsForPrinciple(principleId),
    queryFn: async () => [],
    enabled: false,
    staleTime: 10 * 60 * 1000,
  });
}

// Utility hook for getting aggregated data for a principle page
export function usePrinciplePageData(principleId: string) {
  const principleQuery = usePrinciple(principleId);
  const culturalTextsQuery = useCulturalTextsForPrinciple(principleId);
  const designRecommendationsQuery = useDesignRecommendationsForPrinciple(principleId);
  
  return {
    principle: principleQuery.data,
    culturalTexts: culturalTextsQuery.data || [],
    designRecommendations: designRecommendationsQuery.data || [],
    isLoading: principleQuery.isLoading || culturalTextsQuery.isLoading || designRecommendationsQuery.isLoading,
    error: principleQuery.error || culturalTextsQuery.error || designRecommendationsQuery.error,
    isError: principleQuery.isError || culturalTextsQuery.isError || designRecommendationsQuery.isError,
  };
}

// Utility hook for homepage data
export function useHomepageData() {
  const principlesQuery = useOverarchingPrinciples();
  const culturalTextsQuery = useCulturalTexts({ maxRecords: 6 }); // Featured texts
  
  return {
    overarchingPrinciples: principlesQuery.data || [],
    featuredCulturalTexts: culturalTextsQuery.data || [],
    isLoading: principlesQuery.isLoading || culturalTextsQuery.isLoading,
    error: principlesQuery.error || culturalTextsQuery.error,
    isError: principlesQuery.isError || culturalTextsQuery.isError,
  };
}

// Error boundary hook
export function useDataErrorHandler() {
  return {
    handleError: (error: unknown) => {
      const errorMessage = handleQueryError(error);
      console.error('Data fetching error:', errorMessage, error);
      return errorMessage;
    },
  };
}