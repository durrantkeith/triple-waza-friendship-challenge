/*
  # Fix Security Issues - Drop Unused Index

  1. Performance Optimization
    - Drop unused index `idx_founders_order` on `public.founders` table
    - This index has not been used and removing it improves write performance

  2. Important Notes
    - The following issues require Supabase dashboard configuration:
      * Auth DB Connection Strategy: Switch from fixed number to percentage-based allocation
      * Leaked Password Protection: Enable HaveIBeenPwned.org integration for compromised password detection
*/

-- Drop the unused index on founders table
DROP INDEX IF EXISTS public.idx_founders_order;
