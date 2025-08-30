import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PodcastEpisode {
  id: string;
  spotify_id: string;
  title: string;
  description: string | null;
  release_date: string;
  duration_ms: number | null;
  episode_number: number | null;
  season_number: number | null;
  spotify_url: string;
  image_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export const usePodcastEpisodes = () => {
  return useQuery({
    queryKey: ["podcast-episodes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("podcast_episodes")
        .select("*")
        .order("release_date", { ascending: false });

      if (error) {
        throw error;
      }

      return data as PodcastEpisode[];
    },
  });
};

export const useFeaturedPodcastEpisode = () => {
  return useQuery({
    queryKey: ["featured-podcast-episode"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("podcast_episodes")
        .select("*")
        .eq("featured", true)
        .order("release_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as PodcastEpisode | null;
    },
  });
};

export const useSpotifySync = () => {
  const syncWithSpotify = async () => {
    const { data, error } = await supabase.functions.invoke('spotify-sync');
    
    if (error) {
      throw error;
    }
    
    return data;
  };

  return { syncWithSpotify };
};