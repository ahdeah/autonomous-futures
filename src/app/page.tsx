// src/app/page.tsx
import HomepageHero from '@/components/homepage/HomepageHero';

export default function Home() {
  return (
    <main className="min-h-screen bg-af-background">
      {/* Homepage Hero Section */}
      <HomepageHero />
      
      {/* Progressive Disclosure Section - Coming Next */}
      <section className="py-16 bg-af-warm-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-heading text-af-charcoal mb-4">
              Explore Autonomous Futures Principles
            </h2>
            <p className="text-af-primary max-w-2xl mx-auto">
              Discover how speculative fiction from marginalized communities 
              informs equitable technology design through interconnected principles.
            </p>
          </div>
          
          {/* Placeholder for theme cards - will be built next */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-af-warm-white rounded-af-lg shadow-af-sm">
              <h3 className="text-lg font-semibold text-af-charcoal mb-2">
                Theme Cards Coming Soon
              </h3>
              <p className="text-af-primary text-sm">
                Detailed principle exploration will be added in the next component.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}