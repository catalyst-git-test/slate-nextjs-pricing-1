import Link from 'next/link';
import { trackRequest } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, FileText } from 'lucide-react';

export const revalidate = 10;

export default async function Page1() {
  await trackRequest('read', 'page1');

  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900">
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
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-3xl">Page 1 - Read Operations</CardTitle>
                <CardDescription>ISR-enabled page tracking read requests</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Page Information
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Request Type:</strong> Read</p>
                <p><strong>Revalidation:</strong> 10 seconds</p>
                <p><strong>Last Generated:</strong> {timestamp}</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              This page demonstrates ISR with read request tracking. Every time this page is
              accessed and regenerated (after the 10-second revalidation period), a read request
              is logged to the database.
            </p>

            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Try refreshing this page after 10 seconds to trigger a revalidation and see the
                read count increase on the home page.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/page2">
            <Button className="w-full h-16" variant="outline">
              Go to Page 2
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
