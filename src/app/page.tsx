export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-af-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Typography Test */}
        <section className="space-y-4">
          <h1 className="text-display text-af-charcoal">
            Autonomous Futures
          </h1>
          <h2 className="text-heading text-af-primary">
            Design System Test
          </h2>
          <p className="text-body max-w-2xl">
            Testing our solarpunk-inspired design system with warm grays, sage green accents, 
            and golden highlights. This platform centers marginalized voices in technology futures 
            through diverse speculative fiction.
          </p>
        </section>

        {/* Color Palette Test */}
        <section className="space-y-4">
          <h3 className="text-subheading">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-af-sage rounded-af-md text-af-warm-white text-center">
              Sage Green
            </div>
            <div className="p-4 bg-af-golden rounded-af-md text-af-charcoal text-center">
              Golden Yellow
            </div>
            <div className="p-4 bg-af-primary rounded-af-md text-af-warm-white text-center">
              Warm Gray
            </div>
            <div className="p-4 bg-af-light-sage rounded-af-md text-af-charcoal text-center">
              Light Sage
            </div>
          </div>
        </section>

        {/* Button Test */}
        <section className="space-y-4">
          <h3 className="text-subheading">Button Styles</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Primary Button
            </button>
            <button className="btn-secondary">
              Secondary Button
            </button>
            <button className="btn-accent">
              Accent Button
            </button>
            <button className="btn-disabled">
              Disabled Button
            </button>
          </div>
        </section>

        {/* Card Test */}
        <section className="space-y-4">
          <h3 className="text-subheading">Organic Card Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-organic p-6">
              <h4 className="text-lg font-semibold mb-2">Cultural Text Card</h4>
              <p className="text-af-primary text-sm mb-4">
                Testing organic card styling with subtle rotation and hover effects.
              </p>
              <div className="placeholder-image h-32 rounded-af-sm">
                Placeholder Image
              </div>
            </div>
            <div className="card-organic p-6">
              <h4 className="text-lg font-semibold mb-2">Principle Card</h4>
              <p className="text-af-primary text-sm mb-4">
                Cards automatically alternate rotation direction for organic feel.
              </p>
              <button className="btn-primary text-sm px-4 py-2">
                Explore
              </button>
            </div>
            <div className="card-organic p-6">
              <h4 className="text-lg font-semibold mb-2">Connection Card</h4>
              <p className="text-af-primary text-sm">
                Hover to see the smooth animation and rotation correction.
              </p>
            </div>
          </div>
        </section>

        {/* Animation Test */}
        <section className="space-y-4">
          <h3 className="text-subheading">Animation Test</h3>
          <div className="flex gap-4">
            <div className="animate-fade-in p-4 bg-af-warm-white rounded-af-md shadow-af-sm">
              Fade In Animation
            </div>
            <div className="animate-slide-up p-4 bg-af-warm-white rounded-af-md shadow-af-sm">
              Slide Up Animation
            </div>
            <div className="animate-gentle-bounce p-4 bg-af-warm-white rounded-af-md shadow-af-sm">
              Gentle Bounce
            </div>
          </div>
        </section>

        {/* Missing Data Placeholder Test */}
        <section className="space-y-4">
          <h3 className="text-subheading">Missing Data Placeholders</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-af-warm-white p-6 rounded-af-lg shadow-af-md">
              <div className="placeholder-image h-48 rounded-af-sm mb-4">
                Missing Cover Image
              </div>
              <h4 className="font-semibold mb-2">Cultural Text Title</h4>
              <p className="text-af-placeholder-text text-sm">Author • Various • Date TBD</p>
              <button className="btn-disabled mt-4 text-sm">
                Find Online (Coming Soon)
              </button>
            </div>
            <div className="bg-af-warm-white p-6 rounded-af-lg shadow-af-md">
              <h4 className="font-semibold mb-2">Complete Data Example</h4>
              <p className="text-af-primary text-sm mb-4">
                This shows how content looks with all data present.
              </p>
              <button className="btn-accent text-sm">
                Access Link Available
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}