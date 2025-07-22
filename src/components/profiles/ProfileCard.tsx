// src/components/profiles/ProfileCard.tsx
'use client';

import { Profile } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { UserCircle2 } from 'lucide-react';
import Image from 'next/image';

interface ProfileCardProps {
  profile: Profile;
}

function ProfilePlaceholder() {
  return (
    <div className="w-full aspect-square bg-af-placeholder-bg rounded-full flex items-center justify-center">
      <UserCircle2 className="w-1/2 h-1/2 text-af-placeholder-text" />
    </div>
  );
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const name = profile.name || profile.Name;
  const bio = profile.content || profile.Content;
  const photoUrl = profile.photo || profile.Photo;

  return (
    <Card variant="default" className="h-full text-center">
      <CardHeader>
        <div className="w-24 h-24 mx-auto relative">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`Photo of ${name}`}
              
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <ProfilePlaceholder />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold text-af-charcoal">{name}</h3>
      
       {bio && (
          <p className="text-xs text-af-primary mt-2">
            {bio.length > 100 ? `${bio.substring(0, 100)}...` : bio}
          </p>
        )}
      </CardContent>
    </Card>
  );
}