'use client';

import { useMemo } from 'react';
import { getPlaceholderConfig, getColorIndex } from '@/lib/placeholders';
import type { CulturalText } from '@/types';

interface PlaceholderImageProps {
  text: CulturalText;
  className?: string;
  showOverlay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PlaceholderImage({ 
  text, 
  className = '', 
  showOverlay = true,
  size = 'md' 
}: PlaceholderImageProps) {
  const config = getPlaceholderConfig(text);
  const colorIndex = getColorIndex(text.id, config.colors.length);
  
  // Size mappings
  const sizeClasses = {
    sm: 'h-32',
    md: 'h-48', 
    lg: 'h-64',
    xl: 'h-80'
  };

  // Generate pattern based on genre
  const pattern = useMemo(() => {
    return generatePattern(config.pattern, config.colors, text.id);
  }, [config.pattern, config.colors, text.id]);

  return (
    <div 
      className={`
        relative overflow-hidden bg-af-placeholder-bg 
        ${config.aspectRatio} ${sizeClasses[size]}
        ${className}
      `}
      role="img"
      aria-label={`Placeholder for ${config.title} - ${config.theme}`}
    >
      {/* SVG Pattern Background */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id={`gradient-${text.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: config.colors[0], stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: config.colors[1], stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: config.colors[2], stopOpacity: 0.4 }} />
          </linearGradient>
          
          {/* Pattern definitions */}
          <pattern 
            id={`pattern-${text.id}`}
            x="0" y="0" 
            width="40" height="40" 
            patternUnits="userSpaceOnUse"
          >
            {pattern}
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="100%" height="100%" fill={`url(#gradient-${text.id})`} />
        
        {/* Pattern overlay */}
        <rect width="100%" height="100%" fill={`url(#pattern-${text.id})`} opacity="0.3" />
        
        {/* Central symbol */}
        <text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="central"
          fontSize="48"
          fill={config.colors[2]}
          opacity="0.6"
          fontFamily="serif"
        >
          {config.symbol}
        </text>
      </svg>

      {/* Overlay with genre and medium info */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white text-sm font-medium mb-1">
              {config.theme}
            </div>
            <div className="text-white/80 text-xs">
              {config.medium}
            </div>
          </div>
        </div>
      )}

      {/* Loading shimmer effect (optional enhancement) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-20" />
    </div>
  );
}

/**
 * Generate SVG pattern elements based on genre theme
 */
function generatePattern(patternType: string, colors: readonly string[], id: string) {
  const primaryColor = colors[0];
  const secondaryColor = colors[1];
  
  switch (patternType) {
    case 'geometric':
      return (
        <>
          <rect x="5" y="5" width="30" height="30" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
          <circle cx="20" cy="20" r="8" fill={secondaryColor} opacity="0.3" />
        </>
      );
      
    case 'organic':
      return (
        <>
          <path 
            d="M10,10 Q20,25 30,10 Q25,20 30,30 Q20,15 10,30 Q15,20 10,10 Z" 
            fill={primaryColor} 
            opacity="0.3" 
          />
          <circle cx="15" cy="25" r="3" fill={secondaryColor} opacity="0.5" />
          <circle cx="25" cy="15" r="2" fill={secondaryColor} opacity="0.4" />
        </>
      );
      
    case 'spiral':
      return (
        <>
          <path 
            d="M20,20 m-15,0 a15,15 0 1,1 30,0 a10,10 0 1,1 -20,0 a5,5 0 1,1 10,0" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="2" 
            opacity="0.4" 
          />
        </>
      );
      
    case 'wave':
      return (
        <>
          <path 
            d="M0,20 Q10,10 20,20 T40,20" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="2" 
            opacity="0.4" 
          />
          <path 
            d="M0,30 Q10,20 20,30 T40,30" 
            fill="none" 
            stroke={secondaryColor} 
            strokeWidth="1" 
            opacity="0.3" 
          />
        </>
      );
      
    case 'mosaic':
      return (
        <>
          <polygon points="10,5 15,15 5,15" fill={primaryColor} opacity="0.4" />
          <polygon points="25,5 35,10 30,15 20,10" fill={secondaryColor} opacity="0.3" />
          <polygon points="5,25 15,35 5,35" fill={primaryColor} opacity="0.3" />
          <polygon points="20,25 30,30 25,35 15,30" fill={secondaryColor} opacity="0.4" />
        </>
      );
      
    case 'mandala':
      return (
        <>
          <circle cx="20" cy="20" r="12" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.3" />
          <circle cx="20" cy="20" r="8" fill="none" stroke={secondaryColor} strokeWidth="1" opacity="0.4" />
          <circle cx="20" cy="20" r="4" fill={primaryColor} opacity="0.3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line 
              key={angle}
              x1="20" y1="20" 
              x2={20 + 10 * Math.cos(angle * Math.PI / 180)} 
              y2={20 + 10 * Math.sin(angle * Math.PI / 180)}
              stroke={secondaryColor} 
              strokeWidth="1" 
              opacity="0.3" 
            />
          ))}
        </>
      );
      
    case 'abstract':
    default:
      return (
        <>
          <ellipse cx="15" cy="15" rx="8" ry="12" fill={primaryColor} opacity="0.3" transform="rotate(45 15 15)" />
          <ellipse cx="25" cy="25" rx="6" ry="10" fill={secondaryColor} opacity="0.4" transform="rotate(-30 25 25)" />
          <circle cx="30" cy="10" r="4" fill={primaryColor} opacity="0.3" />
        </>
      );
  }
}

export default PlaceholderImage;