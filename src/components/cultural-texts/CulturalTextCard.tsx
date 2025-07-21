// src/components/cultural-texts/CulturalTextCard.tsx
'use client';

import Link from 'next/link';
import { CulturalText } from '@/types';
import { getMetadataFallback, hasAccessLink } from '@/lib/placeholders';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { CulturalTextImage } from '@/components/ui/CulturalTextImage';

interface CulturalTextCardProps {
  text: CulturalText;
}

export function CulturalTextCard({ text }: CulturalTextCardProps) {
  const title = text.title || text.Title;
  const author = getMetadataFallback('author', text.author || text.By);
  const year = text.year || text.Year;

  return (
    <Card variant="default" className="flex flex-col h-full">
      <CardHeader className="p-0">
        <CulturalTextImage text={text} size="md" className="rounded-t-af-lg" />
      </CardHeader>
      
      <CardContent className="flex-grow p-4 space-y-2">
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        <div className="text-sm text-af-primary">
          <p>{author}</p>
          <p className="text-xs text-af-placeholder-text">{year ? year.toString() : getMetadataFallback('year')}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {hasAccessLink(text) ? (
          <a
            href={text.links || text.Links}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
          >
            Access Online
          </a>
        ) : (
          <button className="btn-disabled text-sm w-full" disabled>
            Find Online (Coming Soon)
          </button>
        )}
      </CardFooter>
    </Card>
  );
}