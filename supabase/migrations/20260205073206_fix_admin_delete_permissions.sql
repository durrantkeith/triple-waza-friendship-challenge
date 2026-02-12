/*
  # Fix Admin Delete Permissions
  
  1. Changes
    - Drop existing admin policies that query auth.users table
    - Create new policies using auth.jwt() to check is_admin flag
    - This is more reliable and doesn't require cross-schema queries
    
  2. Security
    - Admins can delete, update submissions
    - Policy checks is_admin flag in JWT metadata
*/

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admins can delete submissions" ON submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON submissions;

-- Create new admin policies using JWT metadata
CREATE POLICY "Admins can delete submissions"
  ON submissions FOR DELETE
  TO authenticated
  USING (
    (auth.jwt()->>'email') = 'durrantkeith@gmail.com'
    OR
    COALESCE((auth.jwt()->'app_metadata'->>'is_admin')::boolean, false) = true
  );

CREATE POLICY "Admins can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt()->>'email') = 'durrantkeith@gmail.com'
    OR
    COALESCE((auth.jwt()->'app_metadata'->>'is_admin')::boolean, false) = true
  )
  WITH CHECK (
    (auth.jwt()->>'email') = 'durrantkeith@gmail.com'
    OR
    COALESCE((auth.jwt()->'app_metadata'->>'is_admin')::boolean, false) = true
  );