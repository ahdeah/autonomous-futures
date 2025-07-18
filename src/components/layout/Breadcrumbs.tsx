// src/components/layout/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-af-primary">
        <li>
          <Link href="/" className="hover:text-af-charcoal">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight size={16} className="text-af-placeholder-text" />
            <Link
              href={item.href}
              className={index === items.length - 1 ? 'font-medium text-af-charcoal' : 'hover:text-af-charcoal'}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;