// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';
import { CulturalText, Principle, DesignRecommendation } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const [culturalTexts, principles, designRecommendations] = await Promise.all([
      airtableApi.getCulturalTexts(),
      airtableApi.getPrinciples(),
      airtableApi.getDesignRecommendations(),
    ]);

    const filteredTexts = culturalTexts
      .filter(
        (t) =>
          String(t.title || '').toLowerCase().includes(query) ||
          String(t.description || '').toLowerCase().includes(query) ||
          String(t.author || '').toLowerCase().includes(query) // Corrected line
      )
      .map((item) => ({ ...item, type: 'text' }));

    const filteredPrinciples = principles
      .filter(
        (p) =>
          String(p.title || '').toLowerCase().includes(query) ||
          String(p.description || '').toLowerCase().includes(query)
      )
      .map((item) => ({ ...item, type: 'principle' }));

    const filteredRecs = designRecommendations
      .filter(
        (r) =>
          String(r.title || '').toLowerCase().includes(query) ||
          String(r.content || '').toLowerCase().includes(query)
      )
      .map((item) => ({ ...item, type: 'recommendation' }));

    const results = [...filteredPrinciples, ...filteredTexts, ...filteredRecs];

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