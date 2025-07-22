// src/components/debug/ComponentDebugger.tsx
'use client';

interface ComponentDebuggerProps {
  componentName: string;
  data: Record<string, any>;
}

/**
 * A visual debugger component for development environments.
 * Renders a fixed overlay showing the props, state, or computed data of a component.
 */
export function ComponentDebugger({ componentName, data }: ComponentDebuggerProps) {
  // This component will only render in the development environment
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-md text-xs max-w-xs z-50 opacity-80 hover:opacity-100 transition-opacity"
      onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling up to parent components
    >
      <h3 className="font-bold mb-1 border-b border-gray-500 pb-1">🐛 {componentName}</h3>
      <pre className="text-xs whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}