'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';

export function CardTest() {
  const handleCardClick = (cardType: string) => {
    console.log(`${cardType} card clicked`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-heading text-af-charcoal mb-2">
          Base Card Component System
        </h2>
        <p className="text-af-primary max-w-2xl mx-auto">
          Testing our flexible Card component with organic styling, hover animations, 
          and support for different variants and missing data scenarios.
        </p>
      </div>

      {/* Card Variants */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Default Card */}
          <Card variant="default" onClick={() => handleCardClick('Default')}>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                Standard card with clean styling and subtle shadows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                This is the default card variant with standard styling, 
                border, and hover effects.
              </p>
            </CardContent>
            <CardFooter>
              <button className="btn-primary text-sm">
                Action Button
              </button>
            </CardFooter>
          </Card>

          {/* Organic Card */}
          <Card 
            variant="organic" 
            rotation="subtle"
            onClick={() => handleCardClick('Organic')}
          >
            <CardHeader>
              <CardTitle>Organic Card</CardTitle>
              <CardDescription>
                Card with subtle rotation and organic hover effects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                Notice the slight rotation and how it straightens when you hover. 
                This gives a natural, organic feel.
              </p>
            </CardContent>
            <CardFooter>
              <button className="btn-accent text-sm">
                Explore
              </button>
            </CardFooter>
          </Card>

          {/* Minimal Card */}
          <Card variant="minimal" onClick={() => handleCardClick('Minimal')}>
            <CardHeader>
              <CardTitle>Minimal Card</CardTitle>
              <CardDescription>
                Clean card without borders or shadows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                Minimal variant with transparent background and no shadows.
                Perfect for subtle content.
              </p>
            </CardContent>
            <CardFooter>
              <button className="btn-secondary text-sm">
                Learn More
              </button>
            </CardFooter>
          </Card>

        </div>
      </section>

      {/* Shadow Variations */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Shadow Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card variant="default" shadow="sm">
            <CardHeader>
              <CardTitle className="text-lg">Small Shadow</CardTitle>
              <CardDescription>Subtle shadow for minimal elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">shadow="sm"</p>
            </CardContent>
          </Card>

          <Card variant="default" shadow="md">
            <CardHeader>
              <CardTitle className="text-lg">Medium Shadow</CardTitle>
              <CardDescription>Standard shadow for most use cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">shadow="md" (default)</p>
            </CardContent>
          </Card>

          <Card variant="default" shadow="lg">
            <CardHeader>
              <CardTitle className="text-lg">Large Shadow</CardTitle>
              <CardDescription>Prominent shadow for important content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">shadow="lg"</p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Organic Card Grid - Testing Alternating Rotation */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Organic Grid Pattern</h3>
        <p className="text-sm text-af-primary mb-4">
          Notice how organic cards automatically alternate rotation direction in a grid layout.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {Array.from({ length: 8 }, (_, i) => (
            <Card 
              key={i}
              variant="organic" 
              rotation="subtle"
              onClick={() => handleCardClick(`Grid Item ${i + 1}`)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Card {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-af-primary">
                  {i % 2 === 0 ? 'Rotates left' : 'Rotates right'}
                </p>
              </CardContent>
            </Card>
          ))}

        </div>
      </section>

      {/* Interactive States */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Interactive States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card variant="organic" hover={true}>
            <CardHeader>
              <CardTitle className="text-lg">Hover Enabled</CardTitle>
              <CardDescription>Card with hover animations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                Hover to see lift effect and rotation correction.
              </p>
            </CardContent>
          </Card>

          <Card variant="organic" hover={false}>
            <CardHeader>
              <CardTitle className="text-lg">Hover Disabled</CardTitle>
              <CardDescription>Static card without hover effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                This card maintains its rotation and doesn't animate on hover.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Accessibility Testing */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Accessibility Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card onClick={() => handleCardClick('Keyboard Accessible')}>
            <CardHeader>
              <CardTitle className="text-lg">Keyboard Navigation</CardTitle>
              <CardDescription>Try tabbing to this card and pressing Enter</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                Cards with onClick handlers are keyboard accessible with 
                focus rings and Enter/Space key support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Non-Interactive</CardTitle>
              <CardDescription>Static card without interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-af-primary">
                Cards without onClick handlers don't receive focus or 
                interactive styling.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

    </div>
  );
}

export default CardTest;