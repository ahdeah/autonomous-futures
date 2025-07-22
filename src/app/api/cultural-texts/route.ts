// src/app/api/cultural-texts/route.ts
import { NextResponse } from 'next/server';
import { airtableApi } from '@/lib/airtable';

export async function GET() {
  try {
    // --- Start of Correction ---
    // 1. Fetch both cultural texts and profiles in parallel.
    const [culturalTexts, profiles] = await Promise.all([
      airtableApi.getCulturalTexts(),
      airtableApi.getProfiles()
    ]);

    // 2. Create a fast lookup map of Profile IDs to Profile Names.
    const profileNameMap = new Map<string, string>();
    profiles.forEach(profile => {
      if (profile.id && profile.name) {
        profileNameMap.set(profile.id, profile.name);
      }
    });

    // 3. Iterate through texts and replace the author ID with the looked-up name.
    const textsWithAuthorNames = culturalTexts.map(text => {
      // The author field now correctly holds the ID from our transform
      const authorId = text.author;
      if (authorId && profileNameMap.has(authorId)) {
        return {
          ...text,
          author: profileNameMap.get(authorId), // Replace ID with Name
        };
      }
      // If no match is found, return the text as-is.
      return text;
    });
    // --- End of Correction ---

    return NextResponse.json({
      success: true,
      data: textsWithAuthorNames, // Return the corrected data
      count: textsWithAuthorNames.length
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