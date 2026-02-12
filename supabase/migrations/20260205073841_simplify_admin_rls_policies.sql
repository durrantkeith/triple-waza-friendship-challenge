/*
  # Simplify Admin RLS Policies
  
  1. Changes
    - Drop existing admin policies
    - Create simpler policies that check email directly from JWT
    - This avoids potential issues with JWT parsing
    
  2. Security
    - Only durrantkeith@gmail.com can delete and update submissions
    - Policy is simple and reliable
*/

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admins can delete submissions" ON submissions;
DROP POLICY IF EXISTS "Admins can update submissions" ON submissions;

-- Create simpler admin policies
CREATE POLICY "Admin can delete submissions"
  ON submissions FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'durrantkeith@gmail.com');

CREATE POLICY "Admin can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'durrantkeith@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'durrantkeith@gmail.com');