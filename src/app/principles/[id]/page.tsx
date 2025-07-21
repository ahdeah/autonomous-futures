// src/app/principles/[id]/page.tsx
import { notFound } from 'next/navigation';
import { airtableApi, connections } from '@/lib/airtable';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CulturalTextCard } from '@/components/cultural-texts/CulturalTextCard';
import { Principle, CulturalText, DesignRecommendation } from '@/types';
import { CheckCircle } from 'lucide-react';

interface PrinciplePageProps {
  params: {
    id: string;
  };
}

export default async function PrinciplePage(props: PrinciplePageProps) {
  const { id } = await props.params;

  const [principle, culturalTexts, designRecommendations] = await Promise.all([
    airtableApi.getPrinciple(id),
    connections.getCulturalTextsForPrinciple(id),
    connections.getDesignRecommendationsForPrinciple(id)
  ]);

  if (!principle) {
    notFound();
  }

  // Terminal output for verification
  console.log('---');
  console.log(`[+] Loading data for principle: "${principle.title || principle.Title}" (ID: ${id})`);
  console.log(`[+] Found ${culturalTexts.length} cultural text(s).`);
  if (culturalTexts.length > 0) {
    console.log('  - Sample Text:', culturalTexts[0].title || culturalTexts[0].Title);
  }
  console.log(`[+] Found ${designRecommendations.length} design recommendation(s).`);
  if (designRecommendations.length > 0) {
    console.log('  - Sample Recommendation:', designRecommendations[0].title || designRecommendations[0].Title);
  }
  console.log('---');


  const breadcrumbItems = [
    { label: 'Principles', href: '/principles' },
    { label: principle.title || principle.Title, href: `/principles/${id}` },
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex justify-between items-baseline">
            <h1 className="text-display text-af-charcoal">{principle.title || principle.Title}</h1>
            {principle.theme && (
              <p className="text-af-sage font-semibold">{principle.theme}</p>
            )}
          </div>
          <p className="mt-4 text-xl text-af-primary max-w-4xl">
            {principle.description || principle.Content}
          </p>
        </header>

        {/* Design Recommendations Section */}
        <section>
          <h2 className="text-heading mb-6">How to Apply This Principle</h2>
           {designRecommendations && designRecommendations.length > 0 ? (
            <div className="space-y-4">
              {designRecommendations.map((rec) => (
                <div key={rec.id} className="bg-af-warm-white p-4 rounded-af-md border border-gray-100 flex items-start gap-4">
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
        <section className="mb-12">
          <h2 className="text-heading mb-2">Cultural Foundation</h2>
          <p className="text-af-primary mb-6">This principle is inspired by the following cultural texts:</p>
          {culturalTexts && culturalTexts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {culturalTexts.map((text) => (
                <CulturalTextCard key={text.id} text={text} />
              ))}
            </div>
          ) : (
            <p className="text-af-placeholder-text italic">No cultural texts are connected to this principle yet.</p>
          )}
        </section>

        
      </div>
    </main>
  );
}