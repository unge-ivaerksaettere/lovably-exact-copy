import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Clock, Music, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const PodcastSection = () => {
  const [showSpotifyAuth, setShowSpotifyAuth] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  const episodes = [
    {
      title: "Fundraising secrets med Martin fra Pleo",
      description: "Insider tips til at sikre funding fra en der har været med til at rejse over 1 milliard.",
      duration: "38 min",
      category: "Funding",
      spotifyId: "episode-id-1", // Replace with actual episode ID when available
      preview: true,
    },
    {
      title: "Tech trends 2024: AI og startup-økosystemet", 
      description: "Hvordan kan AI revolutionen transformere startup landskabet? Eksperter deler deres forudsigelser.",
      duration: "45 min",
      category: "Tech",
      spotifyId: "episode-id-2", // Replace with actual episode ID when available
      preview: false,
    },
    {
      title: "Du Bliver ALDRIG Til Noget Fazel",
      description: "Inspirerende historie om at overvinde udfordringer og bygge succes mod alle odds.",
      duration: "53 min", 
      category: "Motivation",
      spotifyId: "episode-id-3", // Replace with actual episode ID when available
      preview: false,
    },
  ];

  const featuredEpisode = {
    title: "Manden bag Doublés",
    description: "Dybdegående samtale om at bygge bæredygtige forretninger og navigere i grønne trends.",
    duration: "1:02:49",
    category: "Bæredygtighed",
    spotifyId: "4P3kjxBiYGGjnS1uqjkt3V", // Real episode ID from your Spotify embed
    showId: "154B6QakpSESlOKiFkiDyk" // Your actual podcast show ID
  };

  const handlePlayEpisode = (index: number) => {
    if (episodes[index].preview) {
      setSelectedEpisode(index);
    } else {
      setShowSpotifyAuth(true);
    }
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
              src={podcastStudio} 
              alt="Podcast studio" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-orange/10 text-orange rounded-full px-3 py-1 mb-4">
              <span className="text-lg">🎙️</span>
              <span className="text-sm font-medium">Ny Episode</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              {featuredEpisode.title}
            </h3>
            
            <p className="text-muted-foreground mb-6">
              {featuredEpisode.description}
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {featuredEpisode.duration}
              </div>
              <Badge variant="secondary">{featuredEpisode.category}</Badge>
            </div>
            
            {/* Spotify Embedded Player */}
            <div className="mb-6">
              <iframe 
                src={`https://open.spotify.com/embed/episode/${featuredEpisode.spotifyId}?utm_source=generator&theme=0`}
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg"
              />
            </div>
            
            <div className="flex gap-3">
              <Button className="gap-2" onClick={() => window.open(`https://open.spotify.com/episode/${featuredEpisode.spotifyId}`, '_blank')}>
                <ExternalLink className="w-4 h-4" />
                Åbn i Spotify
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => window.open(`https://open.spotify.com/show/${featuredEpisode.showId}`, '_blank')}>
                <Heart className="w-4 h-4" />
                Følg Podcast
              </Button>
            </div>
          </div>
        </div>

        {/* Spotify Show Embed */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Lyt til alle episoder på Spotify</h3>
              <p className="text-muted-foreground">
                Få adgang til hele vores bibliotek af iværksætteri-samtaler
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <iframe 
                src={`https://open.spotify.com/embed/show/${featuredEpisode.showId}?utm_source=generator&theme=0`}
                width="100%" 
                height="352" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {episodes.map((episode, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{episode.category}</Badge>
                  {!episode.preview && (
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold mb-3 line-clamp-2">{episode.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {episode.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{episode.duration}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handlePlayEpisode(index)}
                    className="group-hover:bg-primary/10"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                
                {episode.preview && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Preview tilgængelig</div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/50 w-1/3" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Vi er pt. sponsoreret af TechStars Copenhagen og Founder House
          </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => window.open('https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk', '_blank')}>
                Se Alle Episodes
              </Button>
            <Button 
              className="gap-2"
              onClick={() => setShowSpotifyAuth(true)}
            >
              <Music className="w-4 h-4" />
              Tilmeld dig Spotify Premium
            </Button>
          </div>
        </div>

        {/* Episode Preview Modal */}
        <Dialog open={selectedEpisode !== null} onOpenChange={() => setSelectedEpisode(null)}>
          <DialogContent className="max-w-2xl">
            {selectedEpisode !== null && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{episodes[selectedEpisode].title}</h3>
                <p className="text-muted-foreground mb-6">{episodes[selectedEpisode].description}</p>
                
                <div className="bg-muted/30 rounded-lg p-6 text-center mb-6">
                  <Play className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Dette er en preview. Tilmeld dig Spotify Premium for at høre hele episoden.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={() => setSelectedEpisode(null)}>
                      Luk
                    </Button>
                    <Button onClick={() => {
                      setSelectedEpisode(null);
                      setShowSpotifyAuth(true);
                    }}>
                      Få fuld adgang
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