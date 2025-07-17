import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    const principles = await airtableApi.getPrinciples();
    
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