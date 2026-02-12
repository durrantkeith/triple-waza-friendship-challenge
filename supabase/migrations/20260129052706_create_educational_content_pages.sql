/*
  # Create Educational Content Pages

  1. New Tables
    - `educational_pages`
      - `id` (uuid, primary key)
      - `page_type` (text) - One of: 'judo_techniques', 'training_tips', 'safety_guidelines', 'kata_standards'
      - `title` (text) - Page title
      - `description` (text) - Page description
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `educational_content_sections`
      - `id` (uuid, primary key)
      - `page_id` (uuid, foreign key to educational_pages)
      - `section_number` (integer) - 1, 2, or 3 for the three windows
      - `section_title` (text) - Title of the section
      - `video_url` (text) - URL to the video
      - `description` (text) - Description of the content
      - `additional_notes` (text) - Any additional information
      - `order_index` (integer) - For sorting
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create educational_pages table
CREATE TABLE IF NOT EXISTS educational_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text UNIQUE NOT NULL CHECK (page_type IN ('judo_techniques', 'training_tips', 'safety_guidelines', 'kata_standards')),
  title text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create educational_content_sections table
CREATE TABLE IF NOT EXISTS educational_content_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES educational_pages(id) ON DELETE CASCADE,
  section_number integer NOT NULL CHECK (section_number >= 1 AND section_number <= 3),
  section_title text NOT NULL,
  video_url text DEFAULT '',
  description text DEFAULT '',
  additional_notes text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_id, section_number)
);

-- Create index for foreign key
CREATE INDEX IF NOT EXISTS idx_educational_content_sections_page_id ON educational_content_sections(page_id);

-- Enable RLS
ALTER TABLE educational_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE educational_content_sections ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Anyone can view educational pages"
  ON educational_pages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view educational content sections"
  ON educational_content_sections FOR SELECT
  TO public
  USING (true);

-- Admin write policies for educational_pages
CREATE POLICY "Authenticated users can insert educational pages"
  ON educational_pages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update educational pages"
  ON educational_pages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete educational pages"
  ON educational_pages FOR DELETE
  TO authenticated
  USING (true);

-- Admin write policies for educational_content_sections
CREATE POLICY "Authenticated users can insert content sections"
  ON educational_content_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update content sections"
  ON educational_content_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete content sections"
  ON educational_content_sections FOR DELETE
  TO authenticated
  USING (true);

-- Insert default page records
INSERT INTO educational_pages (page_type, title, description) VALUES
  ('judo_techniques', 'Judo Techniques', 'Master the fundamental and advanced techniques of judo kata'),
  ('training_tips', 'Training Tips', 'Enhance your practice with expert guidance and proven methods'),
  ('safety_guidelines', 'Safety Guidelines', 'Essential safety practices for kata training and demonstration'),
  ('kata_standards', 'Kata Standards', 'Official standards and requirements for traditional judo kata')
ON CONFLICT (page_type) DO NOTHING;

-- Insert default sections for each page (3 sections per page)
DO $$
DECLARE
  page_record RECORD;
BEGIN
  FOR page_record IN SELECT id, page_type FROM educational_pages LOOP
    INSERT INTO educational_content_sections (page_id, section_number, section_title, description)
    VALUES
      (page_record.id, 1, 'Technique 1', 'Add your first technique demonstration here'),
      (page_record.id, 2, 'Technique 2', 'Add your second technique demonstration here'),
      (page_record.id, 3, 'Technique 3', 'Add your third technique demonstration here')
    ON CONFLICT (page_id, section_number) DO NOTHING;
  END LOOP;
END $$;
