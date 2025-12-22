import Link from 'next/link';
import { getRequestCounts } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, TrendingUp, Activity } from 'lucide-react';

export const revalidate = 5;

export default async function StatsPage() {
  const stats = await getRequestCounts();
  const totalRequests = stats.reads + stats.writes + stats.functions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto p-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-10 w-10" />
            Statistics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Detailed analytics of ISR requests across your application
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRequests}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Read Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.reads}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalRequests > 0 ? ((stats.reads / totalRequests) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Write Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.writes}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalRequests > 0 ? ((stats.writes / totalRequests) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Function Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.functions}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {totalRequests > 0 ? ((stats.functions / totalRequests) * 100).toFixed(1) : 0}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Breakdown by Page
            </CardTitle>
            <CardDescription>
              View request counts for each individual page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.byPage).map(([page, counts]) => {
                const pageTotal = counts.reads + counts.writes + counts.functions;
                return (
                  <div key={page} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-xl">{page}</h3>
                      <div className="text-sm text-slate-500">
                        Total: <span className="font-bold text-lg">{pageTotal}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Reads</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {counts.reads}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {pageTotal > 0 ? ((counts.reads / pageTotal) * 100).toFixed(0) : 0}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Writes</div>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {counts.writes}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {pageTotal > 0 ? ((counts.writes / pageTotal) * 100).toFixed(0) : 0}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Functions</div>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          {counts.functions}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {pageTotal > 0 ? ((counts.functions / pageTotal) * 100).toFixed(0) : 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {Object.keys(stats.byPage).length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">
                    No data available yet. Navigate to pages to start tracking requests.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              This application demonstrates Next.js Incremental Static Regeneration (ISR) with
              request tracking. Each page has a different revalidation period:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Page 1:</strong> 10-second revalidation (tracks read requests)</li>
              <li><strong>Page 2:</strong> 15-second revalidation (tracks write requests)</li>
              <li><strong>Page 3:</strong> 20-second revalidation (tracks function requests)</li>
              <li><strong>Stats Page:</strong> 5-second revalidation (fastest updates)</li>
              <li><strong>Home Page:</strong> 10-second revalidation</li>
            </ul>
            <p className="bg-slate-100 dark:bg-slate-800 rounded p-4 mt-4">
              Each time a page is regenerated after its revalidation period, a request is
              logged to the Supabase database. This allows you to monitor how often your
              ISR pages are being regenerated in production.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
