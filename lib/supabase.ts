import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function trackRequest(requestType: 'read' | 'write' | 'function', page: string) {
  try {
    const { error } = await supabase
      .from('isr_requests')
      .insert({ request_type: requestType, page });

    if (error) {
      console.error('Error tracking request:', error);
    }
  } catch (err) {
    console.error('Error tracking request:', err);
  }
}

export async function getRequestCounts() {
  try {
    const { data, error } = await supabase
      .from('isr_requests')
      .select('request_type, page');

    if (error) {
      console.error('Error fetching requests:', error);
      return { reads: 0, writes: 0, functions: 0, byPage: {} };
    }

    const counts = {
      reads: 0,
      writes: 0,
      functions: 0,
      byPage: {} as Record<string, { reads: number; writes: number; functions: number }>
    };

    data?.forEach(req => {
      if (req.request_type === 'read') counts.reads++;
      if (req.request_type === 'write') counts.writes++;
      if (req.request_type === 'function') counts.functions++;

      if (!counts.byPage[req.page]) {
        counts.byPage[req.page] = { reads: 0, writes: 0, functions: 0 };
      }
      if (req.request_type === 'read') counts.byPage[req.page].reads++;
      if (req.request_type === 'write') counts.byPage[req.page].writes++;
      if (req.request_type === 'function') counts.byPage[req.page].functions++;
    });

    return counts;
  } catch (err) {
    console.error('Error fetching requests:', err);
    return { reads: 0, writes: 0, functions: 0, byPage: {} };
  }
}
