import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const PodcastSection = () => {
  const featuredEpisode = {
    title: "En ærlig snak om bæredygtigt iværksætteri med Gittemarie",
    description: "Lyt til vores tidligere speakers eller når Mik tager nye iværksættere med i studiet for at snakke om deres rejse. Altid fedt indhold til dig, der vil lære mere om iværksætteri.",
    duration: "45 min",
    date: "Jun 24, 2024",
    category: "Bæredygtig Innovation",
    image: podcastStudio,
    spotifyUrl: "https://open.spotify.com/episode/0dM4qMKX9annVdUPBFckZO"
  };

  const recentEpisodes = [
    {
      title: "Jesper Theil Thomsen - Soundboks Rejsen",
      description: "CEO & Founder af Soundboks deler sin inspirerende rejse fra startup til international succes.",
      duration: "52 min",
      category: "Hardware Startup",
      spotifyUrl: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk"
    },
    {
      title: "Mads Andreas Olesen - Fintech Innovation",
      description: "Grundlæggeren af MXNEY.IO fortæller om at revolutionere finansielle løsninger.",
      duration: "38 min",
      category: "Fintech",
      spotifyUrl: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk"
    },
    {
      title: "Lasse Søkilde - Brand Building Secrets",
      description: "BOLD's grundlægger deler sine bedste tips til at bygge stærke brands.",
      duration: "44 min",
      category: "Branding",
      spotifyUrl: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk"
    },
    {
      title: "Daniel Pedersen - Finansiel Rådgivning",
      description: "Daniels Pengetips grundlægger giver praktiske råd om økonomi for startups.",
      duration: "41 min",
      category: "Finansiel Rådgivning",
      spotifyUrl: "https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-anton font-bold text-foreground mb-6">
            Iværksætteri Podcasten
          </h2>
          <p className="text-lg font-inter text-muted-foreground mb-8 max-w-3xl mx-auto">
            Lyt til vores tidligere speakers eller når Mik tager nye iværksættere med i studiet for at snakke om deres rejse. Altid fedt indhold til dig, der vil lære mere om iværksætteri.
          </p>
        </div>

        {/* Featured Episode */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={featuredEpisode.image} 
                alt="Unge Iværksættere Podcast Studio"
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">🎙️ Seneste Episode</Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-inter text-muted-foreground">{featuredEpisode.duration}</span>
                    <Badge variant="secondary">{featuredEpisode.category}</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-anton text-foreground mb-2">
                  {featuredEpisode.title}
                </h3>
                <p className="text-sm font-inter text-muted-foreground mb-4">
                  {featuredEpisode.date} • Unge Iværksættere Talks
                </p>
              </div>
              
              <p className="text-muted-foreground font-inter">
                {featuredEpisode.description}
              </p>
              
              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-dm-sans font-bold" asChild>
                  <a href={featuredEpisode.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    ▶ Afspil på Spotify
                  </a>
                </Button>
                <Button variant="outline" className="font-dm-sans font-bold">
                  💾 Gem til senere
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Episodes */}
        <div>
          <h3 className="text-2xl font-anton text-foreground mb-8 text-center">
            Seneste Episoder
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {recentEpisodes.map((episode, index) => (
              <Card key={index} className="p-6 border-border">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {episode.category}
                    </Badge>
                    <span className="text-sm font-inter text-muted-foreground">
                      {episode.duration}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-dm-sans font-bold text-foreground mb-2">
                      {episode.title}
                    </h4>
                    <p className="text-sm font-inter text-muted-foreground">
                      {episode.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-dm-sans" asChild>
                      <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        ▶ Afspil
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="font-dm-sans">
                      💾 Gem
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold px-8" asChild>
            <a href="https://open.spotify.com/show/154B6QakpSESlOKiFkiDyk" target="_blank" rel="noopener noreferrer">
              Se alle episoder på Spotify
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;