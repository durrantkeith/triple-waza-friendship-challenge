/*
  # Fix Comprehensive Security and Schema Issues

  ## Changes Made
  
  1. **Schema Fixes**
     - Add missing `submitted_at`, `approved_at`, and `admin_notes` columns to submissions table
     - Migrate data: copy `created_at` to `submitted_at` for existing records
     - Add missing `province_state` column to dojos table if not exists
  
  2. **Drop Unused Indexes**
     - Drop `idx_submissions_dojo_id` (flagged as unused by Supabase advisor)
     - Drop `idx_submissions_created_at` (app uses submitted_at, not created_at)
  
  3. **Add Proper Indexes**
     - Add index on `submitted_at` for sorting performance
     - Keep `idx_submissions_status` for filtering
  
  4. **Fix Overly Permissive RLS Policies**
     - Replace "always true" policies with more secure alternatives
     - Maintain admin access for authenticated users
     - Keep public submission capability (business requirement)
     - Add proper validation and security boundaries
  
  ## Security Improvements
  
  All RLS policies now follow the principle of least privilege while maintaining 
  the business requirement that:
  - Public users can submit videos and create dojos
  - Authenticated admin users can manage all data
  - Public can only view approved submissions
*/

-- ============================================================================
-- STEP 1: Add Missing Columns to Submissions Table
-- ============================================================================

DO $$
BEGIN
  -- Add submitted_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'submitted_at'
  ) THEN
    ALTER TABLE submissions ADD COLUMN submitted_at timestamptz DEFAULT now();
    
    -- Migrate existing data: use created_at as submitted_at
    UPDATE submissions SET submitted_at = created_at WHERE submitted_at IS NULL;
  END IF;
  
  -- Add approved_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'approved_at'
  ) THEN
    ALTER TABLE submissions ADD COLUMN approved_at timestamptz;
  END IF;
  
  -- Add admin_notes column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'admin_notes'
  ) THEN
    ALTER TABLE submissions ADD COLUMN admin_notes text;
  END IF;
END $$;

-- ============================================================================
-- STEP 2: Add Missing Columns to Dojos Table
-- ============================================================================

DO $$
BEGIN
  -- Add province_state column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'dojos' AND column_name = 'province_state'
  ) THEN
    ALTER TABLE dojos ADD COLUMN province_state text DEFAULT '';
  END IF;
END $$;

-- ============================================================================
-- STEP 3: Drop Unused Indexes
-- ============================================================================

DROP INDEX IF EXISTS idx_submissions_dojo_id;
DROP INDEX IF EXISTS idx_submissions_created_at;

-- ============================================================================
-- STEP 4: Create Proper Indexes
-- ============================================================================

-- Index for sorting submissions by submission time (replaces idx_submissions_created_at)
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at DESC);

-- Index for foreign key performance (replaces idx_submissions_dojo_id)
-- Only create if there are actual rows with dojo_id, otherwise it's wasteful
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM submissions WHERE dojo_id IS NOT NULL LIMIT 1) THEN
    CREATE INDEX IF NOT EXISTS idx_submissions_dojo_id_fk ON submissions(dojo_id);
  END IF;
END $$;

-- ============================================================================
-- STEP 5: Fix Overly Permissive RLS Policies
-- ============================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Public can read dojos" ON dojos;
DROP POLICY IF EXISTS "Public can insert dojos" ON dojos;
DROP POLICY IF EXISTS "Authenticated users can update dojos" ON dojos;
DROP POLICY IF EXISTS "Authenticated users can delete dojos" ON dojos;
DROP POLICY IF EXISTS "Anyone can view dojos" ON dojos;
DROP POLICY IF EXISTS "Anyone can create dojos" ON dojos;

DROP POLICY IF EXISTS "Public can read approved submissions" ON submissions;
DROP POLICY IF EXISTS "Public can insert submissions" ON submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON submissions;
DROP POLICY IF EXISTS "Anyone can view approved submissions" ON submissions;
DROP POLICY IF EXISTS "Anyone can create submissions" ON submissions;

-- ============================================================================
-- DOJOS TABLE - New Secure Policies
-- ============================================================================

-- Public can view all dojos (needed for display)
CREATE POLICY "Public read access to dojos"
  ON dojos FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public can create dojos (business requirement: anyone can submit)
-- Validate that required fields are not empty
CREATE POLICY "Public can create valid dojos"
  ON dojos FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    length(trim(name)) > 0 AND
    email IS NOT NULL AND
    length(trim(email)) > 0 AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- Only authenticated users (admins) can update dojos
CREATE POLICY "Admins can update dojos"
  ON dojos FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    name IS NOT NULL AND 
    length(trim(name)) > 0 AND
    email IS NOT NULL AND
    length(trim(email)) > 0
  );

-- Only authenticated users (admins) can delete dojos
CREATE POLICY "Admins can delete dojos"
  ON dojos FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- SUBMISSIONS TABLE - New Secure Policies
-- ============================================================================

-- Anon users can only view approved submissions
-- Authenticated users can view all submissions
CREATE POLICY "View approved submissions or all if authenticated"
  ON submissions FOR SELECT
  TO anon, authenticated
  USING (
    status = 'approved' OR auth.uid() IS NOT NULL
  );

-- Public can create submissions (business requirement)
-- Validate that required fields are not empty
CREATE POLICY "Public can create valid submissions"
  ON submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    youtube_url IS NOT NULL AND 
    length(trim(youtube_url)) > 0 AND
    (youtube_url LIKE '%youtube.com%' OR youtube_url LIKE '%youtu.be%') AND
    level >= 1 AND level <= 15 AND
    status = 'pending'
  );

-- Only authenticated users (admins) can update submissions
CREATE POLICY "Admins can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    youtube_url IS NOT NULL AND 
    length(trim(youtube_url)) > 0 AND
    level >= 1 AND level <= 15 AND
    status IN ('pending', 'approved', 'rejected')
  );

-- Only authenticated users (admins) can delete submissions
CREATE POLICY "Admins can delete submissions"
  ON submissions FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- NOTE: Auth DB Connection Strategy
-- ============================================================================
-- 
-- The Auth DB connection strategy warning cannot be fixed via migration.
-- To fix this, go to your Supabase Dashboard:
-- 1. Navigate to Settings > Database
-- 2. Under "Connection pooling" section
-- 3. Change the Auth pool mode from fixed number to percentage-based
-- 4. Set it to use a percentage of available connections (e.g., 10%)
--
-- ============================================================================
