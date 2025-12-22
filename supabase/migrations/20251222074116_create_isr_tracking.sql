/*
  # ISR Request Tracking Schema

  1. New Tables
    - `isr_requests`
      - `id` (uuid, primary key)
      - `request_type` (text) - 'read', 'write', or 'function'
      - `page` (text) - the page that was accessed
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `isr_requests` table
    - Add policy for public read access
    - Add policy for public insert access (to track requests)
*/

CREATE TABLE IF NOT EXISTS isr_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL,
  page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE isr_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read request data"
  ON isr_requests FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert request data"
  ON isr_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);