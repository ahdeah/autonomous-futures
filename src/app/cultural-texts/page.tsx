// src/app/cultural-texts/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CulturalTextGrid } from '@/components/cultural-texts/CulturalTextGrid';

export default function CulturalTextsPage() {
  const breadcrumbItems = [{ label: 'Cultural Texts', href: '/cultural-texts' }];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-heading text-af-charcoal mb-4">
            Explore Cultural Texts
          </h1>
          <p className="text-af-primary max-w-3xl mx-auto text-lg">
            Browse the collection of speculative fiction and media that form the foundation of the Autonomous Futures principles.
          </p>
        </div>

        <CulturalTextGrid />
      </div>
    </main>
  );
}