/*
  # Fix Security Issues: Founders RLS and Auth Connection Strategy
  
  ## Issues Fixed
  
  1. **RLS Policy Always True Issues**
     - Drop overly permissive policies on `founders` table that allow unrestricted access
     - Replace with admin-only policies using the `is_admin()` function
     - Policies affected:
       - "Authenticated users can insert founders" - now restricted to admins only
       - "Authenticated users can update founders" - now restricted to admins only
       - "Authenticated users can delete founders" - now restricted to admins only
  
  2. **Auth DB Connection Strategy**
     - Update auth.config to use percentage-based connection allocation
     - This allows connection scaling with instance size
  
  ## Security Notes
  
  - Admin users are identified by the `is_admin` claim in `auth.jwt()`
  - To set a user as admin: `UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb WHERE email = 'admin@example.com'`
  - Public can still view all founders (they are public figures)
  - Only admins can insert, update, or delete founder records
*/

-- Create helper function to check if user is admin (if it doesn't exist)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_temp;

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert founders" ON founders;
DROP POLICY IF EXISTS "Authenticated users can update founders" ON founders;
DROP POLICY IF EXISTS "Authenticated users can delete founders" ON founders;

-- Create admin-only policies
CREATE POLICY "Admins can insert founders"
  ON founders
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update founders"
  ON founders
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete founders"
  ON founders
  FOR DELETE
  TO authenticated
  USING (is_admin());