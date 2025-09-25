-- CRITICAL SECURITY FIX: Restrict access to event registrations
-- This fixes the security vulnerability where all users could view all registration data

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;

-- Create a secure policy that only allows users to view their own registrations by email
-- (since registrations don't require authentication, we match by email)
CREATE POLICY "Users can view their own registrations by email" 
ON public.event_registrations 
FOR SELECT 
USING (
  -- Only allow viewing if the user is authenticated and the email matches their auth email
  auth.jwt() ->> 'email' = email
  OR 
  -- Or if they are an admin (existing admin policy will also apply)
  public.is_admin(auth.uid())
);

-- Additionally, ensure anonymous users cannot view any registration data
-- This policy explicitly denies access for non-authenticated users
CREATE POLICY "Deny anonymous access to registrations" 
ON public.event_registrations 
FOR SELECT 
TO anon
USING (false);

-- Create a more restrictive policy for public access (only confirmed registrations count, no personal data)
-- This allows showing event attendance counts without exposing personal information
CREATE POLICY "Public can view registration counts only" 
ON public.event_registrations 
FOR SELECT 
TO anon
USING (
  -- Only allow counting confirmed registrations, no personal data access
  confirmed_at IS NOT NULL 
  AND 
  false -- Actually deny even this for now, counts should be handled via a view or function
);