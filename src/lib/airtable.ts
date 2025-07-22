import Airtable from 'airtable';
import { transformCulturalText, transformPrinciple, transformDesignRecommendation, applyDataFallbacks } from './data-transforms';
import type { 
  CulturalText, 
  Principle, 
  DesignRecommendation, 
  Profile, 
  TechnologyTaxonomy,
  AirtableRecord,
  AirtableResponse 
} from '@/types';

// Table names (adjust these to match your actual Airtable table names)
export const TABLES = {
  CULTURAL_TEXTS: 'Cultural Texts',
  PRINCIPLES: 'Principles',
  DESIGN_RECOMMENDATIONS: 'Design Recommendations',
  PROFILES: 'Profiles',
  TECHNOLOGY_TAXONOMY: 'Technology Taxonomy'
} as const;

// Lazy initialization of Airtable base
let baseInstance: ReturnType<typeof Airtable.prototype.base> | null = null;

function getBase() {
  if (!baseInstance) {
    if (!process.env.AIRTABLE_API_TOKEN) {
      throw new Error('AIRTABLE_API_TOKEN is required');
    }

    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error('AIRTABLE_BASE_ID is required');
    }

    const airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_TOKEN
    });
    
    baseInstance = airtable.base(process.env.AIRTABLE_BASE_ID);
  }
  
  return baseInstance;
}

// Generic function to fetch records from any table
async function fetchRecords<T>(
  tableName: string,
  options: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
    maxRecords?: number;
    view?: string;
  } = {}
): Promise<T[]> {
  try {
    const base = getBase();
    
    // Build select options, removing undefined values
    const selectOptions: any = {};
    
    if (options.filterByFormula) {
      selectOptions.filterByFormula = options.filterByFormula;
    }
    
    if (options.maxRecords) {
      selectOptions.maxRecords = options.maxRecords;
    }
    
    if (options.view) {
      selectOptions.view = options.view;
    }
    
    // Only add sort if provided - let Airtable use default if not
    if (options.sort && options.sort.length > 0) {
      selectOptions.sort = options.sort;
    }

    const records = await base(tableName)
      .select(selectOptions)
      .all();

    return records.map(record => {
      const rawData = {
        id: record.id,
        ...record.fields
      };
      
      // Apply transformations based on table type
      if (tableName === TABLES.CULTURAL_TEXTS) {
        return applyDataFallbacks(transformCulturalText(rawData));
      } else if (tableName === TABLES.PRINCIPLES) {
        return transformPrinciple(rawData);
      } else if (tableName === TABLES.DESIGN_RECOMMENDATIONS) {
        return transformDesignRecommendation(rawData);
      }
      
      // Default transformation for other tables
      return rawData;
    }) as T[];
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    throw new Error(`Failed to fetch ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Specific fetch functions for each table
export const airtableApi = {
  // Fetch all cultural texts
  async getCulturalTexts(filters?: {
    genre?: string;
    medium?: string;
    country?: string;
    maxRecords?: number;
  }): Promise<CulturalText[]> {
    let filterFormula = '';
    
    if (filters) {
      const conditions: string[] = [];
      
      // Use correct Airtable field names
      if (filters.genre) {
        conditions.push(`{Genres} = "${filters.genre}"`);
      }
      if (filters.medium) {
        conditions.push(`{Medium} = "${filters.medium}"`);
      }
      if (filters.country) {
        conditions.push(`{Country} = "${filters.country}"`);
      }
      
      if (conditions.length > 0) {
        filterFormula = `AND(${conditions.join(', ')})`;
      }
    }

    const options: any = {
      maxRecords: filters?.maxRecords || 100
    };

    // Only add filterByFormula if we have a formula
    if (filterFormula) {
      options.filterByFormula = filterFormula;
    }

    return fetchRecords<CulturalText>(TABLES.CULTURAL_TEXTS, options);
  },

  // Fetch single cultural text by ID
  async getCulturalText(id: string): Promise<CulturalText | null> {
    try {
      const base = getBase();
      const record = await base(TABLES.CULTURAL_TEXTS).find(id);
      const transformed = applyDataFallbacks(transformCulturalText({ id: record.id, ...record.fields }));
      return transformed;
    } catch (error) {
      console.error(`Error fetching cultural text ${id}:`, error);
      return null;
    }
  },

  // Fetch all principles
  async getPrinciples(): Promise<Principle[]> {
    return fetchRecords<Principle>(TABLES.PRINCIPLES, {
      maxRecords: 50 // Reasonable limit
    });
  },

  // Fetch single principle by ID
  async getPrinciple(id: string): Promise<Principle | null> {
    try {
      const base = getBase();
      const record = await base(TABLES.PRINCIPLES).find(id);
      const transformed = transformPrinciple({ id: record.id, ...record.fields });
      return transformed;
    } catch (error) {
      console.error(`Error fetching principle ${id}:`, error);
      return null;
    }
  },

  // Fetch design recommendations
  async getDesignRecommendations(principleId?: string): Promise<DesignRecommendation[]> {
    let filterFormula = '';
    if (principleId) {
      filterFormula = `FIND("${principleId}", {Principles})`;
    }
    return fetchRecords<DesignRecommendation>(TABLES.DESIGN_RECOMMENDATIONS, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Title', direction: 'asc' }]
    });
  },
  
  // Fetch profiles
  async getProfiles(): Promise<Profile[]> {
    return fetchRecords<Profile>(TABLES.PROFILES, {
      sort: [{ field: 'Name', direction: 'asc' }]
    });
  },

  // Fetch technology taxonomy
  async getTechnologyTaxonomy(): Promise<TechnologyTaxonomy[]> {
    return fetchRecords<TechnologyTaxonomy>(TABLES.TECHNOLOGY_TAXONOMY, {
      sort: [
        { field: 'Category', direction: 'asc' },
        { field: 'Name', direction: 'asc' }
      ]
    });
  },

  // NEW: Efficiently search across all relevant tables
  async searchAll(query: string): Promise<(CulturalText | Principle | DesignRecommendation)[]> {
    const lowerQuery = query.toLowerCase();

    const searchFormula = (fields: string[]) => `OR(${fields.map(field => `SEARCH(LOWER("${lowerQuery}"), LOWER({${field}}))`).join(', ')})`;

    const culturalTextFormula = searchFormula(['Title', 'By', 'Content', 'Genres', 'Medium']);
    const principleFormula = searchFormula(['Title', 'Content', 'Theme']);
    const recommendationFormula = searchFormula(['Title', 'Content']);

    try {
      const [culturalTexts, principles, designRecommendations] = await Promise.all([
        fetchRecords<CulturalText>(TABLES.CULTURAL_TEXTS, { filterByFormula: culturalTextFormula, maxRecords: 25 }),
        fetchRecords<Principle>(TABLES.PRINCIPLES, { filterByFormula: principleFormula, maxRecords: 25 }),
        fetchRecords<DesignRecommendation>(TABLES.DESIGN_RECOMMENDATIONS, { filterByFormula: recommendationFormula, maxRecords: 25 }),
      ]);

      const results = [
        ...culturalTexts.map(item => ({ ...item, type: 'text' })),
        ...principles.map(item => ({ ...item, type: 'principle' })),
        ...designRecommendations.map(item => ({ ...item, type: 'recommendation' })),
      ];

      return results;
    } catch (error) {
      console.error('Error in searchAll:', error);
      throw new Error('Failed to perform search across all tables.');
    }
  }
};

// Connection utilities for relating data across tables
export const connections = {
  // Get cultural texts related to a principle
  async getCulturalTextsForPrinciple(principleId: string): Promise<CulturalText[]> {
    const allTexts = await fetchRecords<CulturalText>(TABLES.CULTURAL_TEXTS, {
      sort: [{ field: 'Title', direction: 'asc' }]
    });
    return allTexts.filter(text => text.principles?.includes(principleId));
  },

  // Get principles related to a cultural text
  async getPrinciplesForCulturalText(textId: string): Promise<Principle[]> {
    const allPrinciples = await fetchRecords<Principle>(TABLES.PRINCIPLES, {
      sort: [
        { field: 'IsOverarching', direction: 'desc' },
        { field: 'Title', direction: 'asc' }
      ]
    });
    return allPrinciples.filter(p => p.culturalTexts?.includes(textId));
  },

  // Get profiles related to a principle
  async getProfilesForPrinciple(principleId: string): Promise<Profile[]> {
    const allProfiles = await fetchRecords<Profile>(TABLES.PROFILES);
    return allProfiles.filter(profile => profile.principles?.includes(principleId));
  },

  // Get principles related to a principle
  async getRelatedPrinciples(currentPrinciple: Principle): Promise<Principle[]> {
    if (!currentPrinciple || !currentPrinciple.culturalTexts?.length) {
      return [];
    }
    const allPrinciples = await fetchRecords<Principle>(TABLES.PRINCIPLES);
    const related = allPrinciples.filter(p => {
      if (p.id === currentPrinciple.id) return false;
      return p.culturalTexts?.some(textId => currentPrinciple.culturalTexts?.includes(textId));
    });
    return related.slice(0, 3);
  },

  async getProfilesForCulturalText(textId: string): Promise<Profile[]> {
    const allProfiles = await fetchRecords<Profile>(TABLES.PROFILES);
    return allProfiles.filter(profile => profile.culturalTexts?.includes(textId));
  },

  // Get design recommendations for a principle
  async getDesignRecommendationsForPrinciple(principleId: string): Promise<DesignRecommendation[]> {
     const allRecs = await fetchRecords<DesignRecommendation>(TABLES.DESIGN_RECOMMENDATIONS, {
      sort: [{ field: 'Title', direction: 'asc' }]
    });
    return allRecs.filter(rec => rec.principles?.includes(principleId));
  }
};

export default airtableApi;