/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient } from '@tanstack/react-query';

// React Query configuration optimized for Airtable API
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Airtable data doesn't change frequently, so longer stale times are appropriate
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      
      // Retry configuration for network resilience
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        // Retry up to 3 times for network/server errors
        return failureCount < 3;
      },
      
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,
      
      // Refetch on mount only if data is stale
      refetchOnMount: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query key factory for consistent cache keys
export const queryKeys = {
  // Cultural Texts
  culturalTexts: {
    all: ['cultural-texts'] as const,
    lists: () => [...queryKeys.culturalTexts.all, 'list'] as const,
    list: (filters?: Record<string, any>) => 
      [...queryKeys.culturalTexts.lists(), { filters }] as const,
    details: () => [...queryKeys.culturalTexts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.culturalTexts.details(), id] as const,
    search: (query: string, filters?: Record<string, any>) => 
      [...queryKeys.culturalTexts.all, 'search', { query, filters }] as const,
  },
  
  // Principles
  principles: {
    all: ['principles'] as const,
    lists: () => [...queryKeys.principles.all, 'list'] as const,
    list: () => [...queryKeys.principles.lists()] as const,
    details: () => [...queryKeys.principles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.principles.details(), id] as const,
    overarching: () => [...queryKeys.principles.all, 'overarching'] as const,
  },
  
  // Design Recommendations
  designRecommendations: {
    all: ['design-recommendations'] as const,
    lists: () => [...queryKeys.designRecommendations.all, 'list'] as const,
    list: (principleId?: string) => 
      [...queryKeys.designRecommendations.lists(), { principleId }] as const,
    details: () => [...queryKeys.designRecommendations.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.designRecommendations.details(), id] as const,
  },
  
  // Profiles
  profiles: {
    all: ['profiles'] as const,
    lists: () => [...queryKeys.profiles.all, 'list'] as const,
    list: () => [...queryKeys.profiles.lists()] as const,
    details: () => [...queryKeys.profiles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.profiles.details(), id] as const,
  },
  
  // Technology Taxonomy
  technology: {
    all: ['technology'] as const,
    lists: () => [...queryKeys.technology.all, 'list'] as const,
    list: () => [...queryKeys.technology.lists()] as const,
  },
  
  // Connections
  connections: {
    all: ['connections'] as const,
    culturalTextsForPrinciple: (principleId: string) => 
      [...queryKeys.connections.all, 'cultural-texts-for-principle', principleId] as const,
    principlesForCulturalText: (textId: string) => 
      [...queryKeys.connections.all, 'principles-for-cultural-text', textId] as const,
    designRecommendationsForPrinciple: (principleId: string) => 
      [...queryKeys.connections.all, 'design-recommendations-for-principle', principleId] as const,
  },
} as const;

// Error handling utilities
export const handleQueryError = (error: unknown): string => {
  if (error instanceof Error) {
    // Handle specific Airtable errors
    if (error.message.includes('AUTHENTICATION_REQUIRED')) {
      return 'Authentication failed. Please check your API token.';
    }
    if (error.message.includes('NOT_FOUND')) {
      return 'The requested data was not found.';
    }
    if (error.message.includes('REQUEST_TOO_LARGE')) {
      return 'Request too large. Please try with fewer filters.';
    }
    if (error.message.includes('RATE_LIMITED')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred.';
};

// Loading state utilities
export const createLoadingState = (isLoading: boolean, error?: unknown) => ({
  isLoading,
  error: error ? handleQueryError(error) : undefined,
});

export default queryClient;