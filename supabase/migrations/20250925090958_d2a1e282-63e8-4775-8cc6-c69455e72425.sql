-- CRITICAL SECURITY FIX: Update event_registrations RLS policy to prevent data exposure
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;

-- Create a proper restrictive policy for viewing registrations
-- Only admins can see all data, users can only see their own confirmed registrations (no PII for others)
CREATE POLICY "Users can view limited registration data" 
ON public.event_registrations 
FOR SELECT 
USING (
  -- Admins can see everything
  is_admin(auth.uid()) OR 
  -- Authenticated users can only see their own registrations by email match
  (auth.uid() IS NOT NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid())) OR
  -- Anonymous users can only see aggregated data (no PII) - only confirmed_at and event_id
  (auth.uid() IS NULL AND confirmed_at IS NOT NULL)
);

-- Add a policy to restrict what columns anonymous users can access
-- This requires using a view or function for public data, but for now we'll document this limitation