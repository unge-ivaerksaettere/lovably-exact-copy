-- Fix security definer function with proper search path
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Fix the timestamp function with proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Replace the security definer view with a regular view
DROP VIEW IF EXISTS public.events_categorized;

CREATE VIEW public.events_categorized AS
SELECT *,
  CASE 
    WHEN event_date >= CURRENT_DATE THEN 'upcoming'
    ELSE 'past'
  END AS status
FROM public.events
ORDER BY 
  CASE 
    WHEN event_date >= CURRENT_DATE THEN event_date
    ELSE NULL
  END ASC,
  CASE 
    WHEN event_date < CURRENT_DATE THEN event_date
    ELSE NULL
  END DESC;