/*
  # Fix Video Upload RLS Policy

  1. Problem
    - Current policy requires youtube_url to be present
    - This blocks direct video file uploads
    - Users get "An error occurred" when uploading videos

  2. Solution
    - Update policy to accept EITHER youtube_url OR video_file_path
    - At least one must be provided
    - Maintain all other validations

  3. Security
    - Still validates YouTube URLs when provided
    - Still validates level range (1-15)
    - Still requires status to be 'pending'
    - Allows both submission methods
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Public can create valid submissions" ON submissions;

-- Create new policy that accepts either YouTube URL or uploaded video
CREATE POLICY "Public can create valid submissions"
ON submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Must have either YouTube URL or video file path
  (
    (
      youtube_url IS NOT NULL AND 
      length(TRIM(youtube_url)) > 0 AND 
      (youtube_url LIKE '%youtube.com%' OR youtube_url LIKE '%youtu.be%')
    )
    OR
    (
      video_file_path IS NOT NULL AND 
      length(TRIM(video_file_path)) > 0
    )
  )
  AND
  -- Level must be valid
  level >= 1 AND 
  level <= 15 AND
  -- Status must be pending for new submissions
  status = 'pending'
);
