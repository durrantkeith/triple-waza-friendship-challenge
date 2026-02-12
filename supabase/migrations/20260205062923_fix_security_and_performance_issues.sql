/*
  # Fix Security and Performance Issues

  1. Performance Optimizations
    - Fix RLS policies to use `(select auth.uid())` instead of `auth.uid()` to avoid re-evaluation per row
    - Drop unused indexes that are not being utilized

  2. Security Fixes
    - Consolidate multiple permissive UPDATE policies on dojos table
    - Fix RLS policy with always-true WITH CHECK clause
    - Ensure all policies are properly restrictive

  3. Changes
    - Drop and recreate RLS policies with optimized auth function calls
    - Remove unused indexes
    - Consolidate duplicate policies
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_submissions_submitted_at;
DROP INDEX IF EXISTS idx_submissions_dojo_id_fk;
DROP INDEX IF EXISTS idx_dojos_auth_user_id;
DROP INDEX IF EXISTS idx_dojo_videos_dojo_id;
DROP INDEX IF EXISTS idx_dojo_videos_created_at;
DROP INDEX IF EXISTS idx_dojo_videos_is_featured;

-- Fix dojos table policies
DROP POLICY IF EXISTS "Dojo owners can update their own dojo" ON dojos;
DROP POLICY IF EXISTS "Admins can update any dojo" ON dojos;
DROP POLICY IF EXISTS "Admins can update dojos" ON dojos;
DROP POLICY IF EXISTS "Admins can delete dojos" ON dojos;

-- Create optimized and consolidated dojos policies
CREATE POLICY "Dojo owners can update their own dojo"
  ON dojos FOR UPDATE
  TO authenticated
  USING (auth_user_id = (select auth.uid()))
  WITH CHECK (auth_user_id = (select auth.uid()));

CREATE POLICY "Admins can update dojos"
  ON dojos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  );

CREATE POLICY "Admins can delete dojos"
  ON dojos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  );

-- Fix submissions table policies
DROP POLICY IF EXISTS "View approved submissions or all if authenticated" ON submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON submissions;
DROP POLICY IF EXISTS "Admins can delete submissions" ON submissions;

CREATE POLICY "View approved submissions or all if authenticated"
  ON submissions FOR SELECT
  TO public
  USING (
    status = 'approved' OR
    (select auth.uid()) IS NOT NULL
  );

CREATE POLICY "Admins can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  );

CREATE POLICY "Admins can delete submissions"
  ON submissions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.email = 'durrantkeith@gmail.com'
    )
  );

-- Fix dojo_videos table policies
DROP POLICY IF EXISTS "Dojo owners can insert their own videos" ON dojo_videos;
DROP POLICY IF EXISTS "Dojo owners can update their own videos" ON dojo_videos;
DROP POLICY IF EXISTS "Dojo owners can delete their own videos" ON dojo_videos;

CREATE POLICY "Dojo owners can insert their own videos"
  ON dojo_videos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dojos
      WHERE dojos.id = dojo_videos.dojo_id
      AND dojos.auth_user_id = (select auth.uid())
    )
  );

CREATE POLICY "Dojo owners can update their own videos"
  ON dojo_videos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM dojos
      WHERE dojos.id = dojo_videos.dojo_id
      AND dojos.auth_user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dojos
      WHERE dojos.id = dojo_videos.dojo_id
      AND dojos.auth_user_id = (select auth.uid())
    )
  );

CREATE POLICY "Dojo owners can delete their own videos"
  ON dojo_videos FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM dojos
      WHERE dojos.id = dojo_videos.dojo_id
      AND dojos.auth_user_id = (select auth.uid())
    )
  );