// src/components/ui/ConnectionIndicator.tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Principle, CulturalText, DesignRecommendation, Profile } from '@/types';

interface Connection {
  type: 'principle' | 'text' | 'recommendation' | 'profile';
  count: number;
  tooltip: string;
  href?: string;
}

interface ConnectionIndicatorProps {
  connections: Connection[];
  layout?: 'inline' | 'stacked' | 'grid';
  showTooltips?: boolean;
}

const typeStyles = {
  principle: 'bg-af-sage/10 text-af-sage',
  text: 'bg-af-golden/10 text-af-golden',
  recommendation: 'bg-af-primary/10 text-af-primary',
  profile: 'bg-gray-400/10 text-gray-500',
};

export function ConnectionIndicator({
  connections,
  layout = 'inline',
  showTooltips = true,
}: ConnectionIndicatorProps) {
  if (!connections || connections.length === 0) {
    return null;
  }

  const layoutClasses = {
    inline: 'flex flex-row flex-wrap gap-2',
    stacked: 'flex flex-col space-y-2',
    grid: 'grid grid-cols-2 gap-2',
  };

  return (
    <div className={cn(layoutClasses[layout])}>
      {connections.map((conn) => {
        const content = (
          <div
            className={cn(
              'group relative inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full',
              typeStyles[conn.type]
            )}
          >
            <span>→</span>
            <span>
              {conn.count} {conn.type}
              {conn.count !== 1 ? 's' : ''}
            </span>
            {showTooltips && (
              <div className="absolute bottom-full mb-2 w-max max-w-xs bg-af-charcoal text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {conn.tooltip}
              </div>
            )}
          </div>
        );

        return conn.href ? (
          <Link href={conn.href} key={conn.type}>
            {content}
          </Link>
        ) : (
          <div key={conn.type}>{content}</div>
        );
      })}
    </div>
  );
}