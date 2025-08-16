-- Remove any existing problematic views and recreate properly
DROP VIEW IF EXISTS public.events_categorized CASCADE;

-- Create a simple function-based approach instead of a view with security definer
CREATE OR REPLACE FUNCTION public.get_events_by_status(event_status TEXT DEFAULT 'all')
RETURNS TABLE(
  id UUID,
  title TEXT,
  description TEXT,
  event_date DATE,
  event_time TIME,
  location TEXT,
  max_attendees INTEGER,
  current_attendees INTEGER,
  image_url TEXT,
  featured BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  status TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    e.id,
    e.title,
    e.description,
    e.event_date,
    e.event_time,
    e.location,
    e.max_attendees,
    e.current_attendees,
    e.image_url,
    e.featured,
    e.created_at,
    e.updated_at,
    CASE 
      WHEN e.event_date >= CURRENT_DATE THEN 'upcoming'
      ELSE 'past'
    END AS status
  FROM public.events e
  WHERE 
    CASE 
      WHEN event_status = 'upcoming' THEN e.event_date >= CURRENT_DATE
      WHEN event_status = 'past' THEN e.event_date < CURRENT_DATE
      ELSE true
    END
  ORDER BY 
    CASE 
      WHEN e.event_date >= CURRENT_DATE THEN e.event_date
      ELSE NULL
    END ASC,
    CASE 
      WHEN e.event_date < CURRENT_DATE THEN e.event_date
      ELSE NULL
    END DESC;
$$;