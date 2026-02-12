/*
  # Create Founding Sensei Circle Table
  
  1. New Tables
    - `founders`
      - `id` (uuid, primary key)
      - `name` (text) - Full name of the sensei
      - `title` (text) - Title/rank (e.g., "Sensei", "5th Dan Black Belt")
      - `dojo_name` (text) - Dojo/Club name
      - `city` (text) - City/location
      - `country` (text) - Country they represent
      - `years_teaching` (integer) - Years teaching judo
      - `photo_url` (text) - URL to their profile photo
      - `quote` (text) - Teaching philosophy or quote
      - `is_founding_member` (boolean) - Whether they are a founding member
      - `order_index` (integer) - For custom ordering
      - `created_at` (timestamptz) - When added to the system
  
  2. Security
    - Enable RLS on `founders` table
    - Add policy for public read access (founders are public figures)
    - Add policies for authenticated users to manage founders
*/

-- Create founders table
CREATE TABLE IF NOT EXISTS founders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL DEFAULT '',
  dojo_name text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  years_teaching integer DEFAULT 0,
  photo_url text DEFAULT '',
  quote text DEFAULT '',
  is_founding_member boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;

-- Public read access - founders are public figures
CREATE POLICY "Anyone can view founders"
  ON founders
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users (admins) can insert founders
CREATE POLICY "Authenticated users can insert founders"
  ON founders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users (admins) can update founders
CREATE POLICY "Authenticated users can update founders"
  ON founders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users (admins) can delete founders
CREATE POLICY "Authenticated users can delete founders"
  ON founders
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_founders_order 
ON founders(order_index);

-- Insert sample founding sensei data
INSERT INTO founders (name, title, dojo_name, city, country, years_teaching, photo_url, quote, is_founding_member, order_index)
VALUES
  (
    'Hiroshi Tanaka',
    '7th Dan Black Belt',
    'Tokyo Kodokan Dojo',
    'Tokyo',
    'Japan',
    35,
    '/placeholder-sensei-1.jpg',
    'Through repetition and dedication, we build not just technique, but character.',
    true,
    1
  ),
  (
    'Maria Rodriguez',
    '6th Dan Black Belt',
    'Barcelona Judo Club',
    'Barcelona',
    'Spain',
    28,
    '/placeholder-sensei-2.jpg',
    'Judo teaches us to fall seven times and stand up eight.',
    true,
    2
  ),
  (
    'James Mitchell',
    '5th Dan Black Belt',
    'London Budokwai',
    'London',
    'United Kingdom',
    22,
    '/placeholder-sensei-3.jpg',
    'The way of judo is the way of harmony and mutual respect.',
    true,
    3
  ),
  (
    'Sophie Laurent',
    '6th Dan Black Belt',
    'Paris Judo Academy',
    'Paris',
    'France',
    30,
    '/placeholder-sensei-4.jpg',
    'Every student teaches us as much as we teach them.',
    true,
    4
  )
ON CONFLICT (id) DO NOTHING;
