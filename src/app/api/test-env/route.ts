import { NextResponse } from 'next/server';

export async function GET() {
  // This runs server-side and should have access to environment variables
  const hasToken = !!process.env.AIRTABLE_API_TOKEN;
  const hasBaseId = !!process.env.AIRTABLE_BASE_ID;
  
  return NextResponse.json({
    success: true,
    serverSide: {
      hasAirtableToken: hasToken,
      hasAirtableBaseId: hasBaseId,
      tokenPrefix: hasToken ? process.env.AIRTABLE_API_TOKEN?.substring(0, 10) + '...' : 'none',
      baseIdPrefix: hasBaseId ? process.env.AIRTABLE_BASE_ID?.substring(0, 10) + '...' : 'none',
      nodeEnv: process.env.NODE_ENV,
    }
  });
}