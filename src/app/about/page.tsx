// src/app/about/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export default function AboutPage() {
  const breadcrumbItems = [{ label: 'About', href: '/about' }];

  return (
    <main className="min-h-screen bg-af-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="text-center mb-16">
          <h1 className="text-display text-af-charcoal mb-4">
            About Autonomous Futures
          </h1>
          <p className="text-af-primary max-w-3xl mx-auto text-xl leading-relaxed">
            We are a distributed network of researchers, academics, technologists, authors, artists, policy experts, strategists, and advisors who are re-imagining our relationship with emerging technologies and the suite of computational systems and tools broadly categorized as “ai.”
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Mission & Vision Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-heading text-af-charcoal mb-4">Our Mission</h2>
              <p className="text-af-primary leading-relaxed">
                We engage with diverse speculative fiction and cultural texts to collectively imagine a future of technological innovation in which we can close the <Link href="https://www.brookings.edu/articles/fixing-the-global-digital-divide-and-digital-access-gap/" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">global digital divide</Link> and support the flourishing of communities most likely to be <Link href="https://ai100.stanford.edu/gathering-strength-gathering-storms-one-hundred-year-study-artificial-intelligence-ai100-2021-1-0" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">negatively impacted by ai</Link>. We do this by building community with the public and across sectors through speculative fiction, literary, cultural, artistic, and critical primary sources.
              </p>
            </div>
            <div>
              <h2 className="text-heading text-af-charcoal mb-4">Our Vision</h2>
              <p className="text-af-primary leading-relaxed">
                We envision a future where communities own, operate, and determine the appropriate processes of development and application(s) for ai to support our society.
              </p>
            </div>
          </section>

          {/* Why "Autonomous" Section */}
          <section>
            <h2 className="text-heading text-af-charcoal text-center mb-8">Why &quot;Autonomous&quot;</h2>
            <Card variant="default" shadow="lg">
              <CardContent className="p-8 space-y-4 text-af-primary leading-relaxed">
                <p>
                  We reclaim the word “autonomous” away from contemporary discourse on <Link href="https://mediatum.ub.tum.de/doc/1616746/document.pdf" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">autonomous systems</Link> by re-centering the concept of autonomy within a genealogy of intersectional and black feminist critiques of the multiple, overlapping (“intersecting”) forms of oppression that threaten our opportunities for self-determination, autonomy, freedom, and collective liberation.
                </p>
                <p>
                  Tracing a genealogy of autonomy from enslavement and the fight for the rights of Black women who have been at the forefront of the struggle for freedom, we draw inspiration from discussions on autonomy from <Link href="http://ereserve.library.utah.edu/Annual/SOC/7050/Stewart/mother.pdf" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">Patricia Hill Collins</Link> and the <Link href="https://americanstudies.yale.edu/sites/default/files/files/Keyword%20Coalition_Readings.pdf" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">Combahee River Collective</Link> to Octavia Butler’s concepts of bodily autonomy examined through conditions like “hyperempathy” which can help us understand the problems of even the best outcomes proposed for advanced technologies, like the so-called “<Link href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.814565/full" target="_blank" rel="noopener noreferrer" className="text-af-sage hover:underline">empathy machine</Link>” that artist Chris Milk calls Virtual Reality.
                </p>
                <p>
                  By introducing the archive of texts that anchor this project we uplift the visionaries of technologies who, through their art, are envisioning what it means to exercise autonomy over ourselves and our communities against threats against that autonomy. We have an opportunity to tap into an even deeper well of imagination that center diverse, plural visions of the future from marginalized communities often excluded or rendered invisible in the story of technological innovation.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}