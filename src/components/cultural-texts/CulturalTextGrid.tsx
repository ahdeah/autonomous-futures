// src/components/cultural-texts/CulturalTextGrid.tsx
'use client';

import { useCulturalTexts } from '@/hooks/useAirtable';
import { CulturalTextCard } from './CulturalTextCard';

export function CulturalTextGrid() {
  const { data: culturalTexts, isLoading, error } = useCulturalTexts();

  if (isLoading) {
    return (
      <div className="grid-cultural-texts">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-full aspect-[3/4] bg-af-placeholder-bg rounded-af-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">Error loading cultural texts. Please try again later.</p>;
  }

  return (
    <div className="grid-cultural-texts">
      {culturalTexts?.map((text) => (
        <CulturalTextCard key={text.id} text={text} />
      ))}
    </div>
  );
}