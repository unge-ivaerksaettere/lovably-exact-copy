import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import podcastStudio from "@/assets/podcast-studio.jpg";

const PodcastSection = () => {
  const episodes = [
    {
      title: "En ærlig snak om bæredygtigt iværksætteri med Gittemarie",
      duration: "45 min",
      date: "Jun 24, 2024"
    },
    {
      title: "Jesper Theil Thomsen - Soundboks Rejsen", 
      duration: "52 min",
      date: "Maj 15, 2024"
    },
    {
      title: "Mads Andreas Olesen - Fintech Innovation",
      duration: "38 min", 
      date: "Apr 20, 2024"
    },
    {
      title: "Lasse Søkilde - Brand Building Secrets",
      duration: "44 min",
      date: "Mar 18, 2024"
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

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative">
            <img 
              src={podcastStudio} 
              alt="Unge Iværksættere Podcast Studio"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-anton text-foreground">
              Hver uge bringer vi dig de bedste historier fra iværksætterverdenen
            </h3>
            
            <p className="text-muted-foreground font-inter">
              Vores podcast er stedet, hvor unge iværksættere deler deres rejse, udfordringer og succeser. Lær af eksperterne og bliv inspireret til din egen iværksætterrejse.
            </p>
            
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-dm-sans font-bold">
              <Clock className="w-4 h-4 mr-2" />
              Lyt nu på Spotify
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {episodes.map((episode, index) => (
            <Card key={index} className="p-6 border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-muted-foreground">{episode.duration}</span>
                  <span className="text-sm font-inter text-muted-foreground">{episode.date}</span>
                </div>
                
                <h4 className="text-lg font-dm-sans font-bold text-foreground">
                  {episode.title}
                </h4>
                
                <Button variant="outline" size="sm" className="w-full font-dm-sans">
                  Afspil episode
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;