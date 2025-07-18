'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceholderImage } from './PlaceholderImage';
import { hasRealImage } from '@/lib/placeholders';
import type { CulturalText } from '@/types';

interface CulturalTextImageProps {
  text: CulturalText;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOverlay?: boolean;
  priority?: boolean;
}

export function CulturalTextImage({ 
  text, 
  className = '', 
  size = 'md',
  showOverlay = true,
  priority = false 
}: CulturalTextImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const imageUrl = text.image || text.Image;
  const shouldShowPlaceholder = !hasRealImage(text) || imageError;

  // If no real image or image failed to load, show placeholder
  if (shouldShowPlaceholder) {
    return (
      <PlaceholderImage 
        text={text}
        className={className}
        size={size}
        showOverlay={showOverlay}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder while image loads */}
      {imageLoading && (
        <div className="absolute inset-0">
          <PlaceholderImage 
            text={text}
            size={size}
            showOverlay={false}
            className="opacity-50"
          />
        </div>
      )}
      
      {/* Actual image */}
      <Image
        src={imageUrl!}
        alt={`Cover image for ${text.title || text.Title}`}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        priority={priority}
      />
      
      {/* Overlay (if requested and image loaded) */}
      {showOverlay && !imageLoading && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white text-sm font-medium">
              {text.genre || text.Genres || 'Speculative Fiction'}
            </div>
            <div className="text-white/80 text-xs">
              {text.medium || text.Medium || 'Mixed Media'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CulturalTextImage;