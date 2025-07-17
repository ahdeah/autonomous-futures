'use client';

import { useCulturalTexts, usePrinciples } from '@/hooks/use-airtable-data';

export function AirtableTest() {
  const { 
    data: culturalTexts, 
    isLoading: textsLoading, 
    error: textsError 
  } = useCulturalTexts({ maxRecords: 3 });
  
  const { 
    data: principles, 
    isLoading: principlesLoading, 
    error: principlesError 
  } = usePrinciples();

  return (
    <div className="space-y-8 p-6 bg-af-warm-white rounded-af-lg shadow-af-md">
      <h2 className="text-heading text-af-charcoal">
        Airtable Connection Test
      </h2>

      {/* Cultural Texts Test */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-primary">
          Cultural Texts (First 3 Records)
        </h3>
        
        {textsLoading && (
          <div className="animate-pulse">
            <div className="h-4 bg-af-placeholder-bg rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-af-placeholder-bg rounded w-1/2"></div>
          </div>
        )}

        {textsError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-af-md">
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {textsError instanceof Error ? textsError.message : 'Unknown error'}
            </p>
          </div>
        )}

        {culturalTexts && culturalTexts.length > 0 && (
          <div className="space-y-3">
            {culturalTexts.map((text) => (
              <div key={text.id} className="p-4 bg-af-light-sage rounded-af-md">
                <h4 className="font-semibold text-af-charcoal">{text.title}</h4>
                <div className="text-sm text-af-primary space-y-1 mt-2">
                  <p><strong>Author:</strong> {text.author || 'Various'}</p>
                  <p><strong>Country:</strong> {text.country || 'Not specified'}</p>
                  <p><strong>Year:</strong> {text.year || 'Date TBD'}</p>
                  <p><strong>Medium:</strong> {text.medium || 'Mixed Media'}</p>
                  <p><strong>Genre:</strong> {text.genre || 'Not specified'}</p>
                  <p><strong>Has Image:</strong> {text.image ? '✅ Yes' : '❌ No (89% missing)'}</p>
                  <p><strong>Has Access Link:</strong> {text.links ? '✅ Yes' : '❌ No (40% missing)'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {culturalTexts && culturalTexts.length === 0 && !textsLoading && (
          <p className="text-af-placeholder-text">No cultural texts found.</p>
        )}
      </section>

      {/* Principles Test */}
      <section className="space-y-4">
        <h3 className="text-subheading text-af-primary">
          Principles Overview
        </h3>
        
        {principlesLoading && (
          <div className="animate-pulse">
            <div className="h-4 bg-af-placeholder-bg rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-af-placeholder-bg rounded w-1/3"></div>
          </div>
        )}

        {principlesError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-af-md">
            <p className="text-red-800 text-sm">
              <strong>Error:</strong> {principlesError instanceof Error ? principlesError.message : 'Unknown error'}
            </p>
          </div>
        )}

        {principles && principles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-af-primary">
              <strong>Total Principles:</strong> {principles.length}
            </p>
            <p className="text-sm text-af-primary">
              <strong>Overarching Themes:</strong> {principles.filter(p => p.isOverarching).length}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {principles.slice(0, 4).map((principle) => (
                <div key={principle.id} className="p-3 bg-af-background rounded-af-md border">
                  <h4 className="font-medium text-af-charcoal text-sm">
                    {principle.isOverarching ? '🌟 ' : ''}
                    {principle.title}
                  </h4>
                  {principle.theme && (
                    <p className="text-xs text-af-placeholder-text mt-1">
                      Theme: {principle.theme}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {principles && principles.length === 0 && !principlesLoading && (
          <p className="text-af-placeholder-text">No principles found.</p>
        )}
      </section>

      {/* Connection Status Summary */}
      <section className="p-4 bg-af-sage bg-opacity-10 rounded-af-md">
        <h3 className="font-semibold text-af-charcoal mb-2">Connection Status</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Cultural Texts:</span>
            <span className={`ml-2 ${textsError ? 'text-red-600' : textsLoading ? 'text-yellow-600' : 'text-green-600'}`}>
              {textsError ? '❌ Error' : textsLoading ? '⏳ Loading' : '✅ Connected'}
            </span>
          </div>
          <div>
            <span className="font-medium">Principles:</span>
            <span className={`ml-2 ${principlesError ? 'text-red-600' : principlesLoading ? 'text-yellow-600' : 'text-green-600'}`}>
              {principlesError ? '❌ Error' : principlesLoading ? '⏳ Loading' : '✅ Connected'}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AirtableTest;