import type { CulturalText } from '@/types';

// Genre-based placeholder mapping with solarpunk-inspired themes
export const GENRE_PLACEHOLDERS = {
  'afrofuturist': {
    colors: ['#9CAF88', '#F59E0B', '#6B7280'], // Sage, golden, warm gray
    pattern: 'geometric',
    symbol: '◆',
    theme: 'Afrofuturist Visions'
  },
  'feminist futurist': {
    colors: ['#E8F5E8', '#9CAF88', '#374151'], // Light sage, sage, charcoal
    pattern: 'organic',
    symbol: '❋',
    theme: 'Feminist Futures'
  },
  'indigenous': {
    colors: ['#8B5A2B', '#9CAF88', '#F4E6D1'], // Earth tones with sage
    pattern: 'spiral',
    symbol: '◉',
    theme: 'Indigenous Wisdom'
  },
  'asian futurist': {
    colors: ['#D4C5B9', '#9CAF88', '#6B7280'],
    pattern: 'wave',
    symbol: '○',
    theme: 'Asian Perspectives'
  },
  'latinx': {
    colors: ['#F59E0B', '#9CAF88', '#FBBF24'], // Golden yellows with sage
    pattern: 'mosaic',
    symbol: '◈',
    theme: 'Latinx Futures'
  },
  'south asian': {
    colors: ['#7C3AED', '#9CAF88', '#DDD6FE'], // Purple with sage
    pattern: 'mandala',
    symbol: '✦',
    theme: 'South Asian Voices'
  },
  'arab futurist': {
    colors: ['#059669', '#9CAF88', '#A7F3D0'], // Emerald with sage
    pattern: 'geometric',
    symbol: '✧',
    theme: 'Arab Futures'
  },
  'solarpunk': {
    colors: ['#9CAF88', '#34D399', '#065F46'], // Green spectrum
    pattern: 'organic',
    symbol: '❋',
    theme: 'Solarpunk Dreams'
  },
  'default': {
    colors: ['#9CAF88', '#6B7280', '#E8F5E8'], // Default sage theme
    pattern: 'abstract',
    symbol: '◦',
    theme: 'Speculative Fiction'
  }
} as const;

// Aspect ratios for different media types
export const ASPECT_RATIOS = {
  'book': 'aspect-[3/4]',        // 3:4 portrait for books
  'film': 'aspect-video',        // 16:9 for films
  'tv series': 'aspect-video',   // 16:9 for TV
  'game': 'aspect-square',       // 1:1 for games
  'podcast': 'aspect-square',    // 1:1 for podcasts
  'article': 'aspect-[4/3]',     // 4:3 for articles
  'mixed media': 'aspect-[4/3]', // 4:3 default
  'default': 'aspect-[4/3]'      // 4:3 fallback
} as const;

/**
 * Determine the placeholder configuration for a cultural text
 */
export function getPlaceholderConfig(text: CulturalText) {
  const genre = normalizeGenre(text.genre || text.Genres || '');
  const medium = normalizeMedium(text.medium || text.Medium || '');
  
  const config = GENRE_PLACEHOLDERS[genre] || GENRE_PLACEHOLDERS.default;
  const aspectRatio = ASPECT_RATIOS[medium] || ASPECT_RATIOS.default;
  
  return {
    ...config,
    aspectRatio,
    genre: text.genre || text.Genres || 'Speculative Fiction',
    medium: text.medium || text.Medium || 'Mixed Media',
    title: text.title || text.Title || 'Untitled Work'
  };
}

/**
 * Normalize genre strings to match our placeholder keys
 */
function normalizeGenre(genre: any): keyof typeof GENRE_PLACEHOLDERS {
  const normalized = String(genre).toLowerCase().trim();
  
  // Direct matches
  if (normalized in GENRE_PLACEHOLDERS) {
    return normalized as keyof typeof GENRE_PLACEHOLDERS;
  }
  
  // Fuzzy matching for common variations
  if (normalized.includes('afrofuturist') || normalized.includes('afro-futurist')) {
    return 'afrofuturist';
  }
  if (normalized.includes('feminist')) {
    return 'feminist futurist';
  }
  if (normalized.includes('indigenous') || normalized.includes('native')) {
    return 'indigenous';
  }
  if (normalized.includes('asian') || normalized.includes('chinese') || normalized.includes('japanese') || normalized.includes('korean')) {
    return 'asian futurist';
  }
  if (normalized.includes('latinx') || normalized.includes('latino') || normalized.includes('latina') || normalized.includes('hispanic')) {
    return 'latinx';
  }
  if (normalized.includes('south asian') || normalized.includes('indian') || normalized.includes('pakistani') || normalized.includes('bangladeshi')) {
    return 'south asian';
  }
  if (normalized.includes('arab') || normalized.includes('middle east') || normalized.includes('persian')) {
    return 'arab futurist';
  }
  if (normalized.includes('solarpunk') || normalized.includes('eco') || normalized.includes('climate')) {
    return 'solarpunk';
  }
  
  return 'default';
}

/**
 * Normalize medium strings to match our aspect ratio keys
 */
function normalizeMedium(medium: string): keyof typeof ASPECT_RATIOS {
  const normalized = medium.toLowerCase().trim();
  
  // Direct matches
  if (normalized in ASPECT_RATIOS) {
    return normalized as keyof typeof ASPECT_RATIOS;
  }
  
  // Fuzzy matching
  if (normalized.includes('book') || normalized.includes('novel') || normalized.includes('story')) {
    return 'book';
  }
  if (normalized.includes('film') || normalized.includes('movie') || normalized.includes('cinema')) {
    return 'film';
  }
  if (normalized.includes('tv') || normalized.includes('television') || normalized.includes('series') || normalized.includes('show')) {
    return 'tv series';
  }
  if (normalized.includes('game') || normalized.includes('gaming')) {
    return 'game';
  }
  if (normalized.includes('podcast') || normalized.includes('audio')) {
    return 'podcast';
  }
  if (normalized.includes('article') || normalized.includes('essay') || normalized.includes('paper')) {
    return 'article';
  }
  
  return 'default';
}

/**
 * Generate a stable color index based on text ID for consistent placeholder colors
 */
export function getColorIndex(id: string, colorCount: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % colorCount;
}

/**
 * Get fallback metadata for missing fields
 */
export function getMetadataFallback(field: string, value?: any): string {
  // Coerce value to string and check if it has content
  const stringValue = value ? String(value).trim() : '';
  
  if (stringValue) {
    return stringValue;
  }
  
  switch (field) {
    case 'author':
    case 'By':
      return 'Various';
    case 'country':
    case 'Country':
      return 'Various';
    case 'year':
    case 'Year':
      return 'Date TBD';
    case 'medium':
    case 'Medium':
      return 'Mixed Media';
    case 'genre':
    case 'Genres':
      return 'Speculative Fiction';
    case 'description':
    case 'Content':
      return 'Details coming soon';
    default:
      return 'Not specified';
  }
}

/**
 * Check if cultural text has a real image URL
 */
export function hasRealImage(text: CulturalText): boolean {
  const imageUrl = text.image || text.Image;
  return typeof imageUrl === 'string' && imageUrl.trim() !== '' && imageUrl !== 'placeholder';
}

/**
 * Check if cultural text has an access link
 */
export function hasAccessLink(text: CulturalText): boolean {
  const links = text.links || text.Links;
  return typeof links === 'string' && links.trim() !== '';
}


/**
 * Get placeholder image path for static placeholder images (if we add them later)
 */
export function getPlaceholderImagePath(genre: string): string {
  const normalizedGenre = normalizeGenre(genre);
  return `/images/placeholders/${normalizedGenre}.svg`;
}