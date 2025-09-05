import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Clock, Music, ExternalLink, Heart, Loader2, Youtube } from "lucide-react";
import { useState } from "react";
import { usePodcastEpisodes, useFeaturedPodcastEpisode, PodcastEpisode } from "@/hooks/usePodcastEpisodes";
import podcastStudio from "@/assets/podcast-recording-1.jpg";
// Import podcast images
import podcastFazel from "@/assets/podcast-fazel.png";
import podcastDoubles from "@/assets/podcast-doubles-new.png";
import podcastLouliving from "@/assets/podcast-louliving.png";
import podcastDoner from "@/assets/podcast-doner.png";

const PodcastSection = () => {
  const [showSpotifyAuth, setShowSpotifyAuth] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  
  const { data: episodes = [], isLoading: episodesLoading } = usePodcastEpisodes();
  const { data: featuredEpisode, isLoading: featuredLoading } = useFeaturedPodcastEpisode();

  // Fallback featured episode if none in database
  const defaultFeaturedEpisode = {
    id: "default",
    spotify_id: "4P3kjxBiYGGjnS1uqjkt3V",
    title: "Manden bag Doublés",
    description: "I podcasten Unge Iværksættere Talks udforsker vi unge iværksætteres historier med det formål at dele deres råd og erfaringer med andre ambitiøse unge.",
    release_date: "2024-01-01",
    duration_ms: 3769000, // 1:02:49 in milliseconds
    episode_number: null,
    season_number: null,
    spotify_url: "https://open.spotify.com/episode/4P3kjxBiYGGjnS1uqjkt3V",
    image_url: null,
    featured: true,
    created_at: "",
    updated_at: ""
  };

  const currentFeaturedEpisode = featuredEpisode || episodes[0] || defaultFeaturedEpisode;
  const showId = "154B6QakpSESlOKiFkiDyk"; // Your actual podcast show ID
  
  const formatDuration = (durationMs: number | null) => {
    if (!durationMs) return "N/A";
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getEpisodeImage = (episode: PodcastEpisode) => {
    const lc = episode.title.toLowerCase();
    
    // Specific episode matches
    if (lc.includes('fazel')) return podcastFazel;
    if (lc.includes('doubles') || lc.includes('doublés') || lc.includes('peter')) return podcastDoubles;
    if (lc.includes('louliving')) return podcastLouliving;
    if (lc.includes('döner') || lc.includes('doner')) return podcastDoner;
    
    // For other episodes, check if Spotify provides a valid image URL
    if (episode.image_url && episode.image_url !== '' && !episode.image_url.includes('undefined') && !episode.image_url.includes('null')) {
      return episode.image_url;
    }
    
    // Default fallback
    return podcastStudio;
  };

  const handlePlayEpisode = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
  };

  const handleSpotifyLogin = () => {
    // Spotify OAuth flow
    const clientId = "your_spotify_client_id"; // You'll need to register your app
    const redirectUri = encodeURIComponent(window.location.origin);
    const scopes = encodeURIComponent("streaming user-read-email user-read-private");
    
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    
    window.open(spotifyAuthUrl, '_blank', 'width=500,height=600');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Seneste Podcast Episodes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dybdegående samtaler med Danmarks mest succesrige iværksættere og investorer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={getEpisodeImage(currentFeaturedEpisode)}
              alt={`${currentFeaturedEpisode.title} cover`}
              className="rounded-lg w-full h-auto object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = podcastStudio; }}
            />
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-orange/10 text-orange rounded-full px-3 py-1 mb-4">
              <span className="text-lg">🎙️</span>
              <span className="text-sm font-medium">Ny Episode</span>
            </div>
            
            {featuredLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4">
                  {currentFeaturedEpisode.title}
                </h3>
                
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatDuration(currentFeaturedEpisode.duration_ms)}
                  </div>
                  <Badge variant="secondary">Podcast</Badge>
                </div>
                
                {/* Spotify Embedded Player */}
                <div className="mb-6">
                  <iframe 
                    src={`https://open.spotify.com/embed/episode/${currentFeaturedEpisode.spotify_id}?utm_source=generator&theme=0`}
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button className="gap-2" onClick={() => window.open(`https://open.spotify.com/episode/${currentFeaturedEpisode.spotify_id}`, '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                    Åbn i Spotify
                  </Button>
                <Button variant="outline" className="gap-2 bg-red-500 hover:bg-red-600 text-white border-red-500" onClick={() => window.open('https://www.youtube.com/@ungeiv%C3%A6rks%C3%A6ttere', '_blank')}>
                    <Youtube className="w-4 h-4" />
                    Se på YouTube
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Spotify Show Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Lyt til alle episoder på Spotify</h3>
              <p className="text-muted-foreground">
                Få adgang til hele vores bibliotek af iværksætteri-samtaler
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="gap-2 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.open(`https://open.spotify.com/show/${showId}`, '_blank')}
              >
                <Music className="w-5 h-5" />
                Åbn Show på Spotify
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Tilgængelig på alle de store podcast platforme
            </p>
          </div>
        </div>



        {/* Recent Episodes List */}
        {episodesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Indlæser episoder...</span>
          </div>
        ) : episodes.length > 0 ? (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Seneste Episodes (3)</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.slice(1, 4).map((episode) => (
                <Card key={episode.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Episode Image */}
                      <img 
                        src={getEpisodeImage(episode)}
                        alt={`${episode.title} cover`}
                        className="w-full h-32 object-cover rounded-lg"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = podcastStudio; }}
                      />
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground line-clamp-2">
                          {episode.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(episode.duration_ms)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Podcast
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        onClick={() => window.open(episode.spotify_url, '_blank')}
                      >
                        ▶ Lyt på Spotify
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* Episode Preview Modal */}
        <Dialog open={selectedEpisode !== null} onOpenChange={() => setSelectedEpisode(null)}>
          <DialogContent className="max-w-2xl">
            {selectedEpisode !== null && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{selectedEpisode.title}</h3>
                <p className="text-muted-foreground mb-6">{selectedEpisode.description}</p>
                
                <div className="bg-muted/30 rounded-lg p-6 text-center mb-6">
                  <iframe 
                    src={`https://open.spotify.com/embed/episode/${selectedEpisode.spotify_id}?utm_source=generator&theme=0`}
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-lg mb-4"
                  />
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => setSelectedEpisode(null)}>
                      Luk
                    </Button>
                    <Button onClick={() => window.open(selectedEpisode.spotify_url, '_blank')}>
                      Åbn i Spotify
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Spotify Authentication Modal */}
        <Dialog open={showSpotifyAuth} onOpenChange={setShowSpotifyAuth}>
          <DialogContent className="max-w-md">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Lyt til alle episoder</h3>
              <p className="text-muted-foreground mb-6">
                Tilmeld dig Spotify Premium for at få adgang til alle vores podcast episoder og meget mere.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Ubegrænset adgang til alle episoder</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Høj kvalitets lyd</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Download til offline lytning</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Ingen reklamer</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowSpotifyAuth(false)}>
                  Måske senere
                </Button>
                <Button onClick={handleSpotifyLogin} className="bg-green-500 hover:bg-green-600 text-white">
                  Tilmeld dig Spotify
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Har du allerede Spotify Premium? 
                <button className="text-primary hover:underline ml-1" onClick={handleSpotifyLogin}>
                  Log ind her
                </button>
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PodcastSection;