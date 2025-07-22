// src/components/search/GlobalSearch.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearch } from '@/hooks/use-airtable-data';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const getResultUrl = (item: any): string => {
    switch (item.type) {
        case 'principle':
            return `/principles/${item.id}`;
        case 'text':
            return `/cultural-texts/${item.id}`;
        case 'recommendation':
            if (item.principles && item.principles.length > 0) {
                const firstPrincipleId = item.principles[0];
                return `/principles/${firstPrincipleId}`;
            }
            return '/principles';
        default:
            return '/';
    }
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const { data: results, isLoading } = useSearch(debouncedQuery);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const groupedResults = results
    ?
    Object.groupBy(results, (item: any) => item.type)
    : {};
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // MODIFIED: Added a handler to reset the search state on link click.
  const handleResultClick = () => {
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-af-placeholder-text" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full md:w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-af-md bg-af-warm-white focus:ring-af-sage focus:border-af-sage transition-all"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-af-primary hover:text-af-charcoal">
            <X size={20} />
          </button>
        )}
      </div>
      {isFocused && query.length > 2 && (
        <div className="absolute top-full mt-2 w-96 max-h-[70vh] overflow-y-auto bg-white rounded-af-lg shadow-af-lg border z-50">
          {isLoading && <div className="p-4 text-sm text-gray-500">Searching...</div>}
          {!isLoading && !results?.length && debouncedQuery && (
            <div className="p-4 text-sm text-gray-500">No results found for "{debouncedQuery}".</div>
          )}
          {!isLoading && results && results.length > 0 && Object.entries(groupedResults).map(([type, items]) => (
            <div key={type}>
              <h3 className="text-sm font-semibold capitalize p-3 bg-gray-50 border-b">{type}s</h3>
              <ul>
                {(items as any[]).map((item: any) => (
                  <li key={item.id} className="border-b last:border-b-0">
                    {/* MODIFIED: Added the onClick handler to the Link component. */}
                    <Link
                      href={getResultUrl(item)}
                      className="block p-3 hover:bg-af-light-sage"
                      onClick={handleResultClick}
                    >
                      <p className="font-semibold text-af-charcoal">{item.title || item.Title}</p>
                      <p className="text-xs text-af-primary truncate">{item.description || item.Content}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}