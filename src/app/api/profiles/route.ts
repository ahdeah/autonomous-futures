// src/app/api/profiles/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    const profiles = await airtableApi.getProfiles();
    
    return NextResponse.json({
      success: true,
      data: profiles,
      count: profiles.length
    });
  } catch (error) {
    console.error('API Error (profiles):', error);
    
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
