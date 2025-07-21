// src/components/principles/PrincipleCard.tsx
import Link from 'next/link';
import { Principle } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';

interface PrincipleCardProps {
  principle: Principle;
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  const title = principle.title || principle.Title;
  const description = principle.description || principle.Content || 'No description available.';
  const culturalTextsCount = Array.isArray(principle.culturalTexts) ? principle.culturalTexts.length : 0;

  return (
    <Card 
      variant="default"
      hover={true}
      className="h-full flex flex-col"
      onClick={() => { /* Navigation will be handled by the Link */ }}
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardDescription className="px-6 pb-4 text-sm leading-relaxed flex-grow">
        {description.length > 150 ? `${description.substring(0, 150)}...` : description}
      </CardDescription>
      <CardFooter className="flex justify-between items-center">
        {culturalTextsCount > 0 && (
          <span className="text-xs text-af-sage">
            → Inspired by {culturalTextsCount} cultural text{culturalTextsCount !== 1 ? 's' : ''}
          </span>
        )}
        <Link 
            href={`/principles/${principle.id}`} 
            className="text-sm font-semibold text-af-sage hover:text-af-charcoal transition-colors self-end"
        >
          Explore
        </Link>
      </CardFooter>
    </Card>
  );
}