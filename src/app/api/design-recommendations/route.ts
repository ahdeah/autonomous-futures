// src/app/api/design-recommendations/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    const designRecommendations = await airtableApi.getDesignRecommendations();
    
    return NextResponse.json({
      success: true,
      data: designRecommendations,
      count: designRecommendations.length
    });
  } catch (error) {
    console.error('API Error (design-recommendations):', error);
    
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

