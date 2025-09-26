-- SECURITY FIX: Restrict event_registrations access to admins only
-- Issue: Current policy allows any authenticated user to see registrations with matching email
-- This creates a privacy risk where users could potentially access other users' data

-- Drop the current "Secure registration data access" policy that allows email-based access
DROP POLICY IF EXISTS "Secure registration data access" ON public.event_registrations;

-- Create a new, more restrictive policy that only allows admins to view registration data
CREATE POLICY "Admin only registration access" 
ON public.event_registrations 
FOR SELECT 
USING (is_admin(auth.uid()));

-- The existing policies for admin management and public registration remain:
-- - "Admins can view all registrations" (ALL operations for admins)
-- - "Anyone can register for events" (INSERT for anonymous users)

-- Add security audit log
INSERT INTO public.audit_logs (
  user_id,
  action,
  old_value,
  new_value
) VALUES (
  null,
  'security_vulnerability_fix',
  'Authenticated users could access event registrations by email match',
  'Restricted registration data access to admins only to prevent privacy breaches'
);