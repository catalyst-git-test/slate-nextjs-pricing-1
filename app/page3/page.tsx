import Link from 'next/link';
import { trackRequest } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, Settings } from 'lucide-react';

export const revalidate = 20;

export default async function Page3() {
  await trackRequest('function', 'page3');

  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-slate-900">
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
              <Settings className="h-8 w-8 text-orange-600" />
              <div>
                <CardTitle className="text-3xl">Page 3 - Function Calls</CardTitle>
                <CardDescription>ISR-enabled page tracking function requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Page Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Request Type:</strong> Function</p>
                <p><strong>Revalidation:</strong> 20 seconds</p>
                <p><strong>Last Generated:</strong> {timestamp}</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              This page demonstrates ISR with function request tracking. It has the longest
              revalidation period (20 seconds) among all pages. Each regeneration logs a
              function request to the database.
            </p>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The longer revalidation period means this page will regenerate less frequently,
                resulting in fewer tracked requests over time.
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
          <Link href="/page2">
            <Button className="w-full h-16" variant="outline">
              Go to Page 2
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
