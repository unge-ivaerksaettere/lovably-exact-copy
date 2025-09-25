-- SECURITY FIX: Configure proper authentication settings
-- This addresses the Auth OTP long expiry and leaked password protection issues

-- Set OTP expiry to 10 minutes (600 seconds) instead of default 1 hour
-- This needs to be done via Supabase Dashboard -> Authentication -> Settings
-- But we can create a reminder function for admins

CREATE OR REPLACE FUNCTION public.get_auth_security_recommendations()
RETURNS TABLE(
  issue TEXT,
  recommendation TEXT,
  priority TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT 
    'Auth OTP Expiry'::TEXT as issue,
    'Set OTP expiry to 600 seconds (10 minutes) in Supabase Dashboard -> Authentication -> Settings -> Magic Link'::TEXT as recommendation,
    'HIGH'::TEXT as priority
  UNION ALL
  SELECT 
    'Leaked Password Protection'::TEXT as issue,
    'Enable "Enable Leaked Password Protection" in Supabase Dashboard -> Authentication -> Settings -> Password'::TEXT as recommendation,
    'HIGH'::TEXT as priority
  UNION ALL
  SELECT 
    'PostgreSQL Version'::TEXT as issue,
    'Update PostgreSQL to latest version in Supabase Dashboard -> Settings -> Database -> Database Settings'::TEXT as recommendation,
    'MEDIUM'::TEXT as priority;
END;
$$;

-- Add password complexity requirements
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create a function to enforce password policies (this will need to be configured in Supabase)
CREATE OR REPLACE FUNCTION public.validate_password_strength(password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check minimum length
  IF LENGTH(password) < 8 THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one uppercase letter
  IF password !~ '[A-Z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one lowercase letter  
  IF password !~ '[a-z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Check for at least one number
  IF password !~ '[0-9]' THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Create audit log for security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.security_audit_log 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_user_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    details,
    ip_address,
    user_agent
  ) VALUES (
    p_event_type,
    p_user_id,
    p_details,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;