// src/components/cultural-texts/CulturalTextCard.tsx
'use client';

import Link from 'next/link';
import { CulturalText } from '@/types';
import { getMetadataFallback, hasAccessLink, hasRealImage } from '@/lib/placeholders';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { CulturalTextImage } from '@/components/ui/CulturalTextImage';
import { ConnectionIndicator } from '@/components/ui/ConnectionIndicator';
import { ComponentDebugger } from '@/components/debug/ComponentDebugger';

interface CulturalTextCardProps {
  text: CulturalText;
}

// Define the type for a connection item to avoid implicit any
type ConnectionItem = {
  type: 'principle' | 'text' | 'recommendation' | 'profile';
  count: number;
  tooltip: string;
};

export function CulturalTextCard({ text }: CulturalTextCardProps) {
  const title = text.title || text.Title;
  const author = getMetadataFallback('author', text.author || text.By);
  const year = text.year || text.Year;

  // Explicitly type the connections array
  const connections: ConnectionItem[] = [];
  if (text.principles && text.principles.length > 0) {
    connections.push({
      type: 'principle' as const,
      count: text.principles.length,
      tooltip: `Inspires ${text.principles.length} principles`,
    });
  }

  // --- Start of Debugging Logic ---
  const getDebugData = () => {
    if (process.env.NODE_ENV !== 'development') {
      return null;
    }
    
    const fallbacksUsed: Record<string, any> = {};
    if (!text.author && !text.By) fallbacksUsed.author = author;
    if (!text.year && !text.Year) fallbacksUsed.year = getMetadataFallback('year');

    const missingData: string[] = [];
    if (!hasRealImage(text)) missingData.push('image');
    if (!hasAccessLink(text)) missingData.push('link');
    
    return {
      props: {
        id: text.id,
        title,
      },
      computed: {
        author,
        year,
      },
      fallbacksUsed,
      missingData,
      connectionsCount: connections[0]?.count || 0,
    };
  };
  const debugData = getDebugData();
  // --- End of Debugging Logic ---

  return (
    <Card variant="default" className="flex flex-col h-full group relative">
      {/* Visual Debugger */}
      {debugData && <ComponentDebugger componentName="CulturalTextCard" data={debugData} />}
      
      <Link href={`/cultural-texts/${text.id}`} className="flex flex-col flex-grow">
        <CardHeader className="p-0">
          <CulturalTextImage text={text} size="md" className="rounded-t-af-lg" />
        </CardHeader>

        <CardContent className="flex-grow p-4 space-y-2">
          <CardTitle className="text-lg leading-snug group-hover:text-af-sage transition-colors">{title}</CardTitle>
          <div className="text-sm text-af-primary">
            <p>{author}</p>
            <p className="text-xs text-af-placeholder-text">{year ? year.toString() : getMetadataFallback('year')}</p>
          </div>
          {connections.length > 0 && (
            <div className="pt-2">
              <ConnectionIndicator connections={connections} />
            </div>
          )}
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 mt-auto">
        {hasAccessLink(text) ? (
          <a
            href={text.links || text.Links!}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-sm w-full"
            onClick={(e) => e.stopPropagation()}
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