-- CRITICAL SECURITY FIX: Remove public access to event_registrations table
-- Issue: Anonymous users could harvest emails from confirmed registrations

-- Remove the problematic public policy that allows anonymous access
DROP POLICY IF EXISTS "Public registration count only" ON public.event_registrations;

-- The "Secure registration data access" policy is correct and should remain
-- It only allows admins and authenticated users to see their own registrations

-- Create a secure function to get public attendee count without exposing personal data
CREATE OR REPLACE FUNCTION public.get_event_attendee_count(event_id_param uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.event_registrations
  WHERE event_id = event_id_param
    AND confirmed_at IS NOT NULL;
$$;

-- Grant execute permission to anonymous users for the count function only
GRANT EXECUTE ON FUNCTION public.get_event_attendee_count(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.get_event_attendee_count(uuid) TO authenticated;

-- Add security audit log
INSERT INTO public.audit_logs (
  user_id,
  action,
  old_value,
  new_value
) VALUES (
  null,
  'security_vulnerability_fix',
  'Anonymous users could access confirmed registration emails via public SELECT policy',
  'Removed public SELECT access, created secure count function to prevent email harvesting'
);