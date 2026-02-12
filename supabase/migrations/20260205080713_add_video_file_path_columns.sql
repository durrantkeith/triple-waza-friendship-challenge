/*
  # Add Video File Path Support

  1. Schema Changes
    - Add `video_file_path` to submissions table
    - Add `video_file_path` to educational_content_sections table
    - Add `video_file_path` to dojo_videos table
    - These columns store the path to videos hosted in Supabase Storage
    - Allows submissions to use either YouTube links OR uploaded video files
  
  2. Notes
    - youtube_url/video_url remains optional for backwards compatibility
    - At least one of youtube_url or video_file_path should be present
*/

-- Add video_file_path to submissions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'video_file_path'
  ) THEN
    ALTER TABLE submissions ADD COLUMN video_file_path text;
  END IF;
END $$;

-- Add video_file_path to educational_content_sections table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'educational_content_sections' AND column_name = 'video_file_path'
  ) THEN
    ALTER TABLE educational_content_sections ADD COLUMN video_file_path text;
  END IF;
END $$;

-- Add video_file_path to dojo_videos table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'dojo_videos' AND column_name = 'video_file_path'
  ) THEN
    ALTER TABLE dojo_videos ADD COLUMN video_file_path text;
  END IF;
END $$;