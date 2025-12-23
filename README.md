# Next.js ISR Request Tracker

A Next.js application demonstrating Incremental Static Regeneration (ISR) with request tracking using Supabase.

## Features

- **ISR Pages**: Multiple pages with different revalidation periods
- **Request Tracking**: Automatically tracks read, write, and function requests to Supabase
- **Real-time Statistics**: Dashboard showing request counts and breakdowns
- **Navigation**: Simple button-based routing between pages

## Pages Overview

- **Home (`/`)**: Main dashboard with navigation and statistics (10s revalidation)
- **Page 1 (`/page1`)**: Tracks READ requests (10s revalidation)
- **Page 2 (`/page2`)**: Tracks WRITE requests (15s revalidation)
- **Page 3 (`/page3`)**: Tracks FUNCTION requests (20s revalidation)
- **Stats (`/stats`)**: Detailed statistics dashboard (5s revalidation)

## How It Works

Each ISR page has a `revalidate` period. When a page is accessed after its revalidation period expires:

1. Next.js regenerates the page
2. A request is logged to Supabase with the type (read/write/function) and page name
3. The statistics are updated and visible on the home page and stats dashboard
4. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z2ZkZGx5bHlnZGhudm5wdXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzODUzOTQsImV4cCI6MjA4MTk2MTM5NH0.EvgkVhVUBwrp9QIAH5huus7sjpTswkRfjJFlB0O55LQ

## Database Schema

The app uses a single `isr_requests` table in Supabase:

```sql
CREATE TABLE isr_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL,  -- 'read', 'write', or 'function'
  page text NOT NULL,           -- page name (e.g., 'page1')
  created_at timestamptz DEFAULT now()
);
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (already configured in `.env`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)
5. https://gtgfddlylygdhnvnputv.supabase.co

## Testing ISR

1. Navigate to any page (Page 1, 2, or 3)
2. Wait for the revalidation period to expire
3. Refresh the page
4. Return to the home page or stats dashboard to see updated counts

## Technology Stack

- **Next.js 13+**: App Router with ISR
- **Supabase**: Database and real-time data
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **Lucide React**: Icons

## Revalidation Periods

- Home: 10 seconds
- Page 1: 10 seconds
- Page 2: 15 seconds
- Page 3: 20 seconds
- Stats: 5 seconds (fastest updates)

This allows you to see different regeneration frequencies and how they affect request tracking.


NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
