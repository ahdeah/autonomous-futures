'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    variant = 'default',
    hover = true,
    rotation = 'subtle',
    shadow = 'md',
    className,
    onClick,
    ...props 
  }, ref) => {
    // Base card styles
    const baseStyles = cn(
      // Layout and spacing
      'relative overflow-hidden bg-af-warm-white rounded-af-lg',
      // Transition for smooth animations
      'transition-all duration-af-normal ease-out',
      // Cursor behavior
      onClick && 'cursor-pointer',
      // Focus styles for accessibility
      onClick && 'focus:outline-none focus:ring-2 focus:ring-af-sage focus:ring-offset-2'
    );

    // Variant-specific styles with explicit typing
    const variantStyles: Record<'default' | 'organic' | 'minimal', string> = {
      default: cn(
        'border border-gray-100',
        shadow === 'sm' && 'shadow-af-sm',
        shadow === 'md' && 'shadow-af-md', 
        shadow === 'lg' && 'shadow-af-lg'
      ),
      organic: cn(
        'border border-gray-100',
        shadow === 'sm' && 'shadow-af-sm',
        shadow === 'md' && 'shadow-af-md',
        shadow === 'lg' && 'shadow-af-lg',
        // Organic rotation - alternates based on position
        rotation === 'subtle' && 'card-organic-rotation',
      ),
      minimal: cn(
        'border-0 shadow-none',
        'bg-transparent'
      )
    };

    // Hover styles
    const hoverStyles = hover ? cn(
      'hover:shadow-af-lg hover:-translate-y-1',
      // For organic cards, straighten rotation on hover
      variant === 'organic' && rotation === 'subtle' && 'hover:rotate-0'
    ) : '';

    const cardClasses = cn(
      baseStyles,
      variantStyles[variant || 'default'],
      hoverStyles,
      className
    );

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Additional compound components for common patterns
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight text-af-charcoal', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-af-primary', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;