// Core data interfaces for Autonomous Futures platform
// Designed to handle high percentage of missing data gracefully

export interface CulturalText {
  id: string;
  Title: string;
  By?: string;              // Author - 2% missing
  Country?: string;         // 20% missing
  Year?: number;           // 16% missing
  Medium?: string;         // 16% missing - standardized values
  Genres?: string;         // 13% missing (was 'genre')
  Image?: string;          // 89% missing - use placeholders
  Links?: string;          // 40% missing - show disabled state
  Content?: string;        // Description (was 'description')
  Principles?: string[];   // Related principle IDs
  "Design Recommendations"?: string[];
  Technology?: string[];   // Technology taxonomy IDs
  
  // Computed/display properties for backwards compatibility
  title?: string;
  author?: string;
  country?: string;
  year?: number;
  medium?: string;
  genre?: string;
  image?: string;
  links?: string;
  description?: string;
  designRecommendations?: string[];
  principles?: string[];
  technology?: string[];
}

export interface Principle {
  id: string;
  Title: string;
  OVERARCHING?: string;     // "Yes"/"No" or boolean (was 'isOverarching')
  "Main Theme"?: string;    // For sub-principles (was 'theme')
  Content: string;          // Description (was 'description')
  "Cultural Texts"?: string[]; // Related text IDs
  "Design Recommendations"?: string[];
  Profiles?: string[];      // Creator/theorist IDs
  
  // Computed/display properties for backwards compatibility
  title?: string;
  isOverarching?: boolean;
  theme?: string;
  description?: string;
  culturalTexts?: string[];
  designRecommendations?: string[];
  profiles?: string[];
}

export interface DesignRecommendation {
  id: string;
  title: string;
  content: string;
  footnotes?: string;
  culturalTexts?: string[];
  principles?: string[];
  technology?: string[];
  profiles?: string[];
}

export interface Profile {
  id: string;
  name: string;
  content?: string;         // Bio
  photo?: string;          // Profile image
  culturalTexts?: string[]; // If cultural creator
  principles?: string[];    // If principle developer
  designRecommendations?: string[];
}

export interface TechnologyTaxonomy {
  id: string;
  name: string;
  category?: string;
  description?: string;
  culturalTexts?: string[];
  principles?: string[];
  designRecommendations?: string[];
}

// API Response types
export interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

export interface AirtableResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

// Search and filtering types
export interface SearchFilters {
  genre?: string;
  medium?: string;
  country?: string;
  year?: number;
  principle?: string;
  technology?: string;
}

export interface SearchResults<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
  query?: string;
}

// UI state types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ConnectionsMap {
  culturalTexts: Map<string, CulturalText>;
  principles: Map<string, Principle>;
  designRecommendations: Map<string, DesignRecommendation>;
  profiles: Map<string, Profile>;
  technology: Map<string, TechnologyTaxonomy>;
}

// Placeholder and fallback data
export interface PlaceholderConfig {
  genres: string[];
  mediums: string[];
  countries: string[];
  fallbackText: {
    author: string;
    country: string;
    year: string;
    medium: string;
    genre: string;
    missingLink: string;
  };
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'organic' | 'minimal';
  hover?: boolean;
  rotation?: 'subtle' | 'none' | 'random';
  shadow?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export interface ContentCardProps extends CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  tags?: string[];
  connections?: ConnectionIndicator[];
  actions?: React.ReactNode;
  missingDataFallbacks?: MissingDataConfig;
}

export interface ConnectionIndicator {
  id: string;
  type: 'principle' | 'text' | 'recommendation' | 'profile';
  title: string;
  count?: number;
  href?: string;
}

export interface MissingDataConfig {
  showImagePlaceholder?: boolean;
  showDescriptionFallback?: boolean;
  showActionsFallback?: boolean;
  placeholderText?: {
    description?: string;
    actions?: string;
  };
}

// Card layout configurations
export interface CardLayoutProps {
  layout?: 'grid' | 'list' | 'compact';
  responsive?: {
    mobile: number; // columns on mobile
    tablet: number; // columns on tablet
    desktop: number; // columns on desktop
  };
}

// For cultural text cards specifically
export interface CulturalTextCardProps extends ContentCardProps {
  text: CulturalText;
  showConnections?: boolean;
  showGenre?: boolean;
  showYear?: boolean;
  onTextClick?: (text: CulturalText) => void;
}

// For principle cards specifically  
export interface PrincipleCardProps extends ContentCardProps {
  principle: Principle;
  showTheme?: boolean;
  showConnectionCount?: boolean;
  isExpanded?: boolean;
  onExpand?: (principle: Principle) => void;
}

export interface SearchProps extends BaseComponentProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
  loading?: boolean;
}