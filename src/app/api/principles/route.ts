// src/app/api/principles/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    console.log('🔍 Fetching principles from Airtable...');
    
    const principles = await airtableApi.getPrinciples();
    
    console.log('🔍 Principles fetched:', {
      count: principles.length,
      sample: principles.slice(0, 2).map(p => ({
        id: p.id,
        title: p.title || p.Title,
        theme: p.theme || p.Theme,
        isOverarching: p.isOverarching || p.IsOverarching
      }))
    });
    
    return NextResponse.json({
      success: true,
      data: principles,
      count: principles.length
    });
  } catch (error) {
    console.error('API Error (principles):', error);
    
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