/*
  # Create Video Submissions System

  1. New Tables
    - `dojos`
      - `id` (uuid, primary key)
      - `name` (text) - Dojo name
      - `country` (text) - Country location
      - `city` (text) - City location
      - `email` (text) - Contact email
      - `instructor_name` (text) - Lead instructor
      - `mailing_list` (boolean) - Mailing list subscription
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `submissions`
      - `id` (uuid, primary key)
      - `dojo_id` (uuid, foreign key to dojos)
      - `country` (text) - Submission country
      - `email` (text) - Submitter email
      - `youtube_url` (text) - Video URL
      - `level` (integer) - Challenge level
      - `kata_id` (uuid, nullable) - Reference to kata
      - `kata_set_id` (uuid, nullable) - Reference to kata set
      - `participant_names` (text, nullable) - Names of participants
      - `message` (text, nullable) - Optional message
      - `status` (text) - pending, approved, rejected
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access to approved submissions
    - Add policies for authenticated admin write access
    - Public can insert submissions (anyone can submit)

  3. Indexes
    - Add index on dojo_id foreign key for performance
    - Add index on status for filtering
    - Add index on created_at for sorting
*/

-- Create dojos table
CREATE TABLE IF NOT EXISTS dojos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  instructor_name text DEFAULT '',
  mailing_list boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dojo_id uuid REFERENCES dojos(id) ON DELETE CASCADE,
  country text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  youtube_url text NOT NULL,
  level integer DEFAULT 1,
  kata_id uuid,
  kata_set_id uuid,
  participant_names text,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_submissions_dojo_id ON submissions(dojo_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Enable RLS
ALTER TABLE dojos ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Dojos policies
CREATE POLICY "Public can read dojos"
  ON dojos FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can insert dojos"
  ON dojos FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update dojos"
  ON dojos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Submissions policies
CREATE POLICY "Public can read approved submissions"
  ON submissions FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Public can insert submissions"
  ON submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
  ON submissions FOR DELETE
  TO authenticated
  USING (true);