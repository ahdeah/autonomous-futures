/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/search/GlobalSearch.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearch } from '@/hooks/use-airtable-data';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { Search, X } from 'lucide-react';

// --- Helper Functions (No Changes) ---
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
                return `/principles/${firstPrincipleId}#${item.id}`;
            }
            return '/principles';
        default:
            return '/';
    }
}

// --- Main Unified Component ---
export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const { data: results, isLoading } = useSearch(debouncedQuery);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (url: string) => {
    setIsModalOpen(false);
    setIsFocused(false);
    setQuery('');
    router.push(url);
  };

  // JSX for the results list, to be reused
  const SearchResultsList = () => (
    // Added overflow-hidden to the main container to be safe
    <div className="absolute top-full mt-2 w-full md:w-96 max-h-[70vh] overflow-y-auto overflow-x-hidden bg-white rounded-b-af-lg shadow-af-lg border z-50">
      {isLoading && <div className="p-4 text-sm text-gray-500">Searching...</div>}
      {!isLoading && !results?.length && debouncedQuery && (
        <div className="p-4 text-sm text-gray-500">No results found for &quot;{debouncedQuery}&quot;.</div>
      )}
      {!isLoading && results && results.length > 0 && Object.entries(Object.groupBy(results, (item: any) => item.type)).map(([type, items]) => (
        <div key={type}>
          <h3 className="text-sm font-semibold capitalize p-3 bg-gray-50 border-b">{type}s</h3>
          <ul>
            {(items as any[]).map((item: any) => (
              <li key={item.id} className="border-b last:border-b-0">
                <button
                  onClick={() => handleNavigate(getResultUrl(item))}
                  className="block w-full text-left p-3 hover:bg-af-light-sage"
                >
                  <p className="font-semibold text-af-charcoal">{item.title || item.Title}</p>
                  {/* --- Start of Correction --- */}
                  {/* Restored the "truncate" class */}
                  <p className="text-xs text-af-primary truncate">{item.description || item.Content}</p>
                  {/* --- End of Correction --- */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* --- Desktop Search Bar --- */}
      <div className="hidden md:block" ref={searchContainerRef}>
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
        {isFocused && query.length > 2 && <SearchResultsList />}
      </div>

      {/* --- Mobile Search Button --- */}
      <div className="flex md:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-af-primary"
          onClick={() => {
            setIsFocused(true);
            setIsModalOpen(true);
          }}
        >
          <span className="sr-only">Search</span>
          <Search className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* --- Mobile Search Modal --- */}
      <Dialog as="div" className="md:hidden" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 z-40 bg-black/30" aria-hidden="true" />
        {/* --- Start of Correction --- */}
        {/* Changed positioning from inset-x-0 to inset-x-4 and added top margin and border radius */}
        <Dialog.Panel className="fixed inset-x-4 top-4 z-50 bg-af-background rounded-af-lg shadow-lg">
          <div ref={searchContainerRef}>
            <div className="relative p-4">
        {/* --- End of Correction --- */}
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-af-placeholder-text" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-af-md bg-af-warm-white focus:ring-af-sage focus:border-af-sage transition-all"
              />
               <button
                  type="button"
                  className="absolute top-1/2 right-7 -translate-y-1/2 text-af-primary"
                  onClick={() => setQuery('')}
                >
                  <span className="sr-only">Clear search</span>
                  <X className="h-6 w-6" />
                </button>
            </div>
            {/* The absolute positioning of SearchResultsList will be relative to this Dialog.Panel */}
            {query.length > 2 && <SearchResultsList />}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}