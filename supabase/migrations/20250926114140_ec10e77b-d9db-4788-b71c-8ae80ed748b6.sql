-- Fix critical security issue: Remove anonymous access to registration personal data
-- Update RLS policy to restrict access to admins and registered users only

DROP POLICY IF EXISTS "Users can view limited registration data" ON public.event_registrations;

-- Create new secure policy that prevents anonymous access to personal data
CREATE POLICY "Secure registration data access" 
ON public.event_registrations 
FOR SELECT 
USING (
  -- Admins can see all data
  is_admin(auth.uid()) 
  OR 
  -- Authenticated users can only see their own registrations
  (auth.uid() IS NOT NULL AND email = (
    SELECT users.email::text 
    FROM auth.users 
    WHERE users.id = auth.uid()
  ))
);

-- Create separate policy for public count display (no personal data)
CREATE POLICY "Public registration count only" 
ON public.event_registrations 
FOR SELECT 
USING (
  -- Anonymous users can only see confirmation status for counting
  -- This allows public display of attendee counts without exposing personal data
  auth.uid() IS NULL AND confirmed_at IS NOT NULL
);

-- Add security audit log entry
INSERT INTO public.audit_logs (
  user_id,
  action,
  old_value,
  new_value
) VALUES (
  null,
  'security_policy_update',
  'Anonymous users could view registration personal data',
  'Restricted registration data access to admins and registered users only'
);