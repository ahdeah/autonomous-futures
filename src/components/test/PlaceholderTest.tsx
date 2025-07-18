'use client';

import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getMetadataFallback, hasAccessLink, hasRealImage } from '@/lib/placeholders';
import type { CulturalText } from '@/types';

export function PlaceholderTest() {
  // Create sample cultural texts representing different genres and missing data scenarios
  const sampleTexts: CulturalText[] = [
    {
      id: 'test-afrofuturist',
      Title: 'Binti Series',
      title: 'Binti Series',
      By: 'Nnedi Okorafor',
      author: 'Nnedi Okorafor',
      Genres: 'Afrofuturist',
      genre: 'Afrofuturist',
      Medium: 'Book',
      medium: 'Book',
      Country: 'Nigeria',
      country: 'Nigeria',
      Year: 2015,
      year: 2015,
      // Image missing (89% scenario)
      Links: 'https://example.com',
      links: 'https://example.com'
    },
    {
      id: 'test-feminist',
      Title: 'The Left Hand of Darkness',
      title: 'The Left Hand of Darkness', 
      By: 'Ursula K. Le Guin',
      author: 'Ursula K. Le Guin',
      Genres: 'Feminist Futurist',
      genre: 'Feminist Futurist',
      Medium: 'Book',
      medium: 'Book',
      // Country missing (20% scenario)
      Year: 1969,
      year: 1969,
      // Image missing, Links missing (40% scenario)
    },
    {
      id: 'test-indigenous',
      Title: 'Trail of Lightning',
      title: 'Trail of Lightning',
      By: 'Rebecca Roanhorse',
      author: 'Rebecca Roanhorse',
      Genres: 'Indigenous',
      genre: 'Indigenous',
      Medium: 'Book',
      medium: 'Book',
      Country: 'United States',
      country: 'United States',
      Year: 2018,
      year: 2018,
      // Image missing, has access link
      Links: 'https://example.com',
      links: 'https://example.com'
    },
    {
      id: 'test-film',
      Title: 'Black Panther',
      title: 'Black Panther',
      By: 'Ryan Coogler',
      author: 'Ryan Coogler',
      Genres: 'Afrofuturist',
      genre: 'Afrofuturist',
      Medium: 'Film',
      medium: 'Film',
      Country: 'United States',
      country: 'United States',
      Year: 2018,
      year: 2018,
      // Image missing
      Links: 'https://example.com',
      links: 'https://example.com'
    },
    {
      id: 'test-solarpunk',
      Title: 'New York 2140',
      title: 'New York 2140',
      By: 'Kim Stanley Robinson',
      author: 'Kim Stanley Robinson',
      Genres: 'Solarpunk',
      genre: 'Solarpunk',
      Medium: 'Book',
      medium: 'Book',
      Country: 'United States',
      country: 'United States',
      Year: 2017,
      year: 2017,
      // Image missing, Links missing
    },
    {
      id: 'test-minimal-data',
      Title: 'Untitled Future Work',
      title: 'Untitled Future Work',
      // Most data missing - extreme scenario
      Genres: 'Asian Futurist',
      genre: 'Asian Futurist',
      Medium: 'Mixed Media',
      medium: 'Mixed Media'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-heading text-af-charcoal mb-2">
          Placeholder Image System
        </h2>
        <p className="text-af-primary max-w-2xl mx-auto">
          Handling 89% missing images with beautiful, genre-specific placeholders. 
          Each placeholder is generated dynamically based on cultural context and content type.
        </p>
      </div>

      {/* Genre Showcase */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Genre-Based Placeholders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleTexts.map((text) => (
            <div key={text.id} className="card-organic p-4">
              {/* Placeholder Image */}
              <PlaceholderImage 
                text={text}
                className="rounded-af-md mb-4"
                size="md"
              />
              
              {/* Content */}
              <div className="space-y-2">
                <h4 className="font-semibold text-af-charcoal">
                  {text.title}
                </h4>
                
                <div className="text-sm text-af-primary space-y-1">
                  <p>
                    <strong>Author:</strong> {' '}
                    {getMetadataFallback('author', text.author)}
                  </p>
                  <p>
                    <strong>Genre:</strong> {' '}
                    {getMetadataFallback('genre', text.genre)}
                  </p>
                  <p>
                    <strong>Medium:</strong> {' '}
                    {getMetadataFallback('medium', text.medium)}
                  </p>
                  <p>
                    <strong>Country:</strong> {' '}
                    {getMetadataFallback('country', text.country)}
                  </p>
                  <p>
                    <strong>Year:</strong> {' '}
                    {text.year ? text.year.toString() : getMetadataFallback('year')}
                  </p>
                </div>

                {/* Status indicators */}
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    hasRealImage(text) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {hasRealImage(text) ? '✅ Image' : '❌ No Image'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    hasAccessLink(text) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {hasAccessLink(text) ? '✅ Link' : '❌ No Link'}
                  </span>
                </div>

                {/* Action button */}
                <div className="mt-4">
                  {hasAccessLink(text) ? (
                    <button className="btn-accent text-sm w-full">
                      Access Online
                    </button>
                  ) : (
                    <button className="btn-disabled text-sm w-full">
                      Find Online (Coming Soon)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Variations */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Size Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <div key={size} className="text-center">
              <PlaceholderImage 
                text={sampleTexts[0]}
                size={size as 'sm' | 'md' | 'lg' | 'xl'}
                className="rounded-af-md mb-2 mx-auto"
              />
              <p className="text-sm text-af-primary capitalize">{size} Size</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aspect Ratio Examples */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-charcoal">Medium-Based Aspect Ratios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book (3:4 portrait) */}
          <div className="text-center">
            <PlaceholderImage 
              text={sampleTexts[0]} // Book
              className="rounded-af-md mb-2 mx-auto max-w-48"
              size="lg"
            />
            <p className="text-sm text-af-primary">Book (3:4 Portrait)</p>
          </div>

          {/* Film (16:9) */}
          <div className="text-center">
            <PlaceholderImage 
              text={sampleTexts[3]} // Film
              className="rounded-af-md mb-2 mx-auto"
              size="md"
            />
            <p className="text-sm text-af-primary">Film (16:9)</p>
          </div>

          {/* Mixed Media (4:3) */}
          <div className="text-center">
            <PlaceholderImage 
              text={sampleTexts[5]} // Mixed Media
              className="rounded-af-md mb-2 mx-auto"
              size="md"
            />
            <p className="text-sm text-af-primary">Mixed Media (4:3)</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="p-6 bg-af-light-sage rounded-af-lg">
        <h3 className="text-subheading text-af-charcoal mb-4">Missing Data Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-af-sage">89%</div>
            <div className="text-sm text-af-primary">Missing Images</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-af-golden">40%</div>
            <div className="text-sm text-af-primary">Missing Links</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-af-primary">20%</div>
            <div className="text-sm text-af-primary">Missing Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-af-charcoal">8</div>
            <div className="text-sm text-af-primary">Genre Placeholders</div>
          </div>
        </div>
        <p className="text-sm text-af-primary mt-4 text-center">
          Our placeholder system ensures no broken layouts or empty states, 
          turning missing data into an opportunity for beautiful, culturally-aware design.
        </p>
      </section>
    </div>
  );
}

export default PlaceholderTest;