import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

interface SpotifyEpisodesResponse {
  items: SpotifyEpisode[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Spotify sync...');
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Spotify credentials
    const clientId = Deno.env.get('SPOTIFY_CLIENT_ID');
    const clientSecret = Deno.env.get('SPOTIFY_CLIENT_SECRET');
    
    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials');
    }

    // Log sync start
    const { data: syncLog, error: syncLogError } = await supabase
      .from('podcast_sync_log')
      .insert({
        status: 'in_progress'
      })
      .select()
      .single();

    if (syncLogError) {
      console.error('Error creating sync log:', syncLogError);
      throw syncLogError;
    }

    // Get Spotify access token using Client Credentials flow
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to get Spotify token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Specific episode IDs to sync
    const episodeIds = [
      '4s5VbujsPLpoBBZdXCAbEL', // Fazel Majad
      '4P3kjxBiYGGjnS1uqjkt3V', // Doubles/Peter
      '2yTe4aymOgjFl4rptMIxoZ', // Louliving
      '0dM4qMKX9annVdUPBFckZO'  // The Döner
    ];
    
    // Clear existing episodes first
    await supabase.from('podcast_episodes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    const episodes = [];
    
    // Fetch each episode individually
    for (const episodeId of episodeIds) {
      const episodeResponse = await fetch(
        `https://api.spotify.com/v1/episodes/${episodeId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!episodeResponse.ok) {
        console.error(`Failed to fetch episode ${episodeId}: ${episodeResponse.status}`);
        continue;
      }

      const episodeData = await episodeResponse.json();
      episodes.push(episodeData);
    }

    console.log(`Found ${episodes.length} episodes from Spotify`);

    // Process each episode
    let syncedCount = 0;
    for (const episode of episodes) {
      try {
        // Determine which GitHub image to use
        let imageUrl = null;
        if (episode.name.toLowerCase().includes('fazel')) {
          imageUrl = '/src/assets/podcast-fazel.png';
        } else if (episode.name.toLowerCase().includes('doubles') || episode.name.toLowerCase().includes('peter')) {
          imageUrl = '/src/assets/podcast-doubles.png';
        } else if (episode.name.toLowerCase().includes('louliving')) {
          imageUrl = '/src/assets/podcast-louliving.png';
        } else if (episode.name.toLowerCase().includes('döner') || episode.name.toLowerCase().includes('doner')) {
          imageUrl = '/src/assets/podcast-doner.png';
        }
        
        // Set featured status for Fazel episode
        const isFeatured = episode.name.toLowerCase().includes('fazel');
        
        // Upsert episode to database
        const { error: upsertError } = await supabase
          .from('podcast_episodes')
          .upsert({
            spotify_id: episode.id,
            title: episode.name,
            description: episode.description,
            release_date: episode.release_date,
            duration_ms: episode.duration_ms,
            spotify_url: episode.external_urls.spotify,
            image_url: imageUrl,
            featured: isFeatured
          }, {
            onConflict: 'spotify_id',
            ignoreDuplicates: false
          });

        if (upsertError) {
          console.error(`Error upserting episode ${episode.id}:`, upsertError);
        } else {
          syncedCount++;
        }
      } catch (episodeError) {
        console.error(`Error processing episode ${episode.id}:`, episodeError);
      }
    }

    // Update sync log
    await supabase
      .from('podcast_sync_log')
      .update({
        sync_completed_at: new Date().toISOString(),
        episodes_synced: syncedCount,
        status: 'completed'
      })
      .eq('id', syncLog.id);

    console.log(`Sync completed. Synced ${syncedCount} episodes.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synced ${syncedCount} episodes successfully`,
        episodes_synced: syncedCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Spotify sync error:', error);
    
    // Try to update sync log with error
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    await supabase
      .from('podcast_sync_log')
      .update({
        sync_completed_at: new Date().toISOString(),
        status: 'failed',
        error_message: error.message
      })
      .eq('status', 'in_progress');

    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});