'use client';

import { useEffect, useState } from 'react';

interface ServerEnvTest {
  hasAirtableToken: boolean;
  hasAirtableBaseId: boolean;
  tokenPrefix: string;
  baseIdPrefix: string;
  nodeEnv: string;
}

export function EnvDebug() {
  const [serverEnv, setServerEnv] = useState<ServerEnvTest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testServerEnv() {
      try {
        const response = await fetch('/api/test-env');
        const result = await response.json();
        setServerEnv(result.serverSide);
      } catch (error) {
        console.error('Failed to test server environment:', error);
      } finally {
        setLoading(false);
      }
    }
    
    testServerEnv();
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-af-md">
      <h3 className="font-semibold text-yellow-800 mb-2">Environment Debug (Dev Only)</h3>
      
      {/* Client-side environment */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Client-side (Browser):</h4>
        <div className="text-sm space-y-1">
          <p>
            <strong>AIRTABLE_API_TOKEN:</strong> {' '}
            <span className="text-red-600">❌ Not found (expected - security)</span>
          </p>
          <p>
            <strong>AIRTABLE_BASE_ID:</strong> {' '}
            <span className="text-red-600">❌ Not found (expected - security)</span>
          </p>
          <p>
            <strong>NEXT_PUBLIC_APP_URL:</strong> {' '}
            <span className={process.env.NEXT_PUBLIC_APP_URL ? 'text-green-600' : 'text-red-600'}>
              {process.env.NEXT_PUBLIC_APP_URL || '❌ Not found'}
            </span>
          </p>
        </div>
      </div>

      {/* Server-side environment test */}
      <div>
        <h4 className="font-medium text-sm mb-2">Server-side (API Routes):</h4>
        {loading ? (
          <div className="text-sm text-gray-600">⏳ Testing server environment...</div>
        ) : serverEnv ? (
          <div className="text-sm space-y-1">
            <p>
              <strong>AIRTABLE_API_TOKEN:</strong> {' '}
              <span className={serverEnv.hasAirtableToken ? 'text-green-600' : 'text-red-600'}>
                {serverEnv.hasAirtableToken ? 
                  `✅ Found (${serverEnv.tokenPrefix})` : 
                  '❌ Not found'
                }
              </span>
            </p>
            <p>
              <strong>AIRTABLE_BASE_ID:</strong> {' '}
              <span className={serverEnv.hasAirtableBaseId ? 'text-green-600' : 'text-red-600'}>
                {serverEnv.hasAirtableBaseId ? 
                  `✅ Found (${serverEnv.baseIdPrefix})` : 
                  '❌ Not found'
                }
              </span>
            </p>
            <p>
              <strong>NODE_ENV:</strong> {serverEnv.nodeEnv}
            </p>
          </div>
        ) : (
          <div className="text-sm text-red-600">❌ Failed to test server environment</div>
        )}
      </div>

      {(!serverEnv?.hasAirtableToken || !serverEnv?.hasAirtableBaseId) && !loading && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-sm">
            <strong>Server missing environment variables!</strong> Check your .env.local file:
          </p>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
{`AIRTABLE_API_TOKEN=pat_your_token_here
AIRTABLE_BASE_ID=app_your_base_id_here
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
          </pre>
          <p className="text-xs mt-2 text-red-700">
            File should be in project root. Restart dev server after changes.
          </p>
        </div>
      )}
    </div>
  );
}

export default EnvDebug;