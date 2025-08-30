-- Create podcast_episodes table
CREATE TABLE public.podcast_episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spotify_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  release_date DATE NOT NULL,
  duration_ms INTEGER,
  episode_number INTEGER,
  season_number INTEGER,
  spotify_url TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create podcast_sync_log table
CREATE TABLE public.podcast_sync_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sync_started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sync_completed_at TIMESTAMP WITH TIME ZONE,
  episodes_synced INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_sync_log ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Episodes are viewable by everyone" 
ON public.podcast_episodes 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage episodes" 
ON public.podcast_episodes 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can view sync logs" 
ON public.podcast_sync_log 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage sync logs" 
ON public.podcast_sync_log 
FOR ALL 
USING (is_admin(auth.uid()));

-- Add triggers for timestamps
CREATE TRIGGER update_podcast_episodes_updated_at
BEFORE UPDATE ON public.podcast_episodes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_podcast_episodes_release_date ON public.podcast_episodes(release_date DESC);
CREATE INDEX idx_podcast_episodes_featured ON public.podcast_episodes(featured);
CREATE INDEX idx_podcast_sync_log_status ON public.podcast_sync_log(status);