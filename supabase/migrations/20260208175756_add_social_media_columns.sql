/*
  # Add Social Media Upload Tracking

  1. Changes
    - Add columns to track social media uploads:
      - `facebook_url` (text) - URL of the Facebook post
      - `instagram_url` (text) - URL of the Instagram post
      - `youtube_url` (text) - URL of the YouTube video
      - `social_media_uploaded_at` (timestamptz) - When the video was uploaded to social media
      - `social_media_upload_error` (text) - Any errors during upload
    
  2. Notes
    - These fields track automatic uploads to social media platforms
    - NULL values indicate the video hasn't been uploaded yet
    - Errors are stored for debugging purposes
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE submissions ADD COLUMN facebook_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE submissions ADD COLUMN instagram_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'youtube_url'
  ) THEN
    ALTER TABLE submissions ADD COLUMN youtube_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'social_media_uploaded_at'
  ) THEN
    ALTER TABLE submissions ADD COLUMN social_media_uploaded_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'social_media_upload_error'
  ) THEN
    ALTER TABLE submissions ADD COLUMN social_media_upload_error text;
  END IF;
END $$;