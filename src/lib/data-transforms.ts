// src/lib/data-transforms.ts
import type { CulturalText, Principle } from '@/types';

/**
 * Transform Airtable Cultural Text records to include both 
 * original field names and normalized property names for compatibility
 */
export function transformCulturalText(record: any): CulturalText {
  const transformed = {
    // Original Airtable field names
    id: record.id,
    Title: record.Title || record.title || '',
    By: record.By || record.by,
    Country: record.Country || record.country,
    Year: record.Year || record.year,
    Medium: record.Medium || record.medium,
    Genres: record.Genres || record.genres,
    Image: record.Image || record.image,
    Links: record.Links || record.links,
    Content: record.Content || record.content,
    Principles: record.Principles || record.principles,
    "Design Recommendations": record["Design Recommendations"] || record.designRecommendations,
    Technology: record.Technology || record.technology,
    
    // Normalized property names for backwards compatibility
    title: record.Title || record.title || '',
    author: record.By || record.by,
    country: record.Country || record.country,
    year: record.Year || record.year,
    medium: record.Medium || record.medium,
    genre: record.Genres || record.genres, // Note: Airtable uses 'Genres' (plural)
    image: record.Image || record.image,
    links: record.Links || record.links,
    description: record.Content || record.content,
    principles: record.Principles || record.principles,
    designRecommendations: record["Design Recommendations"] || record.designRecommendations,
    technology: record.Technology || record.technology,
  } as CulturalText;

  return transformed;
}

/**
 * Transform Airtable Principle records to include both 
 * original field names and normalized property names for compatibility
 */
export function transformPrinciple(record: any): Principle {
  // Handle IsOverarching field - could be "Yes"/"No" string, boolean, or checkbox
  const isOverarchingValue = record.IsOverarching || record.OVERARCHING || record.overarching;
  const isOverarching = isOverarchingValue === "Yes" || 
                       isOverarchingValue === true || 
                       isOverarchingValue === "TRUE" ||
                       isOverarchingValue === "true" ||
                       isOverarchingValue === "checked";

  const transformed = {
    // Original Airtable field names (supporting both old and new)
    id: record.id,
    Title: record.Title || record.title || '',
    IsOverarching: record.IsOverarching || record.OVERARCHING || record.overarching,
    OVERARCHING: record.OVERARCHING || record.IsOverarching || record.overarching, // Backwards compatibility
    Theme: record.Theme || record["Main Theme"] || record.mainTheme || record.theme,
    "Main Theme": record["Main Theme"] || record.Theme || record.mainTheme || record.theme, // Backwards compatibility
    Content: record.Content || record.content || '',
    "Cultural Texts": record["Cultural Texts"] || record.culturalTexts,
    "Design Recommendations": record["Design Recommendations"] || record.designRecommendations,
    Profiles: record.Profiles || record.profiles,
    
    // Normalized property names for backwards compatibility
    title: record.Title || record.title || '',
    isOverarching: isOverarching,
    theme: record.Theme || record["Main Theme"] || record.mainTheme || record.theme, // NOW LOOKS FOR NEW FIELD FIRST
    description: record.Content || record.content || '',
    culturalTexts: record["Cultural Texts"] || record.culturalTexts,
    designRecommendations: record["Design Recommendations"] || record.designRecommendations,
    profiles: record.Profiles || record.profiles,
  } as Principle;

  return transformed;
}

/**
 * Apply fallback values for missing data according to the platform requirements
 */
export function applyDataFallbacks(culturalText: CulturalText): CulturalText {
  return {
    ...culturalText,
    // Apply fallbacks for missing data
    author: culturalText.author || culturalText.By || 'Various',
    country: culturalText.country || culturalText.Country || 'Not specified',
    year: culturalText.year || culturalText.Year || undefined,
    medium: culturalText.medium || culturalText.Medium || 'Mixed Media',
    genre: culturalText.genre || culturalText.Genres || 'Not specified',
    
    // Ensure both field name versions are present
    By: culturalText.By || culturalText.author || 'Various',
    Country: culturalText.Country || culturalText.country || 'Not specified',
    Medium: culturalText.Medium || culturalText.medium || 'Mixed Media',
    Genres: culturalText.Genres || culturalText.genre || 'Not specified',
  };
}

/**
 * Get display-friendly year string
 */
export function getDisplayYear(year?: number): string {
  if (!year) return 'Date TBD';
  return year.toString();
}

/**
 * Check if cultural text has access link
 */
export function hasAccessLink(culturalText: CulturalText): boolean {
  return !!(culturalText.links || culturalText.Links);
}

/**
 * Check if cultural text has image
 */
export function hasImage(culturalText: CulturalText): boolean {
  return !!(culturalText.image || culturalText.Image);
}

/**
 * Get all unique genres from cultural texts for filtering
 */
export function extractUniqueGenres(culturalTexts: CulturalText[]): string[] {
  const genres = new Set<string>();
  
  culturalTexts.forEach(text => {
    const genre = text.genre || text.Genres;
    if (genre && genre !== 'Not specified') {
      // Handle comma-separated genres
      const genreList = genre.split(',').map(g => g.trim());
      genreList.forEach(g => genres.add(g));
    }
  });
  
  return Array.from(genres).sort();
}

/**
 * Get all unique mediums from cultural texts for filtering
 */
export function extractUniqueMediums(culturalTexts: CulturalText[]): string[] {
  const mediums = new Set<string>();
  
  culturalTexts.forEach(text => {
    const medium = text.medium || text.Medium;
    if (medium && medium !== 'Mixed Media') {
      mediums.add(medium);
    }
  });
  
  return Array.from(mediums).sort();
}

/**
 * Get all unique countries from cultural texts for filtering
 */
export function extractUniqueCountries(culturalTexts: CulturalText[]): string[] {
  const countries = new Set<string>();
  
  culturalTexts.forEach(text => {
    const country = text.country || text.Country;
    if (country && country !== 'Not specified') {
      countries.add(country);
    }
  });
  
  return Array.from(countries).sort();
}