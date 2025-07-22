// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';
import type { CulturalText, Principle, DesignRecommendation } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const results = await airtableApi.searchAll(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('API Error (search):', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        data: [],
      },
      { status: 500 }
    );
  }
}