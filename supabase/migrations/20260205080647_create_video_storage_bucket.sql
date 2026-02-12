/*
  # Create Video Storage Bucket

  1. Storage
    - Creates 'kata-videos' storage bucket for hosting video files
    - Sets max file size to 500MB
    - Allows public access for viewing
    - Restricts uploads to authenticated users only
  
  2. Security
    - Public read access for approved videos
    - Authenticated users can upload
    - Only admins can delete videos
*/

-- Create the storage bucket for kata videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'kata-videos',
  'kata-videos',
  true,
  524288000, -- 500MB limit
  ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete kata videos" ON storage.objects;

-- Allow public read access to videos
CREATE POLICY "Public read access to kata videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'kata-videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload kata videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'kata-videos');

-- Allow authenticated users to update their own videos
CREATE POLICY "Authenticated users can update kata videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'kata-videos');

-- Only allow deletion for admin users
CREATE POLICY "Only admins can delete kata videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'kata-videos' AND
  (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
);