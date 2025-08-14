import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Music } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const PodcastSection = () => {
  const episodes = [
    {
      title: "Fundraising secrets med Martin fra Pleo",
      description: "Insider tips til at sikre funding fra en der har været med til at rejse over 1 milliard.",
      duration: "38 min",
      category: "Funding",
    },
    {
      title: "Tech trends 2024: AI og startup-økosystemet",
      description: "Hvordan kan AI revolutionen transformere startup landskabet? Eksperter deler deres forudsigelser.",
      duration: "45 min",
      category: "Tech",
    },
    {
      title: "Du Bliver ALDRIG Til Noget Fazel",
      description: "Inspirerende historie om at overvinde udfordringer og bygge succes mod alle odds.",
      duration: "53 min",
      category: "Motivation",
    },
  ];

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
              En ærlig snak om bæredygtigt iværksætteri med Gittemarie
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Dybdegående samtale om at bygge bæredygtige forretninger og navigere i grønne trends.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                1:02:49
              </div>
              <Badge variant="secondary">Bæredygtighed</Badge>
            </div>
            
            <div className="flex gap-3">
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Afspil Nu
              </Button>
              <Button variant="outline" className="gap-2">
                <Music className="w-4 h-4" />
                Gem i Spotify
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {episodes.map((episode, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  {episode.category}
                </Badge>
                <h4 className="font-semibold mb-3 line-clamp-2">{episode.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {episode.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{episode.duration}</span>
                  <Button size="sm" variant="ghost">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Vi er pt. sponsoreret af TechStars Copenhagen og Founder House
          </p>
          <Button variant="outline">Se Alle Episodes</Button>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;