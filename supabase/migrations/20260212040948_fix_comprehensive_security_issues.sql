/*
  # Fix Comprehensive Security Issues

  ## Performance Improvements
  
  1. Add missing foreign key indexes:
     - `dojo_videos.dojo_id`
     - `dojos.auth_user_id`
     - `submissions.dojo_id`
  
  2. Optimize RLS policies on submissions table:
     - Replace `auth.uid()` with `(select auth.uid())` to prevent re-evaluation per row
  
  3. Remove unused indexes:
     - Drop `idx_friend_referrals_recipient_email`
     - Drop `idx_friend_referrals_sent_at`
  
  ## Security Improvements
  
  4. Fix multiple permissive policies on dojos table:
     - Combine UPDATE policies into single restrictive policy
  
  5. Fix friend_referrals unrestricted INSERT policy:
     - Add proper validation to prevent abuse
*/

-- 1. Add missing foreign key indexes for performance
CREATE INDEX IF NOT EXISTS idx_dojo_videos_dojo_id_fk ON public.dojo_videos(dojo_id);
CREATE INDEX IF NOT EXISTS idx_dojos_auth_user_id_fk ON public.dojos(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_dojo_id_fk ON public.submissions(dojo_id);

-- 2. Optimize RLS policies on submissions table
DROP POLICY IF EXISTS "Admin can delete submissions" ON public.submissions;
DROP POLICY IF EXISTS "Admin can update submissions" ON public.submissions;

CREATE POLICY "Admin can delete submissions"
  ON public.submissions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admin can update submissions"
  ON public.submissions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- 3. Drop unused indexes
DROP INDEX IF EXISTS public.idx_friend_referrals_recipient_email;
DROP INDEX IF EXISTS public.idx_friend_referrals_sent_at;

-- 4. Fix multiple permissive policies on dojos table
DROP POLICY IF EXISTS "Admins can update dojos" ON public.dojos;
DROP POLICY IF EXISTS "Dojo owners can update their own dojo" ON public.dojos;

-- Create single combined UPDATE policy
CREATE POLICY "Authenticated users can update own dojos or admins can update all"
  ON public.dojos
  FOR UPDATE
  TO authenticated
  USING (
    auth_user_id = (select auth.uid())
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth_user_id = (select auth.uid())
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = (select auth.uid())
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- 5. Fix friend_referrals unrestricted INSERT policy
DROP POLICY IF EXISTS "Anyone can submit friend referrals" ON public.friend_referrals;

-- Create restrictive policy with validation
CREATE POLICY "Users can submit friend referrals with validation"
  ON public.friend_referrals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure required fields are present
    sender_name IS NOT NULL AND sender_name != '' AND
    recipient_email IS NOT NULL AND recipient_email != '' AND
    -- Ensure email format is valid (basic check)
    recipient_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    -- If sender_email is provided, validate it
    (sender_email IS NULL OR sender_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') AND
    -- Ensure sender and recipient are different if sender_email provided
    (sender_email IS NULL OR sender_email != recipient_email)
  );
