// src/components/principles/PrinciplesCard.tsx
import Link from 'next/link';
import { Principle } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { ConnectionIndicator } from '@/components/ui/ConnectionIndicator';


interface PrincipleCardProps {
  principle: Principle;
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  const title = principle.title || principle.Title;
  const description = principle.description || principle.Content || 'No description available.';
  
  const connections = [];
  if (principle.culturalTexts && principle.culturalTexts.length > 0) {
    connections.push({
        type: 'text' as const,
        count: principle.culturalTexts.length,
        tooltip: `Inspired by ${principle.culturalTexts.length} cultural texts`,
    });
  }
  if (principle.designRecommendations && principle.designRecommendations.length > 0) {
      connections.push({
          type: 'recommendation' as const,
          count: principle.designRecommendations.length,
          tooltip: `Has ${principle.designRecommendations.length} design recommendations`,
      });
  }


  return (
    <Card
      variant="default"
      hover={true}
      className="h-full flex flex-col"
      // Removed the onClick prop that was causing the error
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardDescription className="px-6 pb-4 text-sm leading-relaxed flex-grow">
        {description.length > 150 ? `${description.substring(0, 150)}...` : description}
      </CardDescription>
      <CardFooter className="flex justify-between items-center">
        <ConnectionIndicator connections={connections} />
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