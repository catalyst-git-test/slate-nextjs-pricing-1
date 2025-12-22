import Link from 'next/link';
import { getRequestCounts } from '@/lib/supabase';
import { BarChart3, FileText, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const revalidate = 10;

export default async function HomePage() {
  const stats = await getRequestCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-slate-100">
            Next.js ISR Request Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor and track Incremental Static Regeneration requests across your application
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Read Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.reads}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Write Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.writes}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Function Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.functions}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>
              Click buttons to navigate between ISR pages and trigger tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/page1">
                <Button className="w-full h-24" variant="outline">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Page 1</span>
                  </div>
                </Button>
              </Link>
              <Link href="/page2">
                <Button className="w-full h-24" variant="outline">
                  <div className="flex flex-col items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Page 2</span>
                  </div>
                </Button>
              </Link>
              <Link href="/page3">
                <Button className="w-full h-24" variant="outline">
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="h-6 w-6" />
                    <span>Page 3</span>
                  </div>
                </Button>
              </Link>
              <Link href="/stats">
                <Button className="w-full h-24" variant="default">
                  <div className="flex flex-col items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>Stats Dashboard</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.byPage).map(([page, counts]) => (
                <div key={page} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 text-lg">{page}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Reads</div>
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {counts.reads}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Writes</div>
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">
                        {counts.writes}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600 dark:text-slate-400">Functions</div>
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        {counts.functions}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(stats.byPage).length === 0 && (
                <p className="text-center text-slate-500 py-8">
                  No requests tracked yet. Navigate to pages to start tracking.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>ISR Revalidation: 10 seconds</p>
        </div>
      </div>
    </div>
  );
}
