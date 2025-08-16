-- Create event_registrations table for managing attendees
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  subscribe_newsletter BOOLEAN DEFAULT false,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  confirmation_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, email)
);

-- Enable RLS
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to register for events
CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

-- Users can view their own registrations
CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (true);

-- Admins can view all registrations
CREATE POLICY "Admins can view all registrations" 
ON public.event_registrations 
FOR ALL 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_event_registrations_updated_at
BEFORE UPDATE ON public.event_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update event attendee count
CREATE OR REPLACE FUNCTION public.update_event_attendee_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.confirmed_at IS NOT NULL THEN
    -- Increment count for confirmed registration
    UPDATE public.events 
    SET current_attendees = COALESCE(current_attendees, 0) + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL THEN
    -- Increment count when registration gets confirmed
    UPDATE public.events 
    SET current_attendees = COALESCE(current_attendees, 0) + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.confirmed_at IS NOT NULL AND NEW.confirmed_at IS NULL THEN
    -- Decrement count if confirmation is removed
    UPDATE public.events 
    SET current_attendees = GREATEST(COALESCE(current_attendees, 0) - 1, 0)
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' AND OLD.confirmed_at IS NOT NULL THEN
    -- Decrement count for confirmed registration deletion
    UPDATE public.events 
    SET current_attendees = GREATEST(COALESCE(current_attendees, 0) - 1, 0)
    WHERE id = OLD.event_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for attendee count updates
CREATE TRIGGER update_attendee_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.event_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_event_attendee_count();