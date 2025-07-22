// src/components/cultural-texts/CulturalTextGrid.tsx
'use client';

import { CulturalText } from '@/types';
import { CulturalTextCard } from './CulturalTextCard';

interface CulturalTextGridProps {
  texts: CulturalText[];
}

export function CulturalTextGrid({ texts }: CulturalTextGridProps) {
  if (!texts || texts.length === 0) {
    return <p className="text-center text-af-placeholder-text">No cultural texts match the current filters.</p>;
  }

  return (
    <div className="grid-cultural-texts">
      {texts.map((text) => (
        <CulturalTextCard key={text.id} text={text} />
      ))}
    </div>
  );
}