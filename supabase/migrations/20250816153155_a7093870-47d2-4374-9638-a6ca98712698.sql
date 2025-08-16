-- Fix the route for sponsors page to match actual route
UPDATE public.page_settings 
SET page_key = 'vores-sponsore'
WHERE page_key = 'vores-sponsore-bliv-sponsor';