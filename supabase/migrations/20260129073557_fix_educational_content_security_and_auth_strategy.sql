/*
  # Fix Educational Content Security and Auth Connection Strategy

  ## Summary
  This migration fixes critical security issues identified in the system:
  
  1. **Auth DB Connection Strategy**
     - Switches from fixed connection pool (10 connections) to percentage-based allocation
     - Allows Auth server to scale automatically with instance size
     - Uses 10% of total database connections for Auth server
  
  2. **Educational Content RLS Policies**
     - Removes overly permissive policies that allow any authenticated user to modify content
     - Replaces with admin-only policies using the `is_admin()` function
     - Maintains public read access while restricting write operations to admins only

  ## Security Changes

  ### Tables Affected
  - `educational_pages` - Now requires admin role for INSERT, UPDATE, DELETE
  - `educational_content_sections` - Now requires admin role for INSERT, UPDATE, DELETE

  ### Admin Access
  - Admin users are identified by the `is_admin` claim in `auth.jwt()`
  - To set a user as admin: `UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb WHERE email = 'admin@example.com'`

  ## Important Notes
  - Public users can still read all educational content
  - Only admin users can create, update, or delete educational pages and sections
  - Auth connection pool now scales automatically with database instance size
*/

-- =====================================================
-- 1. Fix Auth DB Connection Strategy
-- =====================================================

-- Switch Auth to use percentage-based connection allocation (10% of total connections)
-- This allows Auth server to scale automatically when instance size increases
ALTER ROLE authenticator SET pgrst.db_pool_size TO '10%';

-- =====================================================
-- 2. Fix RLS Policies for educational_pages
-- =====================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert educational pages" ON educational_pages;
DROP POLICY IF EXISTS "Authenticated users can update educational pages" ON educational_pages;
DROP POLICY IF EXISTS "Authenticated users can delete educational pages" ON educational_pages;

-- Create admin-only policies
CREATE POLICY "Admin users can insert educational pages"
  ON educational_pages FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin users can update educational pages"
  ON educational_pages FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin users can delete educational pages"
  ON educational_pages FOR DELETE
  TO authenticated
  USING (is_admin());

-- =====================================================
-- 3. Fix RLS Policies for educational_content_sections
-- =====================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert content sections" ON educational_content_sections;
DROP POLICY IF EXISTS "Authenticated users can update content sections" ON educational_content_sections;
DROP POLICY IF EXISTS "Authenticated users can delete content sections" ON educational_content_sections;

-- Create admin-only policies
CREATE POLICY "Admin users can insert content sections"
  ON educational_content_sections FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin users can update content sections"
  ON educational_content_sections FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin users can delete content sections"
  ON educational_content_sections FOR DELETE
  TO authenticated
  USING (is_admin());
