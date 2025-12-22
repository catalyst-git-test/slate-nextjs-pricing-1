import Link from 'next/link';
import { trackRequest } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, BarChart3 } from 'lucide-react';

export const revalidate = 15;

export default async function Page2() {
  await trackRequest('write', 'page2');

  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto p-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-3xl">Page 2 - Write Operations</CardTitle>
                <CardDescription>ISR-enabled page tracking write requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Page Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Request Type:</strong> Write</p>
                <p><strong>Revalidation:</strong> 15 seconds</p>
                <p><strong>Last Generated:</strong> {timestamp}</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              This page demonstrates ISR with write request tracking. It has a different
              revalidation period (15 seconds) compared to other pages. Each regeneration
              logs a write request to the database.
            </p>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This page revalidates every 15 seconds, allowing you to see how different
                revalidation periods affect request tracking.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/page1">
            <Button className="w-full h-16" variant="outline">
              Go to Page 1
            </Button>
          </Link>
          <Link href="/page3">
            <Button className="w-full h-16" variant="outline">
              Go to Page 3
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
