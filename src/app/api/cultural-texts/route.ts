import { NextRequest, NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      genre: searchParams.get('genre') || undefined,
      medium: searchParams.get('medium') || undefined,
      country: searchParams.get('country') || undefined,
      maxRecords: searchParams.get('maxRecords') ? parseInt(searchParams.get('maxRecords')!) : undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );

    const culturalTexts = await airtableApi.getCulturalTexts(cleanFilters);
    
    return NextResponse.json({
      success: true,
      data: culturalTexts,
      count: culturalTexts.length
    });
  } catch (error) {
    console.error('API Error (cultural-texts):', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        data: []
      },
      { status: 500 }
    );
  }
}