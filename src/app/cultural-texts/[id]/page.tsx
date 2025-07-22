// src/app/cultural-texts/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { airtableApi, connections } from '@/lib/airtable';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PrincipleCard } from '@/components/principles/PrinciplesCard';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { CulturalTextImage } from '@/components/ui/CulturalTextImage';
import { getMetadataFallback, hasAccessLink } from '@/lib/placeholders';
import { ExternalLink, BookUser, Milestone, Globe } from 'lucide-react';

interface CulturalTextPageProps {
  params: {
    id: string;
  };
}

export default async function CulturalTextPage({ params }: CulturalTextPageProps) {
  const { id } = await params;
  const text = await airtableApi.getCulturalText(id);

  if (!text) {
    notFound();
  }

  // Fetch connected data
  const [
    relatedPrinciples,
    relatedProfiles,
  ] = await Promise.all([
    connections.getPrinciplesForCulturalText(id),
    connections.getProfilesForCulturalText(id), // Assuming this function exists or will be created
  ]);

  const breadcrumbItems = [
    { label: 'Cultural Texts', href: '/cultural-texts' },
    { label: text.title || text.Title, href: `/cultural-texts/${id}` },
  ];

  return (
    <main className="min-h-screen bg-af-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <header>
              <h1 className="text-display text-af-charcoal">{text.title || text.Title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-af-primary">
                <span className="flex items-center gap-2"><BookUser size={16} /> {getMetadataFallback('author', text.author || text.By)}</span>
                <span className="flex items-center gap-2"><Milestone size={16} /> {getMetadataFallback('year', text.year?.toString())}</span>
                <span className="flex items-center gap-2"><Globe size={16} /> {getMetadataFallback('country', text.country)}</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <CulturalTextImage text={text} size="xl" className="rounded-af-lg" showOverlay={false} />
                 {hasAccessLink(text) ? (
                    <a href={getMetadataFallback('links', text.links)} target="_blank" rel="noopener noreferrer" className="btn-accent mt-4 w-full text-center">
                      Access Online <ExternalLink size={16} className="inline ml-2" />
                    </a>
                  ) : (
                    <button className="btn-disabled mt-4 w-full" disabled>Find Online (Coming Soon)</button>
                  )}
              </div>
              <div className="md:col-span-2">
                <p className="text-af-primary text-lg leading-relaxed">{text.description || text.Content}</p>
              </div>
            </div>
            
            <section>
              <h2 className="text-heading mb-6 text-af-charcoal">Principles Inspired by this Text</h2>
              {relatedPrinciples && relatedPrinciples.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPrinciples.map((principle) => (
                    <PrincipleCard key={principle.id} principle={principle} />
                  ))}
                </div>
              ) : (
                <p className="text-af-placeholder-text italic">No principles are currently connected to this text.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <section>
              <h2 className="text-heading mb-6 text-af-charcoal">Creators & Thinkers</h2>
              {relatedProfiles && relatedProfiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {relatedProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              ) : (
                <p className="text-af-placeholder-text italic">No creators are connected to this text yet.</p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}