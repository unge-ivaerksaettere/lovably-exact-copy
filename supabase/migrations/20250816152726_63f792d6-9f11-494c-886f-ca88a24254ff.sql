-- Create table for managing page visibility
CREATE TABLE public.page_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view page settings" 
ON public.page_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can modify page settings" 
ON public.page_settings 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_page_settings_updated_at
BEFORE UPDATE ON public.page_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pages
INSERT INTO public.page_settings (page_key, page_name, is_visible) VALUES
('find-co-founder', 'Find Co-founder', false),
('vores-historie', 'Vores Historie', true),
('med-teamet', 'Med Teamet', true),
('vores-sponsore-bliv-sponsor', 'Vores Sponsore/Bliv Sponsor', true);