// src/lib/data-transforms.ts
import type { CulturalText, Principle } from '@/types';

/**
 * Transform Airtable Cultural Text records to match both CSV field names and component expectations
 * Based on actual CSV structure: Title, By, Country, Year, Medium, Genres, Image, Links, etc.
 */
export function transformCulturalText(record: any): CulturalText {
  const transformed = {
    // Map CSV fields to interface
    id: record.id,
    
    // Original Airtable field names (from CSV)
    Title: record.Title || record.title || '',
    By: record.By || record.by || record.author,
    "By (Web)": record["By (Web)"] || record.byWeb,
    Content: record.Content || record.content || record.description,
    Country: record.Country || record.country,
    "Text Location": record["Text Location"] || record.textLocation,
    Year: record.Year || record.year,
    "Text Year": record["Text Year"] || record.textYear,
    "Exact Date": record["Exact Date"] || record.exactDate,
    Medium: record.Medium || record.medium,
    Genres: record.Genres || record.genres || record.genre, // CSV uses 'Genres' (plural)
    "Genres (Web)": record["Genres (Web)"] || record.genresWeb,
    Image: record.Image || record.image,
    "Related Records": record["Related Records"] || record.relatedRecords,
    Links: record.Links || record.links,
    Principles: record.Principles || record.principles,
    "Principles (Web)": record["Principles (Web)"] || record.principlesWeb,
    "Design Recommendations": record["Design Recommendations"] || record.designRecommendations,
    "Design Recommendations (Web)": record["Design Recommendations (Web)"] || record.designRecommendationsWeb,
    Technology: record.Technology || record.technology,
    Tags: record.Tags || record.tags,
    
    // Normalized property names for component compatibility
    title: record.Title || record.title || '',
    author: record.By || record.by || record.author,
    country: record.Country || record.country,
    year: record.Year || record.year,
    medium: record.Medium || record.medium,
    genre: record.Genres || record.genres || record.genre, // Map Genres → genre
    image: record.Image || record.image,
    links: record.Links || record.links,
    description: record.Content || record.content || record.description,
    
    // Parse relation fields from strings to arrays
    principles: parseRelationField(record.Principles || record.principles),
    designRecommendations: parseRelationField(record["Design Recommendations"] || record.designRecommendations),
    technology: parseRelationField(record.Technology || record.technology),
  } as CulturalText;

  return transformed;
}

/**
 * Transform Airtable Principle records to match CSV structure and component expectations
 * Based on actual CSV structure: Title, IsOverarching, Theme, Content, etc.
 */
export function transformPrinciple(record: any): Principle {
  // Handle IsOverarching field - CSV uses "IsOverarching" with "Yes"/"No" values
  const isOverarchingValue = record.IsOverarching || record.isOverarching || record.OVERARCHING;
  const isOverarching = isOverarchingValue === "Yes" || 
                       isOverarchingValue === true || 
                       isOverarchingValue === "TRUE" ||
                       isOverarchingValue === "true";

  const transformed = {
    // Map CSV fields to interface
    id: record.id,
    
    // Original Airtable field names (from CSV)
    Title: record.Title || record.title || '',
    IsOverarching: record.IsOverarching || record.isOverarching,
    Theme: record.Theme || record.theme, // CSV uses 'Theme' (capital T)
    Content: record.Content || record.content || '',
    Profiles: record.Profiles || record.profiles,
    "Cultural Texts": record["Cultural Texts"] || record.culturalTexts,
    "Design Recommendations": record["Design Recommendations"] || record.designRecommendations,
    "Design Recommendations (Web)": record["Design Recommendations (Web)"] || record.designRecommendationsWeb,
    
    // Normalized property names for component compatibility
    title: record.Title || record.title || '',
    isOverarching: isOverarching,
    theme: record.Theme || record.theme, // Map Theme → theme for component filtering
    description: record.Content || record.content || '',
    
    // Parse relation fields from strings to arrays
    profiles: parseRelationField(record.Profiles || record.profiles),
    culturalTexts: parseRelationField(record["Cultural Texts"] || record.culturalTexts),
    designRecommendations: parseRelationField(record["Design Recommendations"] || record.designRecommendations),
  } as Principle;

  return transformed;
}

/**
 * Parse comma-separated strings into arrays for relation fields
 */
export function parseRelationField(field: string | string[] | undefined): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    // Split by comma and clean up whitespace
    return field.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
}

/**
 * Apply fallback data for missing fields to ensure graceful degradation
 */
export function applyDataFallbacks(item: CulturalText): CulturalText {
  return {
    ...item,
    author: item.author || item.By || 'Various',
    country: item.country || item.Country || 'Various',
    year: item.year || item.Year || undefined,
    medium: item.medium || item.Medium || 'Mixed Media',
    genre: item.genre || item.Genres || 'Speculative Fiction',
    description: item.description || item.Content || 'Description coming soon.',
    links: item.links || item.Links || undefined,
    image: item.image || item.Image || undefined,
    
    // Parse relation fields from strings to arrays
    principles: parseRelationField(item.Principles || item.principles),
    designRecommendations: parseRelationField(item["Design Recommendations"] || item.designRecommendations),
    technology: parseRelationField(item.Technology || item.technology),
  };
}

/**
 * Normalize theme names for consistent filtering
 * Maps theme names to slugs used in Progressive Disclosure
 */
export function normalizeThemeForFiltering(theme: string): string {
  if (!theme || typeof theme !== 'string') return '';
  
  const normalized = theme.toLowerCase().trim();
  
  // Map known theme variations to consistent slugs
  if (normalized.includes('collective') && normalized.includes('power')) {
    return 'collective-power';
  }
  if (normalized.includes('inclusive') && normalized.includes('engagement')) {
    return 'inclusive-engagement';
  }
  if (normalized.includes('cultural') && normalized.includes('specificity')) {
    return 'cultural-specificity';
  }
  
  // Return as slug format for unknown themes
  return normalized.replace(/\s+/g, '-');
}

/**
 * Debug helper to log data transformation for troubleshooting
 */
export function debugPrincipleTransform(principle: any) {
  console.log('🔍 Principle Transform Debug:', {
    originalId: principle.id,
    originalTitle: principle.Title,
    originalTheme: principle.Theme,
    originalIsOverarching: principle.IsOverarching,
    transformedTitle: principle.title || principle.Title,
    transformedTheme: principle.theme || principle.Theme,
    transformedIsOverarching: principle.isOverarching,
    normalizedTheme: normalizeThemeForFiltering(principle.Theme || principle.theme)
  });
}