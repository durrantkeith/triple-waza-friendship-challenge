/*
  # Fix Video Storage for Public Uploads

  1. Changes
    - Update storage policies to allow public uploads (anonymous users)
    - Keep read access public
    - Keep delete restricted to admins only
  
  2. Security
    - Anyone can upload videos (needed for submissions)
    - Anyone can view videos (public gallery)
    - Only admins can delete videos
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public read access to kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update kata videos" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete kata videos" ON storage.objects;

-- Allow public read access to videos
CREATE POLICY "Public can read kata videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'kata-videos');

-- Allow public uploads (for anonymous video submissions)
CREATE POLICY "Public can upload kata videos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'kata-videos');

-- Only allow deletion for admin users
CREATE POLICY "Only admins can delete kata videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'kata-videos' AND
  (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
);