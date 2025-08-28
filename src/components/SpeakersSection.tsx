import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import speakerPresentation from "@/assets/featured-speaker.jpg";
import kimRantsImg from "@/assets/kim-rants.jpg";
import wernerValeurImg from "@/assets/werner-valeur.png";
import nikolajNyholmImg from "@/assets/nikolaj-nyholm.jpg";

const SpeakersSection = () => {
  const speakers = [
    {
      initials: "KR",
      name: "Kim Rants",
      title: "Co-founder & CEO, Alice.tech",
      company: "Alice.tech",
      description: "AI-ekspert og tidligere McKinsey Partner. Bygger AI-drevet uddannelsesplatform.",
      image: kimRantsImg,
    },
    {
      initials: "WV",
      name: "Werner Valeur",
      title: "Serial Entrepreneur",
      company: "10+ Companies",
      description: "Grundlagt over 10 virksomheder siden han var 18 år. Specialist i hurtig skalering.",
      image: wernerValeurImg,
    },
    {
      initials: "NN",
      name: "Nikolaj Nyholm",
      title: "Partner, Sunstone Capital",
      company: "Sunstone Capital",
      description: "Grundlagde Polar Rose (solgt til Apple) og Speednames/Ascio. Nu investor hos Sunstone.",
      image: nikolajNyholmImg,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Speakers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lær af Danmarks mest succesrige iværksættere og investorer på vores events.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={speakerPresentation} 
              alt="Featured speaker presenting" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <div className="inline-flex items-center gap-2 bg-orange/10 text-orange rounded-full px-3 py-1 mb-4">
              <span className="text-lg">🌟</span>
              <span className="text-sm font-medium">Featured Speaker</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Saxo Agdestein</h3>
            <p className="text-muted-foreground mb-1">Founder, Handyhand & HappyHelper</p>
            <Badge variant="outline" className="mb-4">Handyhand</Badge>
            
            <p className="text-muted-foreground mb-6">
              Entrepreneur og podcaster der har bygget Handyhand til 250K+ brugere og 300K+ tasks. Specialist i at forbinde mennesker gennem innovative digitale løsninger.
            </p>
            
            <p className="font-medium mb-4">
              <strong>Seneste Event:</strong> Scaling Digital Platforms
            </p>
            
            <Button>Se Event Replay</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {speakers.map((speaker, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-14 h-14 ring-1 ring-border">
                    <AvatarImage src={speaker.image} alt={speaker.name} />
                    <AvatarFallback>{speaker.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{speaker.name}</h4>
                    <p className="text-sm text-muted-foreground">{speaker.title}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{speaker.company}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{speaker.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">Se Alle Speakers</Button>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;