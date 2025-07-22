// src/app/principles/[id]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { airtableApi, connections } from '@/lib/airtable';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CulturalTextCard } from '@/components/cultural-texts/CulturalTextCard';
import { ProfileCard } from '@/components/profiles/ProfileCard';
import { Card, CardContent } from '@/components/ui/Card';
import { Principle } from '@/types';
import { CheckCircle, Users } from 'lucide-react';

interface PrinciplePageProps {
  params: {
    id: string;
  };
}

export default async function PrinciplePage({ params }: PrinciplePageProps) {
  const { id } = await params;
  const principle = await airtableApi.getPrinciple(id);

  if (!principle) {
    notFound();
  }

  // Fetch connected data in parallel
  const [
    culturalTexts,
    designRecommendations,
    creatorProfiles,
    relatedPrinciples,
  ] = await Promise.all([
    connections.getCulturalTextsForPrinciple(id),
    connections.getDesignRecommendationsForPrinciple(id),
    connections.getProfilesForPrinciple(id),
    connections.getRelatedPrinciples(principle),
  ]);

  const breadcrumbItems = [
    { label: 'Principles', href: '/principles' },
    { label: principle.title || principle.Title, href: `/principles/${id}` },
  ];

  return (
    <main className="min-h-screen bg-af-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header Section */}
        <header className="mb-12 border-b border-gray-200 pb-8">
          <div className="flex justify-between items-baseline">
            <h1 className="text-display text-af-charcoal">{principle.title || principle.Title}</h1>
            {principle.theme 
&& (
              <p className="text-af-sage font-semibold">{principle.theme}</p>
            )}
          </div>
          <p className="mt-4 text-xl text-af-primary max-w-4xl">
            {principle.description || principle.Content}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

           <div className="lg:col-span-2 space-y-12">
            {/* Design Recommendations Section */}
            <section>
              <h2 className="text-heading mb-6 text-af-charcoal">How to Apply This Principle</h2>
              {designRecommendations && designRecommendations.length > 0 ? (
                <div className="space-y-4">
                  {designRecommendations.map((rec) => (
                    // Added id={rec.id} to make this element a linkable anchor.
                    <div key={rec.id} id={rec.id} className="bg-af-warm-white p-4 rounded-af-md border border-gray-100 flex items-start gap-4 scroll-mt-24">
                      <CheckCircle className="w-5 h-5 text-af-sage mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-af-charcoal">{rec.title || rec.Title}</h3>
                        {rec.content && <p className="text-sm text-af-primary mt-1">{rec.content}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-af-placeholder-text italic">No design recommendations are connected to this principle yet.</p>
              )}
            </section>
            
            {/* Cultural Foundation Section */}
            <section>
              <h2 className="text-heading mb-2 text-af-charcoal">Cultural Foundation</h2>
              <p className="text-af-primary mb-6">This principle is inspired by the following cultural texts:</p>
              {culturalTexts && culturalTexts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {culturalTexts.map((text) => (
                    <CulturalTextCard key={text.id} text={text} />
                  ))}
                </div>
              ) : (
                <p className="text-af-placeholder-text italic">No cultural texts are connected to this principle yet.</p>
              )}
            </section>
          </div>

          <aside className="space-y-12">
           {/* Creator Profiles Section */}
            <section>
              <h2 className="text-heading mb-6 text-af-charcoal">Creator Profiles</h2>
              {creatorProfiles && creatorProfiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {creatorProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              ) : (
                <Card variant="default" className="text-center bg-af-light-sage/50 border-dashed border-af-sage/30">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Users size={32} className="text-af-primary mb-4" />
                      <h3 className="font-semibold text-af-charcoal">Visionaries Loading...</h3>
                      <p className="text-sm text-af-primary mt-2 max-w-xs mx-auto">
                        The brilliant minds inspiring this principle will be featured here soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
            
            {/* Related Principles Section */}
            <section>
              <h2 className="text-heading mb-6 text-af-charcoal">Related Principles</h2>
              {relatedPrinciples && relatedPrinciples.length > 0 ? (
                <div className="space-y-4">
                  {relatedPrinciples.map((relPrinciple) => (
                    <Link href={`/principles/${relPrinciple.id}`} key={relPrinciple.id} className="block group">
                      <div className="p-4 bg-af-warm-white rounded-af-md border border-gray-100 hover:border-af-sage/50 hover:shadow-af-sm transition-all">
                        <h4 className="font-semibold text-af-charcoal group-hover:text-af-sage">{relPrinciple.title || relPrinciple.Title}</h4>
                        <p className="text-xs text-af-primary">{relPrinciple.theme}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-af-placeholder-text italic">No related principles found.</p>
              )}
           </section>
          </aside>
         </div>
      </div>
    </main>
  );
}