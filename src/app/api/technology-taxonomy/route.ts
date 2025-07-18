// src/app/api/technology-taxonomy/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    const technologyTaxonomy = await airtableApi.getTechnologyTaxonomy();
    
    return NextResponse.json({
      success: true,
      data: technologyTaxonomy,
      count: technologyTaxonomy.length
    });
  } catch (error) {
    console.error('API Error (technology-taxonomy):', error);
    
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