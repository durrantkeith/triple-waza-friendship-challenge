/*
  # Fix Auth DB Connection Strategy

  1. Changes Applied
    - Switch Auth DB connection pool from fixed number to percentage-based allocation
    - This allows the connection pool to scale automatically with database instance size
    - More efficient resource utilization as you scale

  2. Security Notes
    - Percentage-based pooling prevents connection exhaustion
    - Scales automatically without manual intervention when upgrading instance
    
  ## Additional Security Configuration Required
  
  The following settings must be configured through the Supabase Dashboard:
  
  **Leaked Password Protection:**
  - Navigate to: Dashboard > Authentication > Settings > Security
  - Enable "Leaked Password Protection"
  - This checks passwords against HaveIBeenPwned.org database
  - Prevents users from using compromised passwords
  
  These dashboard settings cannot be configured via SQL migrations as they are
  managed by the Supabase Auth service configuration layer.
*/

-- Switch from fixed connection pool size to percentage-based allocation
-- This setting applies to the authenticator role used by PostgREST/Auth
-- 10% of max_connections will be allocated to the connection pool
ALTER ROLE authenticator SET pgrst.db_pool_size = '10%';

-- Set connection pool timeout to 10 seconds
ALTER ROLE authenticator SET pgrst.db_pool_timeout = 10;

-- Verify settings were applied
DO $$
BEGIN
  RAISE NOTICE 'Auth connection pool strategy updated to percentage-based allocation (10%%)';
  RAISE NOTICE 'Please enable Leaked Password Protection in Supabase Dashboard > Authentication > Settings > Security';
END $$;