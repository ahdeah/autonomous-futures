// src/app/page.tsx
import HomepageHero from '@/components/homepage/HomepageHero';
import ProgressiveDisclosure from '@/components/homepage/ProgressiveDisclosure';

export default function Home() {
  return (
    <main className="min-h-screen bg-af-background">
      {/* Homepage Hero Section */}
      <HomepageHero />
      {/* Progressive Disclosure Section */}
      <ProgressiveDisclosure />
    </main>
  );
}