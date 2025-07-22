// src/types/index.ts
// Core data interfaces for Autonomous Futures platform
// Updated to match actual CSV field structure from Airtable

export interface CulturalText {
  id: string;
  
  // Actual CSV field names from Airtable
  Title: string;                    // Required field
  By?: string;                      // Author - 2% missing
  "By (Web)"?: string;              // Web display version
  Content?: string;                 // Description/content
  Country?: string;                 // 20% missing
  "Text Location"?: string;         // Location field
  Year?: number;                    // 16% missing
  "Text Year"?: string;             // Year as string
  "Exact Date"?: string;            // Specific date
  Image?: string;                   // 89% missing - use placeholders
  Genres?: string;                  // 13% missing (plural in CSV)
  "Genres (Web)"?: number;          // Web display version
  Medium?: string;                  // 16% missing - standardized values
  "Related Records"?: number;       // Count field
  Links?: string;                   // 40% missing - show disabled state
  Principles?: string;              // Related principle IDs (string, not array)
  "Principles (Web)"?: string;      // Web display version
  "Design Recommendations"?: string; // Related recommendations (string, not array)
  "Design Recommendations (Web)"?: string; // Web display version
  Technology?: string;              // Technology taxonomy IDs (string, not array)
  Tags?: number;                    // Tags count
  
  // Computed/display properties for backwards compatibility
  title?: string;
  author?: string;
  country?: string;
  year?: number;
  medium?: string;
  genre?: string;                   // Singular form for display (first genre)
  genres?: string[];                  // Parsed array of genres for filtering
  image?: string;
  links?: string;
  description?: string;
  principles?: string[];            // Parsed from string to array
  designRecommendations?: string[]; // Parsed from string to array
  technology?: string[];            // Parsed from string to array
}

export interface Principle {
  id: string;
  
  // Actual CSV field names from Airtable
  Title: string;                    // Required field
  IsOverarching?: string;           // "Yes"/"No" string (not boolean in CSV)
  Theme?: string;                   // Theme name (capital T in CSV)
  Content?: string;                 // Description content
  Profiles?: string;                // Related profile IDs (string, not array)
  "Cultural Texts"?: string;        // Related text IDs (string, not array)
  "Design Recommendations"?: string; // Related recommendations (string, not array)
  "Design Recommendations (Web)"?: string; // Web display version
  
  // Computed/display properties for backwards compatibility
  title?: string;
  isOverarching?: boolean;          // Parsed from "Yes"/"No" string
  theme?: string;                   // Lowercase for filtering
  description?: string;
  profiles?: string[];              // Parsed from string to array
  culturalTexts?: string[];         // Parsed from string to array
  designRecommendations?: string[]; // Parsed from string to array
}

export interface DesignRecommendation {
  id: string;
  
  // Actual CSV field names from Airtable
  Title: string;                    // Required field
  Content?: string;                 // Main content
  Footnotes?: string;               // Additional notes
  "Cultural Texts"?: string;        // Related texts (string, not array)
  Principles?: string;              // Related principles (string, not array)
  Technology?: string;              // Related technology (string, not array)
  Tags?: number;                    // Tags count
  "Cultural Texts (Web)"?: string;  // Web display version
  
  // Computed/display properties for backwards compatibility
  title?: string;
  content?: string;
  footnotes?: string;
  culturalTexts?: string[];         // Parsed from string to array
  principles?: string[];            // Parsed from string to array
  technology?: string[];            // Parsed from string to array
}

export interface Profile {
  id: string;
  
  // Actual CSV field names from Airtable
  Name: string;                     // Required field
  Content?: string;                 // Bio content
  Photo?: string;                   // Profile image URL
  Profiles?: string;                // Related profiles (string, not array)
  "Cultural Texts"?: string;        // Related texts (string, not array)
  Principles?: string;              // Related principles (string, not array)
  Tags?: number;                    // Tags count
  
  // Computed/display properties for backwards compatibility
  name?: string;
  content?: string;
  photo?: string;
  profiles?: string[];              // Parsed from string to array
  culturalTexts?: string[];         // Parsed from string to array
  principles?: string[];            // Parsed from string to array
}

export interface TechnologyTaxonomy {
  id: string;
  
  // Actual CSV field names from Airtable
  Name: string;                     // Required field
  Tags?: string;                    // Tags (string, not number)
  Description?: string;             // Technology description
  Impact?: string;                  // Impact description
  Use?: string;                     // Use cases
  "Cultural Texts"?: string;        // Related texts (string, not array)
  "Design Recommendations"?: string; // Related recommendations (string, not array)
  
  // Computed/display properties for backwards compatibility
  name?: string;
  tags?: string[];                  // Parsed from string to array
  description?: string;
  impact?: string;
  use?: string;
  culturalTexts?: string[];         // Parsed from string to array
  designRecommendations?: string[]; // Parsed from string to array
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

// Utility types for data parsing
export type StringOrArray = string | string[];

// Helper type for fields that can be either CSV strings or arrays
export interface ParseableRelations {
  culturalTexts?: StringOrArray;
  principles?: StringOrArray;
  designRecommendations?: StringOrArray;
  profiles?: StringOrArray;
  technology?: StringOrArray;
}