/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/data-transforms.ts
import type { CulturalText, Principle, DesignRecommendation, Profile } from '@/types';

/**
 * Safely converts a potential genre field (string or array) into a string.
 */
function getGenreString(genreField: any): string {
  if (Array.isArray(genreField)) {
    return genreField.join(',');
  }
  if (typeof genreField === 'string') {
    return genreField;
  }
  return '';
}

/**
 * Cleans a URL string by removing extraneous characters.
 */
function cleanUrl(url: string | undefined): string |
undefined {
  if (!url || typeof url !== 'string') return undefined;
  // Remove leading '<' and trailing '>' and trim whitespace
  const cleaned = url.replace(/^</, '').replace(/>$/, '').trim();
  return cleaned ||
undefined; // Return undefined if the string is empty after cleaning
}

/**
 * Transform Airtable Cultural Text records to match both CSV field names and component expectations
 * Based on actual CSV structure: Title, By, Country, Year, Medium, Genres, Image, Links, etc.
 */
export function transformCulturalText(record: any): CulturalText {
  const rawGenreField = record.Genres ||
record.genres || record.genre;
  const genreString = getGenreString(rawGenreField);

  // --- Start of Correction ---
  // The 'By' field from Airtable, when it's a linked record, comes in as an array (e.g., ['recXXXXXXXX']).
  // This logic correctly extracts the single ID string.
  let authorIdOrName: string | undefined = undefined;
  if (Array.isArray(record.By) && record.By.length > 0) {
    authorIdOrName = record.By[0];
  } else if (typeof record.By === 'string') {
    authorIdOrName = record.By;
  }
  // --- End of Correction ---

  const transformed = {
    // Map CSV fields to interface
    id: record.id,
    
    // Original Airtable field names (from CSV)
    Title: record.Title ||
record.title || '',
    By: record.By,
    "By (Web)": record["By (Web)"] ||
record.byWeb,
    Content: record.Content || record.content || record.description,
    Country: record.Country ||
record.country,
    "Text Location": record["Text Location"] || record.textLocation,
    Year: record.Year ||
record.year,
    "Text Year": record["Text Year"] || record.textYear,
    "Exact Date": record["Exact Date"] ||
record.exactDate,
    Medium: record.Medium || record.medium,
    Genres: record.Genres, // Keep original for reference
    "Genres (Web)": record["Genres (Web)"] ||
record.genresWeb,
    Image: record.Image || record.image,
    "Related Records": record["Related Records"] ||
record.relatedRecords,
    Links: record.Links || record.links,
    Principles: record.Principles ||
record.principles,
    "Principles (Web)": record["Principles (Web)"] || record.principlesWeb,
    "Design Recommendations": record["Design Recommendations"] ||
record.designRecommendations,
    "Design Recommendations (Web)": record["Design Recommendations (Web)"] || record.designRecommendationsWeb,
    Technology: record.Technology ||
record.technology,
    Tags: record.Tags || record.tags,
    
    // Normalized property names for component compatibility
    title: record.Title ||
record.title || '',
    author: authorIdOrName, // Use the corrected ID or name
    country: record.Country ||
record.country,
    year: record.Year || record.year,
    medium: record.Medium ||
record.medium,
    genre: genreString.split(',')[0].trim(),
    genres: parseRelationField(genreString),
    image: record.Image ||
record.image,
    links: cleanUrl(record.Links || record.links),
    description: record.Content || record.content ||
record.description,
    
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
  const isOverarchingValue = record.IsOverarching ||
record.isOverarching || record.OVERARCHING;
  const isOverarching = isOverarchingValue === "Yes" || 
                       isOverarchingValue === true || 
                       isOverarchingValue === "TRUE" ||
isOverarchingValue === "true";

  const transformed = {
    // Map CSV fields to interface
    id: record.id,
    
    // Original Airtable field names (from CSV)
    Title: record.Title ||
record.title || '',
    IsOverarching: record.IsOverarching || record.isOverarching,
    Theme: record.Theme ||
record.theme, // CSV uses 'Theme' (capital T)
    Content: record.Content || record.content ||
'',
    Profiles: record.Profiles || record.profiles,
    "Cultural Texts": record["Cultural Texts"] ||
record.culturalTexts,
    "Design Recommendations": record["Design Recommendations"] || record.designRecommendations,
    "Design Recommendations (Web)": record["Design Recommendations (Web)"] ||
record.designRecommendationsWeb,
    
    // Normalized property names for component compatibility
    title: record.Title ||
record.title || '',
    isOverarching: isOverarching,
    theme: record.Theme ||
record.theme, // Map Theme → theme for component filtering
    description: record.Content || record.content ||
'',
    
    // Parse relation fields from strings to arrays
    profiles: parseRelationField(record.Profiles || record.profiles),
    culturalTexts: parseRelationField(record["Cultural Texts"] || record.culturalTexts),
    designRecommendations: parseRelationField(record["Design Recommendations"] || record.designRecommendations),
  } as Principle;
  return transformed;
}

export function transformDesignRecommendation(record: any): DesignRecommendation {
  return {
    id: record.id,
    Title: record.Title ||
'',
    Content: record.Content || '',
    Footnotes: record.Footnotes,
    "Cultural Texts": record["Cultural Texts"],
    Principles: record.Principles,
    Technology: record.Technology,
    
    // Normalized properties
    title: record.Title ||
'',
    content: record.Content || '',
    footnotes: record.Footnotes,
    
    // Parse relations
    culturalTexts: parseRelationField(record["Cultural Texts"]),
    principles: parseRelationField(record.Principles),
    technology: parseRelationField(record.Technology),
  } as DesignRecommendation;
}

// NEW: Add this function to handle Profile transformations
export function transformProfile(record: any): Profile {
  return {
    id: record.id,
    
    // Original Airtable field names
    Name: record.Name ||
'',
    Content: record.Content,
    Photo: record.Photo,
    Principles: record.Principles,
    "Cultural Texts": record["Cultural Texts"],

    // Normalized properties for component use
    name: record.Name ||
'',
    content: record.Content,
    photo: record.Photo,

    // This is the critical part that fixes the bug
    principles: parseRelationField(record.Principles),
    culturalTexts: parseRelationField(record["Cultural Texts"]),
    
  } as Profile;
}

/**
 * Parse comma-separated strings into arrays for relation fields
 */
export function parseRelationField(field: string | string[] | undefined): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field.map(item => String(item).trim()).filter(Boolean);
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
  const genreString = getGenreString(item.Genres || item.genres || item.genre);
  return {
    ...item,
    author: item.author || item.By ||
'Various',
    country: item.country || item.Country || 'Various',
    year: item.year || item.Year ||
undefined,
    medium: item.medium || item.Medium || 'Mixed Media',
    genre: item.genre || genreString.split(',')[0].trim() ||
'Speculative Fiction',
    genres: item.genres?.length ? item.genres : parseRelationField(genreString),
    description: item.description || item.Content ||
'Description coming soon.',
    links: cleanUrl(item.links || item.Links),
    image: item.image || item.Image ||
undefined,
    
    principles: item.principles || parseRelationField(item.Principles),
    designRecommendations: item.designRecommendations ||
parseRelationField(item["Design Recommendations"]),
    technology: item.technology || parseRelationField(item.Technology),
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