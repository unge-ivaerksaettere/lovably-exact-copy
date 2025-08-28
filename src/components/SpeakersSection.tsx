import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import speakerPresentation from "@/assets/speaker-presentation.jpg";

const SpeakersSection = () => {
  const speakers = [
    {
      initials: "MD",
      name: "Martin Dahlin",
      title: "Former VP Growth, Pleo",
      company: "Pleo",
      description: "Byggede Pleos vækstmaskine fra 0 til 100M+ årlig omsætning.",
    },
    {
      initials: "SN",
      name: "Sarah Nielsen", 
      title: "Partner, Northzone",
      company: "Northzone",
      description: "Investeret i 50+ danske startups inklusiv Trustpilot og Spotify.",
    },
    {
      initials: "JL",
      name: "Jakob Lundsteen",
      title: "Co-founder, Firmafon",
      company: "Firmafon", 
      description: "Solgte Firmafon til TDC for 800M DKK efter 8 års vækstrejse.",
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
            
            <h3 className="text-2xl font-bold mb-2">Clara Høgh</h3>
            <p className="text-muted-foreground mb-1">CEO & Co-founder, Verdn</p>
            <Badge variant="outline" className="mb-4">Verdn</Badge>
            
            <p className="text-muted-foreground mb-6">
              Pionér inden for bæredygtige startup løsninger med over 50M DKK rejst i funding.
            </p>
            
            <p className="font-medium mb-4">
              <strong>Seneste Event:</strong> Green Tech Revolution
            </p>
            
            <Button>Se Event Replay</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {speakers.map((speaker, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {speaker.initials}
                  </div>
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