// src/app/principles/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PrinciplesAccordion } from '@/components/principles/PrinciplesAccordian'; // Import the new component

export default function PrinciplesPage() {
  const breadcrumbItems = [{ label: 'Principles', href: '/principles' }];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="text-center mb-12">
          <h1 className="text-heading text-af-charcoal mb-4">
            Autonomous Futures Principles
          </h1>
          <p className="text-af-primary max-w-3xl mx-auto text-lg">
            Our framework is built upon three interconnected themes. Explore each theme to discover the principles derived from speculative fiction that guide our approach to equitable technology design.
          </p>
        </div>

        {/* Replace the placeholder with the interactive accordion */}
        <PrinciplesAccordion />
      </div>
    </main>
  );
}